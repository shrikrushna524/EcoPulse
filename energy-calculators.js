// ===== COMPLETE ENERGY CALCULATORS MODULE =====

class EnergyCalculators {
    
    // Solar Calculator with real data
    static calculateSolar(roofArea, location, monthlyBill, rate) {
        // Solar insolation data for Indian cities (kWh/m²/day)
        const solarData = {
            'delhi': { insolation: 5.2, peakHours: 5.0, temp: 25 },
            'mumbai': { insolation: 5.5, peakHours: 5.3, temp: 28 },
            'bangalore': { insolation: 5.8, peakHours: 5.5, temp: 24 },
            'chennai': { insolation: 5.7, peakHours: 5.4, temp: 30 },
            'kolkata': { insolation: 4.8, peakHours: 4.5, temp: 27 },
            'pune': { insolation: 5.6, peakHours: 5.3, temp: 26 },
            'ahmedabad': { insolation: 5.9, peakHours: 5.6, temp: 29 },
            'jaipur': { insolation: 5.4, peakHours: 5.1, temp: 26 },
            'lucknow': { insolation: 5.0, peakHours: 4.8, temp: 25 },
            'chandigarh': { insolation: 4.9, peakHours: 4.7, temp: 23 }
        };
        
        const loc = location.toLowerCase();
        const data = solarData[loc] || { insolation: 5.2, peakHours: 5.0, temp: 25 };
        
        // Calculations
        const usableArea = roofArea * 0.8; // 80% usable
        const systemSizeKW = usableArea / 100; // 100 sq ft per kW
        const panelEfficiency = 0.18; // 18% efficient panels
        const systemLosses = 0.75; // 75% system efficiency
        
        const dailyGeneration = systemSizeKW * data.peakHours * systemLosses;
        const monthlyGeneration = dailyGeneration * 30;
        const annualGeneration = monthlyGeneration * 12;
        
        const monthlySavings = monthlyGeneration * rate;
        const annualSavings = monthlySavings * 12;
        
        const systemCost = systemSizeKW * 50000; // ₹50,000 per kW
        const subsidy = systemSizeKW <= 3 ? systemCost * 0.4 : 
                       systemSizeKW <= 10 ? systemCost * 0.2 : 0;
        const netCost = systemCost - subsidy;
        
        const paybackYears = netCost / annualSavings;
        
        const co2Saved = annualGeneration * 0.85 / 1000; // tons
        const treesEquivalent = Math.round(co2Saved * 50); // 1 tree absorbs 50kg/year
        
        return {
            systemSize: Math.round(systemSizeKW * 10) / 10,
            dailyGen: Math.round(dailyGeneration),
            monthlyGen: Math.round(monthlyGeneration),
            annualGen: Math.round(annualGeneration),
            monthlySavings: Math.round(monthlySavings),
            annualSavings: Math.round(annualSavings),
            systemCost: Math.round(systemCost),
            subsidy: Math.round(subsidy),
            netCost: Math.round(netCost),
            paybackYears: Math.round(paybackYears * 10) / 10,
            co2Saved: Math.round(co2Saved * 10) / 10,
            treesEquivalent: treesEquivalent,
            roi: Math.round((annualSavings / netCost) * 1000) / 10
        };
    }
    
    // Wind Potential Calculator
    static calculateWind(area, location, avgWindSpeed) {
        // Wind power density classes (W/m²)
        const windClasses = {
            'low': { density: 200, minSpeed: 3, capacityFactor: 0.15 },
            'medium': { density: 400, minSpeed: 5, capacityFactor: 0.25 },
            'high': { density: 600, minSpeed: 7, capacityFactor: 0.35 }
        };
        
        // Determine wind class
        let windClass;
        if (avgWindSpeed >= 7) windClass = windClasses.high;
        else if (avgWindSpeed >= 5) windClass = windClasses.medium;
        else windClass = windClasses.low;
        
        // Turbine sizing (typically 1kW needs 10 sq m)
        const turbineCapacity = area / 10; // kW
        const annualGeneration = turbineCapacity * 8760 * windClass.capacityFactor; // kWh
        const annualSavings = annualGeneration * 7; // ₹7 per kWh
        
        const turbineCost = turbineCapacity * 70000; // ₹70,000 per kW
        const subsidy = turbineCost * 0.3; // 30% subsidy
        const netCost = turbineCost - subsidy;
        
        const paybackYears = netCost / annualSavings;
        const co2Saved = annualGeneration * 0.85 / 1000;
        
        return {
            turbineCapacity: Math.round(turbineCapacity * 10) / 10,
            annualGen: Math.round(annualGeneration),
            annualSavings: Math.round(annualSavings),
            turbineCost: Math.round(turbineCost),
            subsidy: Math.round(subsidy),
            netCost: Math.round(netCost),
            paybackYears: Math.round(paybackYears * 10) / 10,
            co2Saved: Math.round(co2Saved * 10) / 10,
            windClass: avgWindSpeed >= 7 ? 'High' : (avgWindSpeed >= 5 ? 'Medium' : 'Low'),
            suitable: avgWindSpeed >= 5 ? 'Yes' : 'Borderline'
        };
    }
    
    // Battery Storage Calculator
    static calculateBattery(dailyUsage, backupDays, solarGen) {
        const netDailyUsage = Math.max(0, dailyUsage - solarGen);
        const requiredCapacity = netDailyUsage * backupDays * 1.2; // 20% safety margin
        
        // Battery specs
        const batteryTypes = [
            { name: 'Lithium-ion', price: 12000, cycles: 5000, efficiency: 0.95, lifespan: 10 },
            { name: 'Lead-acid', price: 8000, cycles: 1500, efficiency: 0.85, lifespan: 5 },
            { name: 'Flow Battery', price: 20000, cycles: 10000, efficiency: 0.8, lifespan: 20 }
        ];
        
        // Choose best battery type
        let bestBattery;
        if (requiredCapacity > 20) {
            bestBattery = batteryTypes[2]; // Flow for large
        } else if (netDailyUsage > 10) {
            bestBattery = batteryTypes[0]; // Lithium for daily cycling
        } else {
            bestBattery = batteryTypes[1]; // Lead-acid for occasional
        }
        
        const batteryCost = requiredCapacity * bestBattery.price;
        const batteryUnits = Math.ceil(requiredCapacity / 5); // 5kWh units
        const spaceNeeded = batteryUnits * 0.5; // 0.5 sq m per unit
        const weight = requiredCapacity * 10; // kg
        
        const totalCycles = backupDays * 365; // cycles per year
        const lifespan = bestBattery.cycles / totalCycles;
        
        return {
            capacity: Math.round(requiredCapacity * 10) / 10,
            recommendedType: bestBattery.name,
            batteryCost: Math.round(batteryCost),
            unitsNeeded: batteryUnits,
            spaceNeeded: Math.round(spaceNeeded * 10) / 10,
            weight: Math.round(weight),
            lifespan: Math.round(lifespan),
            efficiency: bestBattery.efficiency * 100 + '%',
            pricePerKWh: bestBattery.price,
            co2Saved: Math.round(netDailyUsage * 365 * 0.85 / 1000)
        };
    }
    
    // Home Energy Audit
    static auditHome(params) {
        const scores = {
            lighting: params.led ? 10 : 0,
            appliances: params.star5 ? 15 : (params.star3 ? 8 : 0),
            insulation: params.insulation ? 15 : 0,
            windows: params.doubleGlaze ? 10 : 0,
            waterHeater: params.solarWaterHeater ? 10 : 0,
            ac: params.star5AC ? 15 : (params.star3AC ? 8 : 0),
            smartPower: params.smartStrips ? 5 : 0,
            timers: params.timers ? 5 : 0,
            monitoring: params.monitor ? 5 : 0,
            ventilation: params.ventilation ? 10 : 0
        };
        
        const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
        
        // Calculate potential savings
        const currentBill = params.monthlyBill || 5000;
        const savingsPercent = totalScore / 100;
        const potentialSavings = currentBill * 12 * savingsPercent;
        
        // Generate recommendations
        const recommendations = [];
        if (!params.led) recommendations.push("Install LED bulbs throughout - save ₹500/year");
        if (!params.star5) recommendations.push("Upgrade to 5-star appliances - save ₹2000/year");
        if (!params.insulation) recommendations.push("Add wall/roof insulation - save ₹1500/year");
        if (!params.doubleGlaze) recommendations.push("Install double-glaze windows - save ₹800/year");
        if (!params.solarWaterHeater) recommendations.push("Add solar water heater - save ₹1200/year");
        if (!params.star5AC) recommendations.push("Upgrade to 5-star ACs - save ₹2500/year");
        if (!params.smartStrips) recommendations.push("Use smart power strips - save ₹300/year");
        if (!params.timers) recommendations.push("Install timer switches - save ₹400/year");
        if (!params.monitor) recommendations.push("Add energy monitor - save ₹600/year");
        if (!params.ventilation) recommendations.push("Optimize ventilation - save ₹500/year");
        
        return {
            score: totalScore,
            rating: totalScore >= 80 ? 'Excellent' : (totalScore >= 60 ? 'Good' : (totalScore >= 40 ? 'Average' : 'Poor')),
            currentBill: currentBill,
            potentialSavings: Math.round(potentialSavings),
            savingsPercent: Math.round(savingsPercent * 100),
            co2Reduction: Math.round(potentialSavings / 7 * 0.85 / 1000), // tons
            recommendations: recommendations,
            nextSteps: recommendations.slice(0, 3)
        };
    }
    
    // Carbon Offset Calculator
    static calculateCarbonOffset(energyType, amount) {
        const factors = {
            'solar': 0.85, // kg CO2 per kWh
            'wind': 0.85,
            'hydro': 0.90,
            'biomass': 0.95,
            'grid': 0.95 // Indian grid average
        };
        
        const co2Saved = amount * (factors[energyType] || 0.85) / 1000; // tons
        
        const equivalents = {
            trees: Math.round(co2Saved * 50),
            cars: Math.round(co2Saved / 4.6),
            homes: Math.round(co2Saved / 7.5),
            flights: Math.round(co2Saved / 0.4), // Delhi-Mumbai flight ~0.4 tons
            smartphones: Math.round(co2Saved * 20000) // 20,000 phones charged
        };
        
        return {
            co2Tons: Math.round(co2Saved * 10) / 10,
            equivalents: equivalents,
            offsetCost: Math.round(co2Saved * 1000) // ₹1000 per ton typical offset cost
        };
    }
}

// Export
window.EnergyCalculators = EnergyCalculators;