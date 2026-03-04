// Real weather API integration
class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey || 'YOUR_API_KEY'; // Get from OpenWeatherMap
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
    
    async getCurrentWeather(lat, lon) {
        try {
            const response = await fetch(
                `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
            );
            const data = await response.json();
            
            return {
                temperature: data.main.temp,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: data.wind.speed,
                windDirection: data.wind.deg,
                condition: data.weather[0].description,
                icon: data.weather[0].icon,
                clouds: data.clouds.all,
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
            };
        } catch (error) {
            console.error('Weather fetch failed:', error);
            return null;
        }
    }
    
    async getForecast(lat, lon, days = 7) {
        try {
            const response = await fetch(
                `${this.baseUrl}/forecast/daily?lat=${lat}&lon=${lon}&cnt=${days}&appid=${this.apiKey}&units=metric`
            );
            const data = await response.json();
            
            return data.list.map(day => ({
                date: new Date(day.dt * 1000).toLocaleDateString(),
                maxTemp: day.temp.max,
                minTemp: day.temp.min,
                humidity: day.humidity,
                condition: day.weather[0].description,
                icon: day.weather[0].icon,
                rain: day.rain || 0,
                windSpeed: day.speed
            }));
        } catch (error) {
            console.error('Forecast fetch failed:', error);
            return null;
        }
    }
    
    async getAgriculturalAdvice(lat, lon, cropType) {
        const weather = await this.getCurrentWeather(lat, lon);
        const forecast = await this.getForecast(lat, lon, 3);
        
        if (!weather || !forecast) {
            return this.getFallbackAdvice(cropType);
        }
        
        const advice = {
            irrigation: this.calculateIrrigationNeed(weather, forecast, cropType),
            pestRisk: this.calculatePestRisk(weather, cropType),
            sprayingConditions: this.getSprayingConditions(weather, forecast),
            frostRisk: this.checkFrostRisk(forecast),
            heatStress: this.checkHeatStress(weather, cropType)
        };
        
        return advice;
    }
    
    calculateIrrigationNeed(weather, forecast, cropType) {
        const cropWaterNeeds = {
            'Rice': 5,
            'Wheat': 3.5,
            'Maize': 4,
            'Cotton': 3,
            'Vegetables': 4.5
        };
        
        const waterNeeded = cropWaterNeeds[cropType] || 4;
        const expectedRain = forecast.reduce((sum, day) => sum + (day.rain || 0), 0);
        const evaporation = (30 - weather.humidity) * 0.1; // Simple estimate
        
        if (expectedRain < waterNeeded) {
            return {
                needIrrigation: true,
                amount: (waterNeeded - expectedRain + evaporation).toFixed(1),
                timing: 'Next 24 hours',
                reason: 'Insufficient rainfall expected'
            };
        }
        
        return {
            needIrrigation: false,
            amount: 0,
            timing: 'No irrigation needed',
            reason: 'Sufficient rainfall expected'
        };
    }
    
    calculatePestRisk(weather, cropType) {
        // Pest risk based on weather conditions
        let risk = 'Low';
        let pests = [];
        
        if (weather.humidity > 80 && weather.temperature > 25) {
            risk = 'High';
            pests = ['Aphids', 'Powdery Mildew', 'Fungal Diseases'];
        } else if (weather.humidity > 60 && weather.temperature > 20) {
            risk = 'Medium';
            pests = ['Leaf Miners', 'Thrips'];
        }
        
        return {
            level: risk,
            likelyPests: pests,
            recommendedAction: risk === 'High' ? 'Inspect crops daily, consider preventive spray' :
                              risk === 'Medium' ? 'Monitor regularly' : 'No action needed'
        };
    }
    
    getSprayingConditions(weather, forecast) {
        // Check if conditions are good for pesticide spraying
        const next24hRain = forecast[0]?.rain || 0;
        const windOk = weather.windSpeed < 15; // Less than 15 km/h
        
        if (next24hRain > 5) {
            return {
                canSpray: false,
                reason: 'Rain expected within 24 hours',
                bestTime: 'Wait 2-3 days after rain'
            };
        }
        
        if (!windOk) {
            return {
                canSpray: false,
                reason: 'Wind speed too high',
                bestTime: 'Early morning or late evening'
            };
        }
        
        return {
            canSpray: true,
            reason: 'Conditions favorable',
            bestTime: 'Early morning (before 9 AM) or late evening (after 4 PM)',
            temperature: 'Ideal: 15-25°C'
        };
    }
    
    checkFrostRisk(forecast) {
        const minTemp = Math.min(...forecast.map(d => d.minTemp));
        
        if (minTemp < 2) {
            return {
                risk: 'High',
                warning: 'Frost likely! Protect sensitive crops',
                action: 'Cover crops, irrigate before sunset'
            };
        } else if (minTemp < 5) {
            return {
                risk: 'Moderate',
                warning: 'Possible light frost',
                action: 'Monitor temperature'
            };
        }
        
        return {
            risk: 'Low',
            warning: 'No frost risk',
            action: 'Normal operations'
        };
    }
    
    checkHeatStress(weather, cropType) {
        const heatThresholds = {
            'Wheat': 32,
            'Rice': 35,
            'Maize': 38,
            'Potato': 30,
            'Tomato': 35
        };
        
        const threshold = heatThresholds[cropType] || 35;
        
        if (weather.temperature > threshold) {
            return {
                stress: 'Yes',
                severity: weather.temperature > threshold + 5 ? 'Severe' : 'Moderate',
                action: 'Provide shade, increase irrigation',
                timeOfDay: 'Hottest part: ' + (weather.temperature > 35 ? '12-4 PM' : '2-3 PM')
            };
        }
        
        return {
            stress: 'No',
            severity: 'None',
            action: 'Conditions normal',
            timeOfDay: 'No heat stress expected'
        };
    }
    
    getFallbackAdvice(cropType) {
        // Fallback advice when weather API fails
        return {
            irrigation: {
                needIrrigation: true,
                amount: '3.5',
                timing: 'Morning',
                reason: 'Standard recommendation'
            },
            pestRisk: {
                level: 'Moderate',
                likelyPests: ['Monitor regularly'],
                recommendedAction: 'Weekly inspection'
            },
            sprayingConditions: {
                canSpray: true,
                reason: 'Assume favorable',
                bestTime: 'Early morning'
            },
            frostRisk: {
                risk: 'Low',
                warning: 'No frost expected',
                action: 'Normal'
            },
            heatStress: {
                stress: 'No',
                severity: 'None',
                action: 'Monitor conditions'
            }
        };
    }
}

// Initialize with free tier key (get from openweathermap.org)
const weatherService = new WeatherService('YOUR_API_KEY');
window.weatherService = weatherService;