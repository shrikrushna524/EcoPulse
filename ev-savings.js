// ===== COMPLETE EV SAVINGS CALCULATOR MODULE =====
class EVSavings {
    constructor() {
        this.petrolPrice = 100; // ₹ per liter
        this.dieselPrice = 95; // ₹ per liter
        this.electricityPrice = 8; // ₹ per kWh (domestic)
        this.commercialElectricityPrice = 12; // ₹ per kWh (charging stations)
        
        this.maintenanceCosts = {
            petrol: 2.5, // ₹ per km
            diesel: 3.0, // ₹ per km
            ev: 1.0 // ₹ per km (less moving parts)
        };
        
        this.emissionFactors = {
            petrol: 2.31, // kg CO2 per liter
            diesel: 2.68, // kg CO2 per liter
            ev: 0.85 // kg CO2 per kWh (grid average)
        };
    }
    
    calculateMonthlyCost(kmPerMonth, vehicleType, fuelEfficiency, evEfficiency = 6) {
        let fuelCost = 0;
        let maintenanceCost = 0;
        let emissions = 0;
        
        switch(vehicleType) {
            case 'petrol':
                fuelCost = (kmPerMonth / fuelEfficiency) * this.petrolPrice;
                maintenanceCost = kmPerMonth * this.maintenanceCosts.petrol;
                emissions = (kmPerMonth / fuelEfficiency) * this.emissionFactors.petrol;
                break;
                
            case 'diesel':
                fuelCost = (kmPerMonth / fuelEfficiency) * this.dieselPrice;
                maintenanceCost = kmPerMonth * this.maintenanceCosts.diesel;
                emissions = (kmPerMonth / fuelEfficiency) * this.emissionFactors.diesel;
                break;
                
            case 'ev':
                fuelCost = (kmPerMonth / evEfficiency) * this.electricityPrice;
                maintenanceCost = kmPerMonth * this.maintenanceCosts.ev;
                emissions = (kmPerMonth / evEfficiency) * this.emissionFactors.ev;
                break;
                
            case 'ev-commercial':
                fuelCost = (kmPerMonth / evEfficiency) * this.commercialElectricityPrice;
                maintenanceCost = kmPerMonth * this.maintenanceCosts.ev;
                emissions = (kmPerMonth / evEfficiency) * this.emissionFactors.ev;
                break;
        }
        
        return {
            fuelCost: Math.round(fuelCost),
            maintenanceCost: Math.round(maintenanceCost),
            totalCost: Math.round(fuelCost + maintenanceCost),
            emissions: Math.round(emissions)
        };
    }
    
    calculateAnnualSavings(currentVehicle, newVehicle, kmPerMonth, currentEfficiency, evEfficiency) {
        const current = this.calculateMonthlyCost(kmPerMonth, currentVehicle, currentEfficiency);
        const proposed = this.calculateMonthlyCost(kmPerMonth, newVehicle, 0, evEfficiency);
        
        const monthlySavings = current.totalCost - proposed.totalCost;
        const annualSavings = monthlySavings * 12;
        const monthlyEmissionsSaved = current.emissions - proposed.emissions;
        const annualEmissionsSaved = monthlyEmissionsSaved * 12;
        
        return {
            monthlySavings: monthlySavings,
            annualSavings: annualSavings,
            monthlyEmissionsSaved: monthlyEmissionsSaved,
            annualEmissionsSaved: annualEmissionsSaved,
            treesEquivalent: Math.round(annualEmissionsSaved / 21), // 1 tree absorbs 21kg CO2/year
            fiveYearSavings: annualSavings * 5,
            tenYearSavings: annualSavings * 10
        };
    }
    
    calculatePaybackPeriod(evPrice, currentVehicle, kmPerMonth, currentEfficiency, evEfficiency) {
        const annualSavings = this.calculateAnnualSavings(
            currentVehicle, 'ev', kmPerMonth, currentEfficiency, evEfficiency
        ).annualSavings;
        
        if (annualSavings <= 0) return Infinity;
        
        const years = evPrice / annualSavings;
        const months = years * 12;
        
        return {
            years: Math.round(years * 10) / 10,
            months: Math.round(months),
            formatted: `${Math.round(years * 10) / 10} years (${Math.round(months)} months)`
        };
    }
    
    getGovernmentSubsidies(evPrice, state) {
        const subsidies = {
            'delhi': { amount: 150000, maxPrice: 1500000, fame: 15000 },
            'maharashtra': { amount: 100000, maxPrice: 1500000, fame: 15000 },
            'karnataka': { amount: 80000, maxPrice: 1500000, fame: 15000 },
            'tamilnadu': { amount: 50000, maxPrice: 1500000, fame: 15000 },
            'gujarat': { amount: 100000, maxPrice: 1500000, fame: 15000 },
            'default': { amount: 0, maxPrice: 1500000, fame: 15000 }
        };
        
        const stateSubsidy = subsidies[state.toLowerCase()] || subsidies.default;
        
        let totalSubsidy = stateSubsidy.fame; // FAME II subsidy
        
        if (evPrice <= stateSubsidy.maxPrice) {
            totalSubsidy += stateSubsidy.amount;
        }
        
        return {
            fameSubsidy: stateSubsidy.fame,
            stateSubsidy: stateSubsidy.amount,
            totalSubsidy: totalSubsidy,
            finalPrice: evPrice - totalSubsidy,
            applicable: evPrice <= stateSubsidy.maxPrice
        };
    }
    
    getROI(evPrice, currentVehicle, kmPerMonth, currentEfficiency, evEfficiency, years = 5) {
        const annualSavings = this.calculateAnnualSavings(
            currentVehicle, 'ev', kmPerMonth, currentEfficiency, evEfficiency
        ).annualSavings;
        
        const totalSavings = annualSavings * years;
        const roi = ((totalSavings - evPrice) / evPrice) * 100;
        
        return {
            totalSavings: totalSavings,
            roi: Math.round(roi * 10) / 10,
            profitLoss: totalSavings - evPrice,
            breakeven: totalSavings >= evPrice
        };
    }
    
    compareWithPublicTransport(kmPerMonth, city) {
        const busFare = 15; // ₹ per trip
        const metroFare = 30; // ₹ per trip
        const autoFare = 20; // ₹ per km
        
        const workingDays = 22;
        const dailyTrips = 2;
        
        const busCost = busFare * dailyTrips * workingDays;
        const metroCost = metroFare * dailyTrips * workingDays;
        const autoCost = autoFare * kmPerMonth;
        
        const evCost = this.calculateMonthlyCost(kmPerMonth, 'ev', 0, 6).totalCost;
        
        return {
            bus: busCost,
            metro: metroCost,
            auto: autoCost,
            ev: evCost,
            cheapest: Math.min(busCost, metroCost, autoCost, evCost) === evCost ? 'EV' : 'Public Transport',
            savingsVsBus: evCost - busCost,
            savingsVsMetro: evCost - metroCost
        };
    }
    
    getEnvironmentalImpact(kmPerMonth, years = 5) {
        const annualKm = kmPerMonth * 12;
        const totalKm = annualKm * years;
        
        // EV vs Petrol comparison
        const petrolEmissions = (annualKm / 15) * this.emissionFactors.petrol; // 15 km/l assumed
        const evEmissions = (annualKm / 6) * this.emissionFactors.ev;
        
        const annualCO2Saved = petrolEmissions - evEmissions;
        const totalCO2Saved = annualCO2Saved * years;
        
        return {
            annualCO2Saved: Math.round(annualCO2Saved),
            totalCO2Saved: Math.round(totalCO2Saved),
            treesEquivalent: Math.round(totalCO2Saved / 21),
            carsOffRoad: Math.round(totalCO2Saved / 4600), // 1 car emits 4600kg/year
            flightsSaved: Math.round(totalCO2Saved / 400) // 1 flight Delhi-Mumbai ~400kg
        };
    }
    
    getChargingCostBreakdown(kmPerMonth, evEfficiency) {
        const kwhNeeded = kmPerMonth / evEfficiency;
        
        return {
            homeCharging: {
                cost: Math.round(kwhNeeded * this.electricityPrice),
                perKwh: this.electricityPrice
            },
            publicCharging: {
                cost: Math.round(kwhNeeded * this.commercialElectricityPrice),
                perKwh: this.commercialElectricityPrice
            },
            fastCharging: {
                cost: Math.round(kwhNeeded * (this.commercialElectricityPrice * 1.5)),
                perKwh: this.commercialElectricityPrice * 1.5
            },
            savingsUsingHome: Math.round(kwhNeeded * (this.commercialElectricityPrice - this.electricityPrice))
        };
    }
}

// Initialize
const evSavings = new EVSavings();
window.evSavings = evSavings;