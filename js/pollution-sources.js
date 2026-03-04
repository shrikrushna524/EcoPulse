// ===== COMPLETE POLLUTION SOURCES MODULE =====
class PollutionSources {
    constructor() {
        this.sources = this.loadSources();
        this.industrialZones = this.loadIndustrialZones();
        this.monitoringStations = this.loadMonitoringStations();
    }
    
    loadSources() {
        return {
            industrial: [
                { type: 'Power Plant', emission: 'SO2, NOx, PM', radius: '10km' },
                { type: 'Factory', emission: 'VOCs, PM', radius: '5km' },
                { type: 'Refinery', emission: 'HC, SO2', radius: '15km' }
            ],
            vehicular: [
                { type: 'Traffic', emission: 'NOx, CO, PM', peakHours: '8-10am, 5-8pm' },
                { type: 'Diesel Vehicles', emission: 'PM, NOx', impact: 'High near highways' }
            ],
            residential: [
                { type: 'Biomass Burning', emission: 'PM, CO', season: 'Winter' },
                { type: 'Construction', emission: 'PM10', impact: 'Localized' }
            ],
            natural: [
                { type: 'Dust Storms', emission: 'PM10', season: 'Summer' },
                { type: 'Forest Fires', emission: 'PM, CO', season: 'Dry months' }
            ]
        };
    }
    
    loadIndustrialZones() {
        return {
            delhi: [
                { name: 'Okhla Industrial Area', lat: 28.54, lon: 77.27, pollution: 85, type: 'Mixed' },
                { name: 'Wazirpur Industrial Area', lat: 28.68, lon: 77.17, pollution: 90, type: 'Heavy' },
                { name: 'Mayapuri Industrial Area', lat: 28.63, lon: 77.12, pollution: 80, type: 'Light' }
            ],
            mumbai: [
                { name: 'MIDC Andheri', lat: 19.12, lon: 72.86, pollution: 75, type: 'Mixed' },
                { name: 'Trombay Industrial', lat: 19.00, lon: 72.90, pollution: 95, type: 'Chemical' }
            ],
            bangalore: [
                { name: 'Peenya Industrial Area', lat: 13.03, lon: 77.52, pollution: 70, type: 'Mixed' },
                { name: 'Whitefield IT Park', lat: 12.96, lon: 77.74, pollution: 45, type: 'Electronics' }
            ]
        };
    }
    
    loadMonitoringStations() {
        return [
            { id: 'CPCB_D1', city: 'Delhi', location: 'ITO', lat: 28.63, lon: 77.24, parameters: ['PM2.5', 'PM10', 'NO2', 'SO2'] },
            { id: 'CPCB_D2', city: 'Delhi', location: 'Anand Vihar', lat: 28.65, lon: 77.31, parameters: ['PM2.5', 'PM10', 'O3'] },
            { id: 'MPCB_M1', city: 'Mumbai', location: 'Bandra', lat: 19.06, lon: 72.84, parameters: ['PM2.5', 'NO2'] }
        ];
    }
    
    calculatePollutionScore(lat, lon, radius = 5) {
        let score = 0;
        
        // Check distance to industrial zones
        for (const city in this.industrialZones) {
            this.industrialZones[city].forEach(zone => {
                const distance = this.calculateDistance(lat, lon, zone.lat, zone.lon);
                if (distance <= radius) {
                    score += zone.pollution * (1 - distance / radius);
                }
            });
        }
        
        return Math.min(100, Math.round(score));
    }
    
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    toRad(deg) {
        return deg * Math.PI / 180;
    }
    
    getEmissionFactors(sourceType) {
        const factors = {
            'coal': { pm25: 0.5, so2: 5.0, nox: 3.0 }, // kg/ton
            'diesel': { pm25: 1.2, so2: 0.5, nox: 12.0 }, // g/km
            'petrol': { pm25: 0.1, so2: 0.1, nox: 4.0 }, // g/km
            'biomass': { pm25: 8.0, so2: 0.2, nox: 1.5 }, // kg/ton
            'industry': { pm25: 2.0, so2: 10.0, nox: 5.0 } // kg/hour
        };
        
        return factors[sourceType] || { pm25: 1.0, so2: 1.0, nox: 1.0 };
    }
    
    generateHeatMapData(city, resolution = 50) {
        const data = [];
        const zones = this.industrialZones[city.toLowerCase()] || [];
        
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const lat = 28.4 + (i / resolution) * 1.0; // Rough bounds
                const lon = 77.0 + (j / resolution) * 1.0;
                
                let intensity = 0;
                zones.forEach(zone => {
                    const dist = this.calculateDistance(lat, lon, zone.lat, zone.lon);
                    if (dist < 20) {
                        intensity += zone.pollution * (1 - dist/20);
                    }
                });
                
                data.push({
                    x: i, y: j,
                    intensity: Math.min(100, intensity)
                });
            }
        }
        
        return data;
    }
    
    getSeasonalSources(season) {
        const seasonal = {
            'summer': ['Dust Storms', 'Vehicle AC usage'],
            'monsoon': ['Reduced dust', 'Biomass decay'],
            'winter': ['Biomass burning', 'Temperature inversion'],
            'spring': ['Pollen', 'Industrial activity']
        };
        
        return seasonal[season] || seasonal.summer;
    }
    
    getPeakHours() {
        return {
            morning: '8:00 - 10:00',
            evening: '17:00 - 20:00',
            reason: 'Traffic congestion during office commute'
        };
    }
}

// Initialize
const pollutionSources = new PollutionSources();
window.pollutionSources = pollutionSources;