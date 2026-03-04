// ===== COMPLETE COMMUTE COST CALCULATOR MODULE =====
class CommuteCalculator {
    constructor() {
        this.fuelPrice = 100; // ₹ per liter
        this.electricityPrice = 8; // ₹ per kWh
        this.busFare = 1.5; // ₹ per km
        this.metroFare = 2.5; // ₹ per km
        this.trainFare = 1.2; // ₹ per km
        this.carMaintenance = 1.5; // ₹ per km
        this.bikeMaintenance = 0.5; // ₹ per km
    }
    
    calculateDailyCost(mode, distance, passengers = 1, carEfficiency = 15, evEfficiency = 6) {
        let cost = 0;
        
        switch(mode) {
            case 'car-petrol':
                cost = (distance / carEfficiency) * this.fuelPrice + (distance * this.carMaintenance);
                break;
            case 'car-diesel':
                cost = (distance / (carEfficiency * 1.2)) * (this.fuelPrice * 0.9) + (distance * this.carMaintenance);
                break;
            case 'car-ev':
                cost = (distance / evEfficiency) * this.electricityPrice + (distance * this.carMaintenance * 0.5);
                break;
            case 'bus':
                cost = distance * this.busFare;
                break;
            case 'metro':
                cost = distance * this.metroFare;
                break;
            case 'train':
                cost = distance * this.trainFare;
                break;
            case 'bike':
                cost = distance * this.bikeMaintenance;
                break;
            case 'walk':
                cost = 0;
                break;
        }
        
        // Divide by passengers for shared modes
        if (['car-petrol', 'car-diesel', 'car-ev'].includes(mode)) {
            cost = cost / passengers;
        }
        
        return Math.round(cost * 100) / 100;
    }
    
    calculateMonthlyCost(mode, distance, days, passengers = 1, carEfficiency = 15) {
        const daily = this.calculateDailyCost(mode, distance, passengers, carEfficiency);
        return Math.round(daily * days);
    }
    
    calculateYearlyCost(mode, distance, days, passengers = 1, carEfficiency = 15) {
        return this.calculateMonthlyCost(mode, distance, days, passengers, carEfficiency) * 12;
    }
    
    calculateAllModes(distance, days, passengers = 1, carEfficiency = 15) {
        const modes = ['car-petrol', 'car-diesel', 'car-ev', 'bus', 'metro', 'train', 'bike', 'walk'];
        const results = {};
        
        modes.forEach(mode => {
            results[mode] = {
                daily: this.calculateDailyCost(mode, distance, passengers, carEfficiency),
                monthly: this.calculateMonthlyCost(mode, distance, days, passengers, carEfficiency),
                yearly: this.calculateYearlyCost(mode, distance, days, passengers, carEfficiency),
                co2: this.calculateEmissions(mode, distance, days)
            };
        });
        
        return results;
    }
    
    calculateEmissions(mode, distance, days) {
        const emissionFactors = {
            'car-petrol': 251, // g/km
            'car-diesel': 235,
            'car-ev': 120,
            'bus': 105,
            'metro': 40,
            'train': 30,
            'bike': 0,
            'walk': 0
        };
        
        const dailyEmissions = distance * (emissionFactors[mode] || 0) / 1000; // kg
        return {
            daily: Math.round(dailyEmissions * 100) / 100,
            monthly: Math.round(dailyEmissions * days),
            yearly: Math.round(dailyEmissions * days * 12)
        };
    }
    
    calculateSavings(currentMode, newMode, distance, days, passengers = 1) {
        const currentCost = this.calculateMonthlyCost(currentMode, distance, days, passengers);
        const newCost = this.calculateMonthlyCost(newMode, distance, days, passengers);
        const currentEmissions = this.calculateEmissions(currentMode, distance, days).monthly;
        const newEmissions = this.calculateEmissions(newMode, distance, days).monthly;
        
        return {
            monthlyCostSavings: currentCost - newCost,
            yearlyCostSavings: (currentCost - newCost) * 12,
            monthlyEmissionsSavings: currentEmissions - newEmissions,
            yearlyEmissionsSavings: (currentEmissions - newEmissions) * 12,
            treesEquivalent: Math.round((currentEmissions - newEmissions) * 12 / 21)
        };
    }
    
    getBreakEvenPoint(initialInvestment, currentMode, newMode, distance, days) {
        const monthlySavings = this.calculateSavings(currentMode, newMode, distance, days).monthlyCostSavings;
        
        if (monthlySavings <= 0) return 'Never - new mode costs more';
        
        const monthsToBreakEven = initialInvestment / monthlySavings;
        const yearsToBreakEven = monthsToBreakEven / 12;
        
        return {
            months: Math.round(monthsToBreakEven * 10) / 10,
            years: Math.round(yearsToBreakEven * 10) / 10,
            monthlySavings: monthlySavings
        };
    }
    
    getSeasonalVariation(mode, season) {
        const factors = {
            'summer': {
                'bike': 0.8, // Less biking in heat
                'walk': 0.7,
                'bus': 1.1, // More AC buses
                'car': 1.2 // More AC usage
            },
            'winter': {
                'bike': 1.2, // More biking in pleasant weather
                'walk': 1.3,
                'bus': 1.0,
                'car': 1.1 // More heating
            },
            'monsoon': {
                'bike': 0.3, // Much less biking in rain
                'walk': 0.4,
                'bus': 1.3, // More bus usage
                'car': 1.4 // More car usage
            }
        };
        
        return factors[season]?.[mode] || 1.0;
    }
    
    getCommuteTips(distance, currentMode) {
        const tips = [];
        
        if (distance < 5) {
            tips.push('Consider walking or biking - it\'s free and healthy!');
        }
        
        if (distance > 20 && currentMode === 'car') {
            tips.push('Look for carpool partners to share costs');
        }
        
        if (currentMode.includes('car')) {
            tips.push('Keep tires properly inflated to improve fuel efficiency');
            tips.push('Remove roof racks when not in use to reduce drag');
        }
        
        return tips;
    }
    
    getMonthlyPassSavings(city, mode, monthlyTrips) {
        const passes = {
            'Delhi': {
                'metro': { cost: 1500, trips: 60 },
                'bus': { cost: 1000, trips: 50 }
            },
            'Mumbai': {
                'train': { cost: 800, trips: 60 },
                'bus': { cost: 1200, trips: 50 }
            }
        };
        
        const passInfo = passes[city]?.[mode];
        if (!passInfo) return null;
        
        const regularCost = this.calculateMonthlyCost(mode, 15, monthlyTrips);
        const savings = regularCost - passInfo.cost;
        
        return {
            passCost: passInfo.cost,
            regularCost: regularCost,
            savings: savings,
            recommended: savings > 0
        };
    }
}

// Initialize
const commuteCalculator = new CommuteCalculator();
window.commuteCalculator = commuteCalculator;