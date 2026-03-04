// ===== COMPLETE POLLUTION TRACKER MODULE =====
class PollutionTracker {
    constructor() {
        this.readings = this.loadReadings();
        this.cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
    }
    
    loadReadings() {
        // Generate mock historical data
        const readings = [];
        const now = new Date();
        
        for (let i = 0; i < 30; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            this.cities.forEach(city => {
                readings.push({
                    city: city,
                    date: date.toISOString(),
                    aqi: 100 + Math.floor(Math.random() * 150),
                    pm25: 30 + Math.floor(Math.random() * 70),
                    pm10: 50 + Math.floor(Math.random() * 100),
                    no2: 20 + Math.floor(Math.random() * 40),
                    so2: 5 + Math.floor(Math.random() * 15),
                    co: 0.5 + Math.random() * 2,
                    o3: 30 + Math.floor(Math.random() * 40)
                });
            });
        }
        
        return readings;
    }
    
    getReadings(city, days = 7) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        
        return this.readings
            .filter(r => r.city.toLowerCase() === city.toLowerCase() && new Date(r.date) > cutoff)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    getAverageAQI(city, days = 7) {
        const readings = this.getReadings(city, days);
        if (readings.length === 0) return 0;
        
        const sum = readings.reduce((acc, r) => acc + r.aqi, 0);
        return Math.round(sum / readings.length);
    }
    
    getTrend(city, days = 7) {
        const readings = this.getReadings(city, days);
        if (readings.length < 2) return 'stable';
        
        const firstHalf = readings.slice(0, Math.floor(readings.length / 2));
        const secondHalf = readings.slice(Math.floor(readings.length / 2));
        
        const firstAvg = firstHalf.reduce((acc, r) => acc + r.aqi, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((acc, r) => acc + r.aqi, 0) / secondHalf.length;
        
        if (secondAvg > firstAvg * 1.1) return 'worsening';
        if (secondAvg < firstAvg * 0.9) return 'improving';
        return 'stable';
    }
    
    getPeakHours(city) {
        const readings = this.getReadings(city, 30);
        const hourlyAverages = {};
        
        readings.forEach(r => {
            const hour = new Date(r.date).getHours();
            if (!hourlyAverages[hour]) {
                hourlyAverages[hour] = { sum: 0, count: 0 };
            }
            hourlyAverages[hour].sum += r.aqi;
            hourlyAverages[hour].count++;
        });
        
        let peakHour = 0;
        let peakValue = 0;
        
        for (let hour = 0; hour < 24; hour++) {
            if (hourlyAverages[hour]) {
                const avg = hourlyAverages[hour].sum / hourlyAverages[hour].count;
                if (avg > peakValue) {
                    peakValue = avg;
                    peakHour = hour;
                }
            }
        }
        
        return {
            peakHour: peakHour,
            peakValue: Math.round(peakValue),
            morningPeak: '8-10 AM',
            eveningPeak: '6-9 PM'
        };
    }
    
    getMonthlyAverage(city, month, year) {
        const readings = this.readings.filter(r => {
            const date = new Date(r.date);
            return r.city.toLowerCase() === city.toLowerCase() &&
                   date.getMonth() === month &&
                   date.getFullYear() === year;
        });
        
        if (readings.length === 0) return null;
        
        const sum = readings.reduce((acc, r) => acc + r.aqi, 0);
        return Math.round(sum / readings.length);
    }
    
    getYearlyAverage(city, year) {
        const readings = this.readings.filter(r => {
            const date = new Date(r.date);
            return r.city.toLowerCase() === city.toLowerCase() &&
                   date.getFullYear() === year;
        });
        
        if (readings.length === 0) return null;
        
        const sum = readings.reduce((acc, r) => acc + r.aqi, 0);
        return Math.round(sum / readings.length);
    }
    
    compareCities(cities, days = 7) {
        const comparison = {};
        
        cities.forEach(city => {
            comparison[city] = {
                avgAQI: this.getAverageAQI(city, days),
                trend: this.getTrend(city, days),
                peakHour: this.getPeakHours(city).peakHour
            };
        });
        
        return comparison;
    }
    
    getWorstCity(days = 7) {
        let worstCity = null;
        let worstAQI = 0;
        
        this.cities.forEach(city => {
            const avg = this.getAverageAQI(city, days);
            if (avg > worstAQI) {
                worstAQI = avg;
                worstCity = city;
            }
        });
        
        return { city: worstCity, aqi: worstAQI };
    }
    
    getBestCity(days = 7) {
        let bestCity = null;
        let bestAQI = Infinity;
        
        this.cities.forEach(city => {
            const avg = this.getAverageAQI(city, days);
            if (avg < bestAQI) {
                bestAQI = avg;
                bestCity = city;
            }
        });
        
        return { city: bestCity, aqi: bestAQI };
    }
    
    getSeasonalAverage(city, season) {
        const seasons = {
            winter: [11, 0, 1], // Nov, Dec, Jan
            spring: [2, 3, 4], // Feb, Mar, Apr
            summer: [5, 6, 7], // May, Jun, Jul
            autumn: [8, 9, 10] // Aug, Sep, Oct
        };
        
        const months = seasons[season];
        if (!months) return null;
        
        const readings = this.readings.filter(r => {
            const date = new Date(r.date);
            return r.city.toLowerCase() === city.toLowerCase() &&
                   months.includes(date.getMonth());
        });
        
        if (readings.length === 0) return null;
        
        const sum = readings.reduce((acc, r) => acc + r.aqi, 0);
        return Math.round(sum / readings.length);
    }
    
    getChartData(city, period = 'week') {
        let days = 7;
        let interval = 'day';
        
        if (period === 'month') days = 30;
        if (period === 'year') days = 365;
        
        const readings = this.getReadings(city, days);
        const labels = [];
        const data = [];
        
        readings.forEach(r => {
            labels.push(new Date(r.date).toLocaleDateString());
            data.push(r.aqi);
        });
        
        return {
            labels: labels,
            datasets: [{
                label: 'AQI',
                data: data,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)'
            }]
        };
    }
    
    addReading(city, aqi, pm25, pm10) {
        const reading = {
            city: city,
            date: new Date().toISOString(),
            aqi: aqi,
            pm25: pm25,
            pm10: pm10
        };
        
        this.readings.push(reading);
        return reading;
    }
}

// Initialize
const pollutionTracker = new PollutionTracker();
window.pollutionTracker = pollutionTracker;