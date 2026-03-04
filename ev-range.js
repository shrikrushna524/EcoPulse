// ===== COMPLETE EV RANGE ESTIMATOR MODULE =====
class EVRangeEstimator {
    constructor() {
        this.evModels = this.loadEVModels();
        this.temperatureFactors = this.loadTemperatureFactors();
        this.speedFactors = this.loadSpeedFactors();
        this.terrainFactors = this.loadTerrainFactors();
    }
    
    loadEVModels() {
        return {
            'Tata Nexon EV': { battery: 30, range: 312, efficiency: 9.6, weight: 1400 },
            'MG ZS EV': { battery: 50, range: 461, efficiency: 10.8, weight: 1620 },
            'Hyundai Kona': { battery: 39, range: 452, efficiency: 8.6, weight: 1535 },
            'Tata Tiago EV': { battery: 19, range: 250, efficiency: 7.6, weight: 1150 },
            'BYD Atto 3': { battery: 60, range: 521, efficiency: 11.5, weight: 1750 },
            'Kia EV6': { battery: 77, range: 708, efficiency: 10.9, weight: 1900 },
            'Tesla Model 3': { battery: 75, range: 629, efficiency: 11.9, weight: 1800 },
            'Tesla Model Y': { battery: 75, range: 676, efficiency: 11.1, weight: 1900 },
            'EcoCar A': { battery: 40, range: 250, efficiency: 16.0, weight: 1500 },
            'EcoCar B': { battery: 60, range: 350, efficiency: 17.1, weight: 1600 },
            'EcoCar C': { battery: 30, range: 200, efficiency: 15.0, weight: 1300 }
        };
    }
    
    loadTemperatureFactors() {
        return {
            '-10': 0.55, '-5': 0.60, '0': 0.65, '5': 0.70,
            '10': 0.80, '15': 0.90, '20': 0.95, '25': 1.00,
            '30': 0.98, '35': 0.95, '40': 0.90, '45': 0.85
        };
    }
    
    loadSpeedFactors() {
        return {
            '20': 1.10, '30': 1.08, '40': 1.05, '50': 1.02,
            '60': 1.00, '70': 0.98, '80': 0.95, '90': 0.90,
            '100': 0.85, '110': 0.80, '120': 0.75, '130': 0.70
        };
    }
    
    loadTerrainFactors() {
        return {
            'flat': 1.00,
            'hilly': 0.85,
            'mountainous': 0.70,
            'city': 0.90
        };
    }
    
    calculateRange(modelName, temperature, speed, acUsage = 50, terrain = 'flat', payload = 200) {
        const model = this.evModels[modelName];
        if (!model) return null;
        
        // Get base range
        let range = model.range;
        
        // Temperature factor
        const tempKey = Math.round(temperature / 5) * 5;
        const tempFactor = this.temperatureFactors[tempKey] || 1.0;
        range *= tempFactor;
        
        // Speed factor
        const speedKey = Math.round(speed / 10) * 10;
        const speedFactor = this.speedFactors[speedKey] || 0.85;
        range *= speedFactor;
        
        // AC/Heater usage (can reduce range by up to 15%)
        const acFactor = 1.0 - (acUsage / 100) * 0.15;
        range *= acFactor;
        
        // Terrain factor
        const terrainFactor = this.terrainFactors[terrain] || 1.0;
        range *= terrainFactor;
        
        // Payload factor (every 100kg reduces range by ~2%)
        const payloadFactor = 1.0 - (payload / 100) * 0.02;
        range *= payloadFactor;
        
        // Battery degradation (assuming 2% per year)
        const degradationFactor = 0.98;
        
        return {
            estimatedRange: Math.round(range),
            confidence: this.getConfidenceLevel(range, model.range),
            factors: {
                temperature: tempFactor,
                speed: speedFactor,
                ac: acFactor,
                terrain: terrainFactor,
                payload: payloadFactor
            },
            consumption: this.calculateConsumption(model, range, speed),
            chargingNeeded: this.calculateChargingNeeded(range, model.battery)
        };
    }
    
    getConfidenceLevel(estimatedRange, baseRange) {
        const ratio = estimatedRange / baseRange;
        if (ratio > 0.9) return 'High';
        if (ratio > 0.7) return 'Medium';
        return 'Low';
    }
    
    calculateConsumption(model, range, speed) {
        const kwhPer100km = (model.battery / range) * 100;
        const kwhPerHour = kwhPer100km * (speed / 100);
        
        return {
            kwhPer100km: Math.round(kwhPer100km * 10) / 10,
            kwhPerHour: Math.round(kwhPerHour * 10) / 10,
            costPer100km: Math.round(kwhPer100km * 8) // ₹8 per kWh
        };
    }
    
    calculateChargingNeeded(range, batteryCapacity) {
        return {
            fullCharges: Math.ceil(500 / range), // for 500km trip
            timeAt50kW: Math.round((batteryCapacity / 50) * 60), // minutes
            timeAt100kW: Math.round((batteryCapacity / 100) * 60),
            timeAt250kW: Math.round((batteryCapacity / 250) * 60)
        };
    }
    
    getTripPlanning(start, end, waypoints = [], modelName) {
        const totalDistance = this.estimateDistance(start, end, waypoints);
        const model = this.evModels[modelName] || this.evModels['Tesla Model 3'];
        
        const rangePerCharge = model.range * 0.8; // 80% practical range
        const chargesNeeded = Math.ceil(totalDistance / rangePerCharge) - 1;
        
        return {
            totalDistance: totalDistance,
            estimatedTime: Math.round(totalDistance / 80 * 60), // minutes at 80 km/h
            chargesNeeded: Math.max(0, chargesNeeded),
            chargingTime: chargesNeeded * 45, // 45 minutes per charge
            totalTime: Math.round((totalDistance / 80 * 60) + (chargesNeeded * 45)),
            chargingStops: this.suggestChargingStops(totalDistance, rangePerCharge)
        };
    }
    
    estimateDistance(start, end, waypoints) {
        // Simplified distance estimation
        let distance = Math.abs(start.length - end.length) * 50; // Dummy calculation
        
        waypoints.forEach(() => {
            distance += 30;
        });
        
        return Math.max(100, Math.round(distance));
    }
    
    suggestChargingStops(totalDistance, rangePerCharge) {
        const stops = [];
        let currentPosition = 0;
        
        while (currentPosition + rangePerCharge < totalDistance) {
            currentPosition += rangePerCharge;
            stops.push({
                at: currentPosition,
                remainingDistance: totalDistance - currentPosition,
                suggestedCharger: currentPosition % 200 === 0 ? 'Fast Charger' : 'Standard Charger'
            });
        }
        
        return stops;
    }
    
    getWeatherImpact(weather, temperature) {
        const impacts = {
            'clear': 1.0,
            'rain': 0.9,
            'snow': 0.6,
            'fog': 0.95,
            'windy': 0.92
        };
        
        return impacts[weather] || 1.0;
    }
    
    getSeasonalAverage(season, modelName) {
        const seasonalFactors = {
            'summer': { temp: 35, ac: 80, factor: 0.85 },
            'monsoon': { temp: 28, ac: 50, factor: 0.90 },
            'winter': { temp: 15, ac: 30, factor: 0.95 },
            'spring': { temp: 25, ac: 20, factor: 1.00 }
        };
        
        const seasonData = seasonalFactors[season] || seasonalFactors.spring;
        const baseRange = this.evModels[modelName]?.range || 400;
        
        return Math.round(baseRange * seasonData.factor);
    }
}

// Initialize
const evRangeEstimator = new EVRangeEstimator();
window.evRangeEstimator = evRangeEstimator;