// ===== COMPREHENSIVE ENVIRONMENTAL CALCULATORS =====

class EnvironmentalCalculators {
    
    // ===== AGRICULTURE CALCULATORS =====
    
    static calculateCropYield(area, cropType, soilQuality, rainfall) {
        const baseYield = {
            'corn': 8000, // kg per hectare
            'wheat': 5000,
            'rice': 7000,
            'soybeans': 3500,
            'tomatoes': 40000
        };
        
        const soilFactor = soilQuality / 100; // 0-1
        const rainFactor = Math.min(rainfall / 500, 1.2); // optimal 500mm
        
        let yield_kg = baseYield[cropType] * soilFactor * rainFactor * 2.47; // convert to acres
        
        return {
            yieldPerAcre: Math.round(yield_kg),
            totalYield: Math.round(yield_kg * area),
            profit: Math.round(yield_kg * area * 0.5), // $0.5/kg average
            sustainability: Math.round((soilFactor + rainFactor) * 50)
        };
    }
    
    // ===== ENERGY CALCULATORS =====
    
    static calculateSolarPotential(roofArea, location, panelEfficiency = 0.2) {
        const solarIrradiance = {
            'arizona': 6.5, // kWh/m²/day
            'california': 5.8,
            'texas': 5.2,
            'newyork': 4.2,
            'florida': 5.5,
            'default': 4.5
        };
        
        const irradiance = solarIrradiance[location] || solarIrradiance.default;
        const dailyProduction = roofArea * irradiance * panelEfficiency;
        const annualProduction = dailyProduction * 365;
        
        const co2Saved = annualProduction * 0.4; // kg CO2 per kWh
        const treesEquivalent = Math.round(co2Saved / 21); // 21kg CO2 per tree per year
        const savings = annualProduction * 0.15; // $0.15 per kWh
        
        return {
            dailyKWh: Math.round(dailyProduction * 10) / 10,
            annualKWh: Math.round(annualProduction),
            co2SavedKg: Math.round(co2Saved),
            treesEquivalent: treesEquivalent,
            annualSavings: Math.round(savings),
            paybackYears: Math.round((roofArea * 200) / savings) // rough estimate
        };
    }
    
    // ===== WATER CALCULATORS =====
    
    static calculateRainwaterHarvest(roofArea, annualRainfall, collectionEfficiency = 0.85) {
        // roofArea in m², rainfall in mm
        const litersPerYear = roofArea * annualRainfall * collectionEfficiency;
        const gallonsPerYear = litersPerYear * 0.264172;
        
        const tankSize = Math.ceil(litersPerYear / 12); // 1 month storage
        const toiletFlushes = Math.round(litersPerYear / 6); // 6L per flush
        const showerDays = Math.round(litersPerYear / 50); // 50L per shower
        
        return {
            litersPerYear: Math.round(litersPerYear),
            gallonsPerYear: Math.round(gallonsPerYear),
            recommendedTankSize: tankSize,
            toiletFlushes: toiletFlushes,
            showersProvided: showerDays,
            moneySaved: Math.round(litersPerYear * 0.002) // $0.002 per liter
        };
    }
    
    // ===== TRANSPORTATION CALCULATORS =====
    
    static compareCommute(distance, daysPerWeek, carMPG = 25, busFare = 2.5) {
        const weeksPerYear = 52;
        const annualMiles = distance * daysPerWeek * weeksPerYear * 2; // round trip
        
        // Car emissions
        const gallonsGas = annualMiles / carMPG;
        const carCO2 = gallonsGas * 8.887; // kg CO2 per gallon
        const carCost = gallonsGas * 3.5; // $3.5 per gallon
        
        // Bus emissions (0.14 kg CO2 per mile per passenger)
        const busCO2 = annualMiles * 0.14;
        const busCost = distance * 2 * daysPerWeek * weeksPerYear * busFare;
        
        // Bike emissions (zero)
        const bikeCO2 = 0;
        const bikeCost = 100; // maintenance per year
        
        // Walking emissions (zero)
        const walkCO2 = 0;
        const walkCost = 50; // shoes and maintenance
        
        // Calories burned (approx)
        const bikeCalories = distance * 40 * daysPerWeek * weeksPerYear; // 40 cal/mile
        const walkCalories = distance * 100 * daysPerWeek * weeksPerYear; // 100 cal/mile
        
        return {
            car: {
                co2Kg: Math.round(carCO2),
                cost: Math.round(carCost),
                treesNeeded: Math.round(carCO2 / 21)
            },
            bus: {
                co2Kg: Math.round(busCO2),
                cost: Math.round(busCost),
                treesNeeded: Math.round(busCO2 / 21)
            },
            bike: {
                co2Kg: 0,
                cost: bikeCost,
                caloriesBurned: Math.round(bikeCalories)
            },
            walk: {
                co2Kg: 0,
                cost: walkCost,
                caloriesBurned: Math.round(walkCalories)
            },
            savings: {
                co2: Math.round(carCO2 - busCO2),
                money: Math.round(carCost - busCost)
            }
        };
    }
    
    // ===== WASTE CALCULATORS =====
    
    static calculateWasteFootprint(plasticBottles, paperSheets, foodWaste, recycling = true) {
        // Average emissions per item
        const bottleEmissions = 0.082; // kg CO2 per bottle
        const paperEmissions = 0.005; // kg CO2 per sheet
        const foodWasteEmissions = 2.5; // kg CO2 per kg food waste
        
        let totalEmissions = (plasticBottles * bottleEmissions) + 
                            (paperSheets * paperEmissions) + 
                            (foodWaste * foodWasteEmissions);
        
        // Recycling reduces impact by about 50%
        if (recycling) {
            totalEmissions *= 0.5;
        }
        
        const treesNeeded = totalEmissions / 21;
        const landfillSpace = (plasticBottles * 0.5) + (paperSheets * 0.01) + (foodWaste * 2); // liters
        
        return {
            weeklyEmissionsKg: Math.round(totalEmissions * 10) / 10,
            yearlyEmissionsKg: Math.round(totalEmissions * 52),
            treesNeeded: Math.round(treesNeeded * 52),
            landfillSpaceLiters: Math.round(landfillSpace * 52),
            comparison: {
                carMiles: Math.round(totalEmissions / 0.4), // 0.4 kg per mile
                phoneCharges: Math.round(totalEmissions / 0.005) // 0.005 kg per charge
            }
        };
    }
    
    // ===== CARBON FOOTPRINT CALCULATOR =====
    
    static calculateCarbonFootprint(energy, transport, food, waste) {
        // energy in kWh
        // transport in miles
        // food in kg (meat/dairy heavy)
        // waste in kg
        
        const energyEmissions = energy * 0.4; // 0.4 kg CO2 per kWh
        const transportEmissions = transport * 0.4; // 0.4 kg CO2 per mile
        const foodEmissions = food * 5; // 5 kg CO2 per kg food (avg)
        const wasteEmissions = waste * 2.5; // 2.5 kg CO2 per kg waste
        
        const total = energyEmissions + transportEmissions + foodEmissions + wasteEmissions;
        
        // Global average is about 4000 kg per person per year
        const globalAverage = 4000;
        const percentOfAverage = (total / globalAverage) * 100;
        
        // Offsetting cost (approx $10 per ton CO2)
        const offsetCost = (total / 1000) * 10;
        
        return {
            totalKgCO2: Math.round(total),
            energyShare: Math.round((energyEmissions / total) * 100),
            transportShare: Math.round((transportEmissions / total) * 100),
            foodShare: Math.round((foodEmissions / total) * 100),
            wasteShare: Math.round((wasteEmissions / total) * 100),
            vsAverage: Math.round(percentOfAverage),
            offsetCost: Math.round(offsetCost * 100) / 100,
            treesNeeded: Math.round(total / 21)
        };
    }
    
    // ===== AIR QUALITY INDEX CALCULATOR =====
    
    static calculateAQI(pm25, pm10, o3, no2, so2) {
        // Simplified AQI calculation based on EPA formula
        const breakpoints = {
            pm25: [0, 12, 35.4, 55.4, 150.4, 250.4],
            pm10: [0, 54, 154, 254, 354, 424],
            o3: [0, 54, 70, 85, 105, 200],
            no2: [0, 53, 100, 360, 649, 1249],
            so2: [0, 35, 75, 185, 304, 604]
        };
        
        const aqiLevels = [0, 50, 100, 150, 200, 300, 500];
        
        function calculateSubIndex(value, pollutant) {
            const bp = breakpoints[pollutant];
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
            calculateSubIndex(so2, 'so2')
        ];
        
        const aqi = Math.max(...indices);
        
        // Determine category and health implications
        let category, color, healthMessage;
        if (aqi <= 50) {
            category = "Good";
            color = "#00E400";
            healthMessage = "Air quality is satisfactory, and air pollution poses little or no risk.";
        } else if (aqi <= 100) {
            category = "Moderate";
            color = "#FFFF00";
            healthMessage = "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.";
        } else if (aqi <= 150) {
            category = "Unhealthy for Sensitive Groups";
            color = "#FF7E00";
            healthMessage = "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
        } else if (aqi <= 200) {
            category = "Unhealthy";
            color = "#FF0000";
            healthMessage = "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.";
        } else if (aqi <= 300) {
            category = "Very Unhealthy";
            color = "#8F3F97";
            healthMessage = "Health alert: The risk of health effects is increased for everyone.";
        } else {
            category = "Hazardous";
            color = "#7E0023";
            healthMessage = "Health warning of emergency conditions: everyone is more likely to be affected.";
        }
        
        return {
            aqi: aqi,
            category: category,
            color: color,
            healthMessage: healthMessage,
            dominantPollutant: ['PM2.5', 'PM10', 'O3', 'NO2', 'SO2'][indices.indexOf(aqi)]
        };
    }
    
    // ===== TREE CARBON SEQUESTRATION =====
    
    static calculateTreeImpact(treeCount, years = 1, species = 'mixed') {
        const sequestrationRates = {
            'oak': 22, // kg CO2 per year
            'maple': 20,
            'pine': 18,
            'eucalyptus': 25,
            'mixed': 21
        };
        
        const rate = sequestrationRates[species] || 21;
        const totalCO2 = treeCount * rate * years;
        
        return {
            trees: treeCount,
            co2SequesteredKg: Math.round(totalCO2),
            co2SequesteredTons: Math.round(totalCO2 / 1000 * 10) / 10,
            carMilesOffset: Math.round(totalCO2 / 0.4), // 0.4 kg per mile
            homesEnergyOffset: Math.round(totalCO2 / 4000), // 4000 kg per home per year
            oxygenProducedKg: Math.round(totalCO2 * 0.727) // trees produce O2 in ratio to CO2 absorbed
        };
    }
    
    // ===== EV SAVINGS CALCULATOR =====
    
    static calculateEVSavings(annualMiles, currentMPG = 25, evEfficiency = 0.3, electricityRate = 0.13) {
        // kWh per mile for EV (average 0.3 kWh/mile)
        const evKWhPerMile = evEfficiency;
        const evAnnualKWh = annualMiles * evKWhPerMile;
        const evCost = evAnnualKWh * electricityRate;
        
        // Gas car
        const gallonsGas = annualMiles / currentMPG;
        const gasCost = gallonsGas * 3.5; // $3.5 per gallon
        const gasCO2 = gallonsGas * 8.887; // kg CO2
        
        // EV emissions (depends on grid mix, average 0.4 kg CO2 per kWh)
        const evCO2 = evAnnualKWh * 0.4;
        
        // Savings
        const annualSavings = gasCost - evCost;
        const co2Reduction = gasCO2 - evCO2;
        
        // Battery range calculations
        const batteryCapacity = 60; // kWh, typical EV
        const rangePerCharge = batteryCapacity / evKWhPerMile;
        
        return {
            annualCost: {
                gas: Math.round(gasCost),
                ev: Math.round(evCost),
                savings: Math.round(annualSavings)
            },
            annualEmissions: {
                gas: Math.round(gasCO2),
                ev: Math.round(evCO2),
                reduction: Math.round(co2Reduction)
            },
            treesEquivalent: Math.round(co2Reduction / 21),
            rangePerCharge: Math.round(rangePerCharge),
            chargesPerYear: Math.round(annualMiles / rangePerCharge),
            tenYearSavings: Math.round(annualSavings * 10)
        };
    }
}

// Export for use in other files
window.EnvironmentalCalculators = EnvironmentalCalculators;