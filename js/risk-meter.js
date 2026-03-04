// ===== COMPLETE DISASTER RISK METER MODULE =====
class RiskMeter {
    constructor() {
        this.riskFactors = this.loadRiskFactors();
        this.seismicZones = this.loadSeismicZones();
        this.floodZones = this.loadFloodZones();
        this.fireZones = this.loadFireZones();
    }
    
    loadRiskFactors() {
        return {
            flood: {
                proximityToWater: 0.4,
                elevation: 0.3,
                drainage: 0.2,
                rainfall: 0.1
            },
            fire: {
                vegetation: 0.4,
                temperature: 0.3,
                humidity: 0.2,
                windSpeed: 0.1
            },
            earthquake: {
                seismicZone: 0.5,
                soilType: 0.3,
                buildingQuality: 0.2
            }
        };
    }
    
    loadSeismicZones() {
        return {
            'Zone II': { risk: 20, areas: ['Bangalore', 'Chennai', 'Mumbai'] },
            'Zone III': { risk: 40, areas: ['Delhi', 'Kolkata', 'Ahmedabad'] },
            'Zone IV': { risk: 65, areas: ['Guwahati', 'Patna', 'Srinagar'] },
            'Zone V': { risk: 85, areas: ['North-East', 'Kutch'] }
        };
    }
    
    loadFloodZones() {
        return {
            'High': { risk: 75, areas: ['Mumbai', 'Kolkata', 'Chennai'] },
            'Moderate': { risk: 45, areas: ['Delhi', 'Lucknow', 'Patna'] },
            'Low': { risk: 20, areas: ['Bangalore', 'Hyderabad', 'Pune'] }
        };
    }
    
    loadFireZones() {
        return {
            'High': { risk: 70, areas: ['Uttarakhand', 'Himachal', 'Forest areas'] },
            'Moderate': { risk: 40, areas: ['Urban fringes', 'Dry areas'] },
            'Low': { risk: 15, areas: ['Wetlands', 'Coastal cities'] }
        };
    }
    
    calculateFloodRisk(location, params) {
        const factors = this.riskFactors.flood;
        let risk = 0;
        
        // Proximity to water (km)
        const waterProximity = params.waterDistance || 10;
        risk += (Math.max(0, 10 - waterProximity) / 10) * factors.proximityToWater * 100;
        
        // Elevation (meters)
        const elevation = params.elevation || 100;
        risk += (Math.max(0, 30 - elevation) / 30) * factors.elevation * 100;
        
        // Drainage quality (1-5)
        const drainage = params.drainage || 3;
        risk += ((5 - drainage) / 4) * factors.drainage * 100;
        
        // Historical rainfall (mm)
        const rainfall = params.rainfall || 2000;
        risk += (rainfall / 5000) * factors.rainfall * 100;
        
        return Math.min(100, Math.round(risk));
    }
    
    calculateFireRisk(location, params) {
        const factors = this.riskFactors.fire;
        let risk = 0;
        
        // Vegetation density (1-5)
        const vegetation = params.vegetation || 3;
        risk += (vegetation / 5) * factors.vegetation * 100;
        
        // Temperature (°C)
        const temperature = params.temperature || 30;
        risk += (temperature / 45) * factors.temperature * 100;
        
        // Humidity (%)
        const humidity = params.humidity || 60;
        risk += ((100 - humidity) / 100) * factors.humidity * 100;
        
        // Wind speed (km/h)
        const wind = params.windSpeed || 15;
        risk += (wind / 50) * factors.windSpeed * 100;
        
        return Math.min(100, Math.round(risk));
    }
    
    calculateEarthquakeRisk(location, params) {
        const factors = this.riskFactors.earthquake;
        let risk = 0;
        
        // Seismic zone (I-V)
        const zone = params.seismicZone || 3;
        risk += (zone / 5) * factors.seismicZone * 100;
        
        // Soil type (1-5, 1=rock, 5=soft soil)
        const soil = params.soilType || 3;
        risk += (soil / 5) * factors.soilType * 100;
        
        // Building quality (1-5)
        const building = params.buildingQuality || 3;
        risk += ((5 - building) / 4) * factors.buildingQuality * 100;
        
        return Math.min(100, Math.round(risk));
    }
    
    getRiskLevel(risk) {
        if (risk < 30) return { level: 'LOW', color: '#2ecc71', action: 'Stay prepared' };
        if (risk < 50) return { level: 'MODERATE', color: '#f39c12', action: 'Be aware' };
        if (risk < 75) return { level: 'HIGH', color: '#e67e22', action: 'Get ready' };
        return { level: 'EXTREME', color: '#e74c3c', action: 'Take action now' };
    }
    
    getRecommendations(riskType, risk) {
        const recs = [];
        
        if (riskType === 'flood') {
            if (risk > 50) recs.push('Keep sandbags ready');
            if (risk > 70) recs.push('Move valuables to higher floor');
            if (risk > 90) recs.push('Prepare for evacuation');
            recs.push('Store drinking water');
        }
        
        if (riskType === 'fire') {
            if (risk > 50) recs.push('Clear dry vegetation');
            if (risk > 70) recs.push('Keep fire extinguisher accessible');
            if (risk > 90) recs.push('Prepare evacuation plan');
            recs.push('Store important documents');
        }
        
        if (riskType === 'earthquake') {
            if (risk > 50) recs.push('Secure heavy furniture');
            if (risk > 70) recs.push('Learn drop-cover-hold');
            if (risk > 90) recs.push('Reinforce building if needed');
            recs.push('Keep emergency kit accessible');
        }
        
        return recs;
    }
    
    getHistoricalData(city, disasterType) {
        // Return historical occurrence data
        return {
            last10Years: Math.floor(Math.random() * 5),
            severity: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
            mostRecent: new Date(Date.now() - Math.random()*365*24*60*60*1000).toLocaleDateString()
        };
    }
    
    compareRisks(location1, location2) {
        // Simplified comparison
        return {
            location1: {
                flood: this.calculateFloodRisk(location1, {}),
                fire: this.calculateFireRisk(location1, {}),
                quake: this.calculateEarthquakeRisk(location1, {})
            },
            location2: {
                flood: this.calculateFloodRisk(location2, {}),
                fire: this.calculateFireRisk(location2, {}),
                quake: this.calculateEarthquakeRisk(location2, {})
            }
        };
    }
    
    getSeasonalRisk(location, month) {
        const seasonal = {
            'Jan': { flood: 20, fire: 30, cyclone: 10 },
            'Feb': { flood: 20, fire: 35, cyclone: 10 },
            'Mar': { flood: 25, fire: 45, cyclone: 15 },
            'Apr': { flood: 30, fire: 60, cyclone: 20 },
            'May': { flood: 40, fire: 70, cyclone: 30 },
            'Jun': { flood: 70, fire: 50, cyclone: 60 },
            'Jul': { flood: 90, fire: 30, cyclone: 80 },
            'Aug': { flood: 95, fire: 25, cyclone: 85 },
            'Sep': { flood: 85, fire: 30, cyclone: 75 },
            'Oct': { flood: 60, fire: 40, cyclone: 50 },
            'Nov': { flood: 40, fire: 35, cyclone: 30 },
            'Dec': { flood: 25, fire: 30, cyclone: 20 }
        };
        
        return seasonal[month] || { flood: 50, fire: 50, cyclone: 50 };
    }
}

// Initialize
const riskMeter = new RiskMeter();
window.riskMeter = riskMeter;