// ===== COMPLETE ECO-ROUTE PLANNER MODULE =====
class RoutePlanner {
    constructor() {
        this.emissionFactors = {
            car: 251, // g CO2 per km (average petrol car)
            suv: 320,
            electric: 120, // Including generation emissions
            hybrid: 180,
            bus: 105, // per passenger
            metro: 40, // per passenger
            train: 30, // per passenger
            bike: 0,
            walk: 0
        };
        
        this.speedFactors = {
            car: 40, // km/h
            bus: 25,
            metro: 35,
            bike: 15,
            walk: 5
        };
        
        this.calorieBurn = {
            bike: 30, // per km
            walk: 50,
            bus: 15,
            car: 10
        };
    }
    
    calculateRoute(distance, mode, passengers = 1, carEfficiency = 15) {
        const time = this.calculateTime(distance, mode);
        const emissions = this.calculateEmissions(distance, mode, passengers, carEfficiency);
        const cost = this.calculateCost(distance, mode, passengers, carEfficiency);
        const calories = this.calculateCalories(distance, mode);
        const healthScore = this.calculateHealthScore(calories, emissions);
        
        return {
            distance: distance,
            mode: mode,
            time: time,
            emissions: emissions,
            cost: cost,
            calories: calories,
            healthScore: healthScore,
            ecoScore: this.calculateEcoScore(emissions, cost)
        };
    }
    
    calculateTime(distance, mode) {
        const speed = this.speedFactors[mode] || 30;
        return Math.round((distance / speed) * 60); // minutes
    }
    
    calculateEmissions(distance, mode, passengers, carEfficiency) {
        if (mode === 'car') {
            // Car emissions vary by fuel efficiency
            const baseEmission = 251; // g/km at 15 km/l
            const efficiencyFactor = 15 / carEfficiency; // Adjust for actual efficiency
            return Math.round(distance * baseEmission * efficiencyFactor / passengers);
        }
        
        const factor = this.emissionFactors[mode] || 0;
        return Math.round(distance * factor);
    }
    
    calculateCost(distance, mode, passengers, carEfficiency) {
        const fuelPrice = 100; // ₹ per liter
        const busFare = 1.5; // ₹ per km
        const metroFare = 2.5; // ₹ per km
        const trainFare = 1.2; // ₹ per km
        
        switch(mode) {
            case 'car':
                return Math.round((distance / carEfficiency) * fuelPrice / passengers);
            case 'bus':
                return Math.round(distance * busFare);
            case 'metro':
                return Math.round(distance * metroFare);
            case 'train':
                return Math.round(distance * trainFare);
            default:
                return 0;
        }
    }
    
    calculateCalories(distance, mode) {
        const burn = this.calorieBurn[mode] || 0;
        return Math.round(distance * burn);
    }
    
    calculateHealthScore(calories, emissions) {
        // Higher score for active transport with low emissions
        const activeBonus = calories > 0 ? 50 : 0;
        const emissionsScore = Math.max(0, 100 - (emissions / 100));
        return Math.min(100, Math.round(activeBonus + emissionsScore));
    }
    
    calculateEcoScore(emissions, cost) {
        const emissionScore = Math.max(0, 100 - (emissions / 50));
        const costScore = cost === 0 ? 100 : Math.max(0, 100 - (cost / 50));
        return Math.round((emissionScore + costScore) / 2);
    }
    
    compareModes(distance, passengers, carEfficiency) {
        const modes = ['car', 'bus', 'metro', 'bike', 'walk'];
        const results = {};
        
        modes.forEach(mode => {
            results[mode] = this.calculateRoute(distance, mode, passengers, carEfficiency);
        });
        
        return results;
    }
    
    findBestMode(distance, passengers, carEfficiency, priority = 'eco') {
        const results = this.compareModes(distance, passengers, carEfficiency);
        
        if (priority === 'eco') {
            return Object.entries(results).reduce((best, [mode, data]) => 
                data.ecoScore > (best[1]?.ecoScore || 0) ? [mode, data] : best
            );
        } else if (priority === 'time') {
            return Object.entries(results).reduce((best, [mode, data]) => 
                data.time < (best[1]?.time || Infinity) ? [mode, data] : best
            );
        } else if (priority === 'cost') {
            return Object.entries(results).reduce((best, [mode, data]) => 
                data.cost < (best[1]?.cost || Infinity) ? [mode, data] : best
            );
        }
        
        return ['walk', results.walk];
    }
    
    getRouteSuggestions(start, end, preferences = {}) {
        // Simulate route suggestions based on locations
        const distance = this.estimateDistance(start, end);
        const bestMode = this.findBestMode(distance, 1, 15, preferences.priority || 'eco');
        
        return {
            distance: distance,
            bestMode: bestMode[0],
            bestModeData: bestMode[1],
            alternatives: ['bus', 'metro'].filter(m => m !== bestMode[0]),
            transitStops: this.getNearbyStops(start, end),
            tips: this.getTipsForMode(bestMode[0])
        };
    }
    
    estimateDistance(start, end) {
        // Simple distance estimation based on location names
        // In production, use Google Maps API
        const cityDistances = {
            'Delhi': { 'CP': 15, 'Noida': 25, 'Gurgaon': 30 },
            'Mumbai': { 'Nariman Point': 10, 'Bandra': 20, 'Andheri': 25 }
        };
        
        return 15; // Default 15km
    }
    
    getNearbyStops(location, destination) {
        return [
            { name: 'Bus Stop A', distance: '0.3 km', routes: ['470', '522'] },
            { name: 'Metro Station', distance: '0.8 km', routes: ['Blue Line'] },
            { name: 'Bus Stop B', distance: '1.2 km', routes: ['165', '218'] }
        ];
    }
    
    getTipsForMode(mode) {
        const tips = {
            car: 'Carpool to reduce costs and emissions',
            bus: 'Get a monthly pass for additional savings',
            metro: 'Avoid peak hours for less crowded commute',
            bike: 'Wear a helmet and use bike lanes',
            walk: 'Wear comfortable shoes and stay hydrated'
        };
        
        return tips[mode] || 'Choose sustainable transport when possible';
    }
    
    calculateMonthlySavings(currentMode, newMode, distance, days) {
        const current = this.calculateRoute(distance, currentMode, 1, 15);
        const proposed = this.calculateRoute(distance, newMode, 1, 15);
        
        const monthlyCostSavings = (current.cost - proposed.cost) * days;
        const monthlyEmissionsSavings = (current.emissions - proposed.emissions) * days / 1000; // kg
        
        return {
            monthlyCostSavings: Math.round(monthlyCostSavings),
            yearlyCostSavings: Math.round(monthlyCostSavings * 12),
            monthlyEmissionsSavings: Math.round(monthlyEmissionsSavings),
            yearlyEmissionsSavings: Math.round(monthlyEmissionsSavings * 12),
            treesEquivalent: Math.round(monthlyEmissionsSavings * 12 / 21) // 1 tree absorbs 21kg CO2/year
        };
    }
}

// Initialize
const routePlanner = new RoutePlanner();
window.routePlanner = routePlanner;