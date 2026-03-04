// ===== COMPLETE WATER CALCULATOR MODULE =====
class WaterCalculator {
    constructor() {
        this.usageFactors = {
            shower: 10, // L per minute
            bath: 100, // L per bath
            toilet: 6, // L per flush (dual flush average)
            faucet: 4, // L per minute
            dishwasher: 15, // L per load
            washingMachine: 50, // L per load
            garden: 15, // L per minute
            drinking: 0.25 // L per glass
        };
        
        this.rainfallData = {
            'Mumbai': 2500,
            'Chennai': 1400,
            'Kolkata': 1600,
            'Delhi': 800,
            'Bangalore': 970,
            'Pune': 700,
            'Jaipur': 650,
            'Lucknow': 1000,
            'Hyderabad': 800,
            'Ahmedabad': 800,
            'Surat': 1200,
            'Nagpur': 1100,
            'Indore': 950,
            'Bhopal': 1100,
            'Patna': 1100,
            'Lucknow': 1000,
            'Kanpur': 900,
            'Agra': 700,
            'Varanasi': 1000,
            'Amritsar': 700,
            'Chandigarh': 1000
        };
    }
    
    calculateFootprint(params) {
        const {
            showerMins,
            baths,
            toiletFlushes,
            faucetMins,
            dishwasherLoads,
            laundryLoads,
            gardenMins,
            drinkingGlasses
        } = params;
        
        const daily = {
            shower: showerMins * this.usageFactors.shower,
            bath: baths * this.usageFactors.bath,
            toilet: toiletFlushes * this.usageFactors.toilet,
            faucet: faucetMins * this.usageFactors.faucet,
            dishwasher: (dishwasherLoads / 7) * this.usageFactors.dishwasher,
            laundry: (laundryLoads / 7) * this.usageFactors.washingMachine,
            garden: (gardenMins / 7) * this.usageFactors.garden,
            drinking: drinkingGlasses * this.usageFactors.drinking
        };
        
        const total = Object.values(daily).reduce((a, b) => a + b, 0);
        
        // Calculate comparison to averages
        const indiaAvg = 135;
        const worldAvg = 150;
        const usAvg = 300;
        
        return {
            daily: Math.round(total),
            breakdown: daily,
            monthly: Math.round(total * 30),
            yearly: Math.round(total * 365),
            comparison: {
                india: Math.round((total / indiaAvg) * 100),
                world: Math.round((total / worldAvg) * 100),
                us: Math.round((total / usAvg) * 100)
            },
            rating: total < 100 ? 'Excellent' :
                    total < 135 ? 'Good' :
                    total < 200 ? 'Average' :
                    total < 300 ? 'High' : 'Very High'
        };
    }
    
    calculateRainwater(roofArea, city, efficiency = 0.85) {
        const rainfall = this.rainfallData[city] || 1000;
        const annualLiters = roofArea * rainfall * efficiency;
        
        const tankSize = Math.ceil(annualLiters / 1000); // 1000L tanks
        const monthlySupply = annualLiters / 12;
        
        // Usage equivalents
        const toiletFlushes = Math.floor(annualLiters / 6);
        const showers = Math.floor(annualLiters / 50);
        const laundryLoads = Math.floor(annualLiters / 50);
        
        // Savings (₹50 per 1000L approximate)
        const moneySaved = annualLiters * 0.05;
        
        // Environmental impact
        const groundwaterSaved = annualLiters * 0.7; // 70% of rainwater replaces groundwater
        const energySaved = annualLiters * 0.0015; // kWh per liter for water treatment
        
        return {
            annualLiters: Math.round(annualLiters),
            monthlyLiters: Math.round(monthlySupply),
            dailyAverage: Math.round(annualLiters / 365),
            tanksNeeded: tankSize,
            usageEquivalents: {
                toiletFlushes,
                showers,
                laundryLoads
            },
            moneySaved: Math.round(moneySaved),
            environmentalImpact: {
                groundwaterSaved: Math.round(groundwaterSaved),
                energySaved: Math.round(energySaved),
                co2Saved: Math.round(energySaved * 0.85) // kg CO2
            }
        };
    }
    
    calculateLeakSavings(leakType, duration) {
        const leakRates = {
            drippingFaucet: 50, // L per day
            runningToilet: 200, // L per day
            pipeLeak: 500, // L per day
            sprinklerLeak: 300 // L per day
        };
        
        const dailyLoss = leakRates[leakType] || 100;
        const totalLoss = dailyLoss * duration;
        
        return {
            dailyLoss,
            totalLoss,
            moneyLost: totalLoss * 0.05,
            co2Impact: totalLoss * 0.0015 * 0.85,
            treesNeeded: Math.ceil(totalLoss * 0.0015 / 21)
        };
    }
    
    getWaterSavingTips() {
        return [
            {
                tip: 'Fix dripping taps',
                savings: '5000L/year',
                difficulty: 'Easy',
                cost: 'Low'
            },
            {
                tip: 'Install low-flow showerheads',
                savings: '15000L/year',
                difficulty: 'Easy',
                cost: '₹1000'
            },
            {
                tip: 'Dual flush toilet converter',
                savings: '12000L/year',
                difficulty: 'Medium',
                cost: '₹1500'
            },
            {
                tip: 'Rainwater harvesting',
                savings: '50000L+/year',
                difficulty: 'Hard',
                cost: '₹10000+'
            },
            {
                tip: 'Turn off tap while brushing',
                savings: '4000L/year',
                difficulty: 'Easy',
                cost: 'Free'
            },
            {
                tip: 'Use bucket instead of hose',
                savings: '3000L/wash',
                difficulty: 'Easy',
                cost: 'Free'
            },
            {
                tip: 'Fix leaking toilet flapper',
                savings: '8000L/year',
                difficulty: 'Medium',
                cost: '₹300'
            }
        ];
    }
    
    getSeasonalWaterUse(season) {
        const seasonalData = {
            summer: {
                garden: 30,
                drinking: 12,
                total: 200
            },
            monsoon: {
                garden: 5,
                drinking: 8,
                total: 120
            },
            winter: {
                garden: 10,
                drinking: 10,
                total: 150
            }
        };
        
        return seasonalData[season] || seasonalData.summer;
    }
}

// Initialize
const waterCalculator = new WaterCalculator();
window.waterCalculator = waterCalculator;