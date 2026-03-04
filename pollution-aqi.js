// ===== COMPLETE AIR QUALITY INDEX MODULE =====
class PollutionAQI {
    constructor() {
        this.apiKey = 'YOUR_API_KEY'; // Get from OpenAQ or WAQI
        this.baseUrl = 'https://api.openaq.org/v2';
        this.cities = this.loadCities();
        this.pollutants = ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co'];
    }
    
    loadCities() {
        return [
            { name: 'Delhi', lat: 28.6139, lon: 77.2090, stations: 15 },
            { name: 'Mumbai', lat: 19.0760, lon: 72.8777, stations: 12 },
            { name: 'Bangalore', lat: 12.9716, lon: 77.5946, stations: 8 },
            { name: 'Chennai', lat: 13.0827, lon: 80.2707, stations: 7 },
            { name: 'Kolkata', lat: 22.5726, lon: 88.3639, stations: 9 },
            { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, stations: 6 },
            { name: 'Pune', lat: 18.5204, lon: 73.8567, stations: 5 },
            { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, stations: 5 },
            { name: 'Lucknow', lat: 26.8467, lon: 80.9462, stations: 4 },
            { name: 'Patna', lat: 25.5941, lon: 85.1376, stations: 3 }
        ];
    }
    
    calculateAQI(pm25, pm10, o3, no2, so2, co) {
        // Breakpoints from CPCB/EPA
        const breakpoints = {
            pm25: [0, 30, 60, 90, 120, 250],
            pm10: [0, 50, 100, 250, 350, 430],
            o3: [0, 50, 100, 200, 300, 400],
            no2: [0, 40, 80, 180, 280, 400],
            so2: [0, 40, 80, 380, 800, 1600],
            co: [0, 1, 2, 10, 17, 34]
        };
        
        const aqiLevels = [0, 50, 100, 150, 200, 300, 500];
        
        function calculateSubIndex(value, pollutant) {
            const bp = breakpoints[pollutant];
            if (!bp) return 0;
            
            for (let i = 0; i < bp.length - 1; i++) {
                if (value <= bp[i + 1]) {
                    const aqiRange = aqiLevels[i + 1] - aqiLevels[i];
                    const concRange = bp[i + 1] - bp[i];
                    return Math.round(((value - bp[i]) / concRange) * aqiRange + aqiLevels[i]);
                }
            }
            return 500;
        }
        
        const indices = [
            calculateSubIndex(pm25, 'pm25'),
            calculateSubIndex(pm10, 'pm10'),
            calculateSubIndex(o3, 'o3'),
            calculateSubIndex(no2, 'no2'),
            calculateSubIndex(so2, 'so2'),
            calculateSubIndex(co * 1000, 'co') // Convert ppm to µg/m³ approx
        ];
        
        const aqi = Math.max(...indices);
        
        let category, color, healthMessage, action;
        
        if (aqi <= 50) {
            category = 'Good';
            color = '#4CAF50';
            healthMessage = 'Air quality is satisfactory, little or no risk.';
            action = 'Perfect for outdoor activities!';
        } else if (aqi <= 100) {
            category = 'Moderate';
            color = '#FFC107';
            healthMessage = 'Acceptable quality. Unusually sensitive people should consider limiting prolonged outdoor exertion.';
            action = 'Sensitive individuals: limit exertion.';
        } else if (aqi <= 150) {
            category = 'Unhealthy for Sensitive Groups';
            color = '#FF9800';
            healthMessage = 'Members of sensitive groups may experience health effects.';
            action = 'Sensitive groups: reduce outdoor activities. Wear mask.';
        } else if (aqi <= 200) {
            category = 'Unhealthy';
            color = '#F44336';
            healthMessage = 'Everyone may begin to experience health effects.';
            action = 'Avoid outdoor activities. Wear N95 mask.';
        } else if (aqi <= 300) {
            category = 'Very Unhealthy';
            color = '#9C27B0';
            healthMessage = 'Health alert: everyone may experience more serious health effects.';
            action = 'Stay indoors. Keep windows closed. Use air purifier.';
        } else {
            category = 'Hazardous';
            color = '#7B1FA2';
            healthMessage = 'Health warning of emergency conditions.';
            action = 'Remain indoors. Avoid all outdoor activities.';
        }
        
        return {
            aqi: aqi,
            category: category,
            color: color,
            healthMessage: healthMessage,
            action: action,
            dominantPollutant: ['PM2.5', 'PM10', 'O3', 'NO2', 'SO2', 'CO'][indices.indexOf(aqi)]
        };
    }
    
    async getLiveAQI(city) {
        // Simulate API call - in production, use actual API
        return new Promise(resolve => {
            setTimeout(() => {
                const data = {
                    delhi: { aqi: 187, pm25: 58, pm10: 142, o3: 45, no2: 38, so2: 12, co: 2.1 },
                    mumbai: { aqi: 124, pm25: 42, pm10: 98, o3: 38, no2: 32, so2: 8, co: 1.2 },
                    bangalore: { aqi: 76, pm25: 28, pm10: 52, o3: 42, no2: 22, so2: 5, co: 0.8 },
                    chennai: { aqi: 82, pm25: 32, pm10: 68, o3: 35, no2: 25, so2: 6, co: 0.9 },
                    kolkata: { aqi: 158, pm25: 52, pm10: 128, o3: 32, no2: 35, so2: 15, co: 1.8 },
                    hyderabad: { aqi: 94, pm25: 36, pm10: 78, o3: 40, no2: 28, so2: 7, co: 1.0 },
                    pune: { aqi: 88, pm25: 34, pm10: 72, o3: 38, no2: 26, so2: 6, co: 0.9 }
                };
                
                const cityData = data[city.toLowerCase()] || data.delhi;
                const aqiInfo = this.calculateAQI(
                    cityData.pm25, cityData.pm10, cityData.o3,
                    cityData.no2, cityData.so2, cityData.co
                );
                
                resolve({
                    ...cityData,
                    ...aqiInfo,
                    timestamp: new Date().toISOString()
                });
            }, 500);
        });
    }
    
    async getAllCitiesAQI() {
        const promises = this.cities.map(city => this.getLiveAQI(city.name));
        return Promise.all(promises);
    }
    
    getHistoricalData(city, days = 7) {
        // Generate mock historical data
        const data = [];
        const now = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            data.push({
                date: date.toLocaleDateString(),
                aqi: 100 + Math.floor(Math.random() * 100),
                pm25: 30 + Math.floor(Math.random() * 50)
            });
        }
        
        return data;
    }
    
    getHealthRecommendation(aqi, age, conditions) {
        if (aqi <= 50) {
            return {
                level: 'Good',
                recommendation: 'Great day for outdoor activities!',
                mask: 'Not needed',
                exercise: 'Safe for all'
            };
        } else if (aqi <= 100) {
            return {
                level: 'Moderate',
                recommendation: 'Sensitive individuals should limit outdoor time.',
                mask: 'Optional',
                exercise: 'OK for most'
            };
        } else if (aqi <= 150) {
            return {
                level: 'Unhealthy for Sensitive',
                recommendation: 'Sensitive groups: reduce outdoor activities.',
                mask: 'Recommended for sensitive',
                exercise: 'Limit for sensitive'
            };
        } else if (aqi <= 200) {
            return {
                level: 'Unhealthy',
                recommendation: 'Everyone should limit outdoor activities.',
                mask: 'N95 recommended',
                exercise: 'Avoid outdoors'
            };
        } else {
            return {
                level: 'Hazardous',
                recommendation: 'Stay indoors. Avoid all outdoor activities.',
                mask: 'N95 mandatory',
                exercise: 'Indoor only'
            };
        }
    }
    
    getColorForAQI(aqi) {
        if (aqi <= 50) return '#4CAF50';
        if (aqi <= 100) return '#FFC107';
        if (aqi <= 150) return '#FF9800';
        if (aqi <= 200) return '#F44336';
        if (aqi <= 300) return '#9C27B0';
        return '#7B1FA2';
    }
}

// Initialize
const pollutionAQI = new PollutionAQI();
window.pollutionAQI = pollutionAQI;