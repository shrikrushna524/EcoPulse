// Complete farm plan generator
class FarmPlanGenerator {
    constructor(farmerData) {
        this.farmer = farmerData;
        this.crop = farmerData.primaryCrop;
        this.area = farmerData.farmSize;
        this.soil = farmerData.soilType;
    }
    
    generateCompletePlan() {
        return {
            basicInfo: this.getBasicInfo(),
            timeline: this.getCropTimeline(),
            inputs: this.calculateInputs(),
            costs: this.calculateCosts(),
            returns: this.calculateReturns(),
            recommendations: this.getRecommendations(),
            riskAssessment: this.assessRisks()
        };
    }
    
    getBasicInfo() {
        const cropData = {
            'Rice': { duration: 120, season: 'Kharif', idealTemp: '25-35°C', waterRequirement: '1200-1500mm' },
            'Wheat': { duration: 110, season: 'Rabi', idealTemp: '15-25°C', waterRequirement: '450-650mm' },
            'Maize': { duration: 100, season: 'Both', idealTemp: '20-30°C', waterRequirement: '500-800mm' },
            'Cotton': { duration: 165, season: 'Kharif', idealTemp: '25-35°C', waterRequirement: '700-1000mm' },
            'Sugarcane': { duration: 365, season: 'Annual', idealTemp: '25-30°C', waterRequirement: '1500-2500mm' }
        };
        
        const cropInfo = cropData[this.crop] || {
            duration: 120,
            season: 'Variable',
            idealTemp: '20-30°C',
            waterRequirement: '500-800mm'
        };
        
        return {
            farmerName: this.farmer.name,
            farmLocation: `${this.farmer.village}, ${this.farmer.district}`,
            crop: this.crop,
            variety: this.farmer.cropVariety || 'Local variety',
            area: this.area + ' acres',
            soilType: this.soil,
            plantingDate: new Date(this.farmer.plantingDate).toLocaleDateString('en-IN'),
            expectedHarvest: this.farmer.harvestDate || this.calculateHarvestDate(this.farmer.plantingDate, cropInfo.duration),
            duration: cropInfo.duration + ' days',
            idealTemp: cropInfo.idealTemp,
            waterRequirement: cropInfo.waterRequirement
        };
    }
    
    calculateHarvestDate(plantingDate, duration) {
        const plant = new Date(plantingDate);
        plant.setDate(plant.getDate() + duration);
        return plant.toLocaleDateString('en-IN');
    }
    
    getCropTimeline() {
        const weeks = [];
        const planting = new Date(this.farmer.plantingDate);
        
        // Generate 16-week timeline
        for (let i = 0; i < 16; i++) {
            const weekStart = new Date(planting);
            weekStart.setDate(weekStart.getDate() + (i * 7));
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            weeks.push({
                week: i + 1,
                startDate: weekStart.toLocaleDateString('en-IN'),
                endDate: weekEnd.toLocaleDateString('en-IN'),
                activities: this.getWeekActivities(i, this.crop)
            });
        }
        
        return weeks;
    }
    
    getWeekActivities(week, crop) {
        const activities = {
            'Rice': {
                0: ['Land preparation', 'Nursery sowing'],
                1: ['Nursery management', 'Basal fertilizer application'],
                2: ['Field preparation', 'Puddling'],
                3: ['Transplanting', 'Weed management'],
                4: ['Water management', 'Urea application'],
                5: ['Second weeding', 'Pest monitoring'],
                6: ['Top dressing', 'Water management'],
                7: ['Panicle initiation', 'NPK application'],
                8: ['Flowering stage', 'Water critical'],
                9: ['Milk stage', 'Pest control'],
                10: ['Dough stage', 'Drainage'],
                11: ['Maturity', 'Drying'],
                12: ['Harvesting', 'Threshing'],
                13: ['Cleaning', 'Storage preparation'],
                14: ['Storage', 'Marketing'],
                15: ['Sale', 'Record keeping']
            },
            'Wheat': {
                0: ['Field preparation', 'Pre-sowing irrigation'],
                1: ['Sowing', 'Seed treatment'],
                2: ['Germination', 'First irrigation'],
                3: ['Crown root initiation', 'Weed control'],
                4: ['Tillering', 'Second irrigation'],
                5: ['Jointing stage', 'Nitrogen application'],
                6: ['Flag leaf stage', 'Third irrigation'],
                7: ['Ear emergence', 'Pest monitoring'],
                8: ['Flowering', 'Water management'],
                9: ['Milk stage', 'Fourth irrigation'],
                10: ['Dough stage', 'Last irrigation'],
                11: ['Maturity', 'Field drying'],
                12: ['Harvesting', 'Threshing'],
                13: ['Cleaning', 'Grading'],
                14: ['Storage', 'Moisture checking'],
                15: ['Marketing', 'Sale']
            }
        };
        
        return (activities[crop]?.[week] || [
            'Field monitoring',
            'Irrigation management',
            'Pest surveillance',
            'Record keeping'
        ]).join(' • ');
    }
    
    calculateInputs() {
        // Seed requirement per acre
        const seedRates = {
            'Rice': 40, // kg per acre
            'Wheat': 100,
            'Maize': 20,
            'Cotton': 4.5,
            'Groundnut': 100,
            'Sugarcane': 7500 // setts
        };
        
        // Fertilizer recommendation (kg per acre)
        const fertilizerRates = {
            'Rice': { urea: 130, dap: 65, potash: 40 },
            'Wheat': { urea: 120, dap: 60, potash: 30 },
            'Maize': { urea: 150, dap: 75, potash: 50 },
            'Cotton': { urea: 100, dap: 50, potash: 50 }
        };
        
        const seedRate = seedRates[this.crop] || 50;
        const fert = fertilizerRates[this.crop] || { urea: 100, dap: 50, potash: 40 };
        
        return {
            seed: {
                quantity: (seedRate * this.area).toFixed(1),
                unit: this.crop === 'Sugarcane' ? 'setts' : 'kg',
                cost: (seedRate * this.area * (this.crop === 'Sugarcane' ? 2 : 50)).toFixed(0)
            },
            fertilizer: {
                urea: (fert.urea * this.area).toFixed(1) + ' kg',
                dap: (fert.dap * this.area).toFixed(1) + ' kg',
                potash: (fert.potash * this.area).toFixed(1) + ' kg',
                totalCost: (fert.urea * this.area * 6 + fert.dap * this.area * 25 + fert.potash * this.area * 18).toFixed(0)
            },
            pesticides: {
                recommended: this.getPesticideRecommendations(),
                estimatedCost: (2000 * this.area).toFixed(0)
            },
            water: {
                irrigationCount: this.getIrrigationCount(),
                estimatedCost: (500 * this.area).toFixed(0)
            },
            labor: {
                manDays: (25 * this.area).toFixed(0),
                estimatedCost: (25 * this.area * 350).toFixed(0)
            }
        };
    }
    
    getIrrigationCount() {
        const counts = {
            'Rice': 25,
            'Wheat': 5,
            'Maize': 8,
            'Cotton': 10,
            'Vegetables': 15
        };
        return counts[this.crop] || 10;
    }
    
    getPesticideRecommendations() {
        const pests = {
            'Rice': ['Stem borer', 'Leaf folder', 'Blast disease'],
            'Wheat': ['Aphids', 'Rust', 'Karnal bunt'],
            'Maize': ['Fall armyworm', 'Stem borer'],
            'Cotton': ['Bollworms', 'Aphids', 'Whiteflies']
        };
        
        return pests[this.crop] || ['General pests'];
    }
    
    calculateCosts() {
        const inputs = this.calculateInputs();
        
        return {
            landPreparation: (2500 * this.area).toFixed(0),
            seed: inputs.seed.cost,
            fertilizer: inputs.fertilizer.totalCost,
            pesticides: inputs.pesticides.estimatedCost,
            irrigation: inputs.water.estimatedCost,
            labor: inputs.labor.estimatedCost,
            harvesting: (2000 * this.area).toFixed(0),
            miscellaneous: (1500 * this.area).toFixed(0),
            total: function() {
                return (parseFloat(this.landPreparation) +
                       parseFloat(this.seed) +
                       parseFloat(this.fertilizer) +
                       parseFloat(this.pesticides) +
                       parseFloat(this.irrigation) +
                       parseFloat(this.labor) +
                       parseFloat(this.harvesting) +
                       parseFloat(this.miscellaneous)).toFixed(0);
            }
        };
    }
    
    calculateReturns() {
        const yields = {
            'Rice': 25, // quintals per acre
            'Wheat': 22,
            'Maize': 28,
            'Cotton': 12,
            'Sugarcane': 350
        };
        
        const prices = {
            'Rice': 2000, // per quintal
            'Wheat': 2100,
            'Maize': 1800,
            'Cotton': 6000,
            'Sugarcane': 350
        };
        
        const yieldPerAcre = yields[this.crop] || 20;
        const pricePerUnit = prices[this.crop] || 2000;
        
        const totalYield = yieldPerAcre * this.area;
        const grossIncome = totalYield * pricePerUnit;
        const totalCost = parseFloat(this.calculateCosts().total());
        const netProfit = grossIncome - totalCost;
        const profitPerAcre = netProfit / this.area;
        
        return {
            expectedYield: totalYield.toFixed(1) + ' quintals',
            yieldPerAcre: yieldPerAcre + ' quintals/acre',
            pricePerUnit: '₹' + pricePerUnit + '/quintal',
            grossIncome: '₹' + grossIncome.toFixed(0),
            totalCost: '₹' + totalCost,
            netProfit: '₹' + netProfit.toFixed(0),
            profitPerAcre: '₹' + profitPerAcre.toFixed(0),
            roi: ((netProfit / totalCost) * 100).toFixed(1) + '%',
            breakEvenYield: (totalCost / pricePerUnit).toFixed(1) + ' quintals'
        };
    }
    
    getRecommendations() {
        return {
            soilHealth: [
                'Add organic matter to improve soil structure',
                'Practice crop rotation',
                'Use green manuring crops',
                'Get soil tested every 2 years'
            ],
            waterManagement: [
                'Use drip irrigation for vegetables',
                'Mulch to reduce evaporation',
                'Harvest rainwater',
                'Irrigate based on crop stage'
            ],
            pestManagement: [
                'Monitor fields regularly',
                'Use pheromone traps',
                'Conserve natural enemies',
                'Rotate pesticides to prevent resistance'
            ],
            sustainablePractices: [
                'Reduce chemical inputs gradually',
                'Try organic farming on small plot',
                'Use neem-based products',
                'Maintain field margins for biodiversity'
            ]
        };
    }
    
    assessRisks() {
        const risks = [];
        
        // Weather risks
        if (this.farmer.state === 'Punjab' || this.farmer.state === 'Haryana') {
            risks.push({
                type: 'Weather',
                risk: 'Heat wave in May-June',
                mitigation: 'Schedule planting to avoid extreme heat'
            });
        }
        
        // Pest risks by crop
        if (this.crop === 'Cotton') {
            risks.push({
                type: 'Pest',
                risk: 'Pink bollworm resistance',
                mitigation: 'Use refuge crop, monitor pheromone traps'
            });
        }
        
        if (this.crop === 'Rice') {
            risks.push({
                type: 'Disease',
                risk: 'Blast disease in humid conditions',
                mitigation: 'Use resistant varieties, avoid excess nitrogen'
            });
        }
        
        // Market risks
        risks.push({
            type: 'Market',
            risk: 'Price fluctuation at harvest',
            mitigation: 'Check MSP, consider forward contracts'
        });
        
        // Water risks
        if (this.farmer.waterSource === 'Rainfed') {
            risks.push({
                type: 'Water',
                risk: 'Drought risk',
                mitigation: 'Practice moisture conservation, grow drought-tolerant varieties'
            });
        }
        
        return risks;
    }
    
    generatePDF() {
        const plan = this.generateCompletePlan();
        
        // In production, use jsPDF or similar library
        console.log('Generating PDF with plan:', plan);
        
        return {
            filename: `Farm_Plan_${this.farmer.name}_${this.crop}_${new Date().toISOString().split('T')[0]}.pdf`,
            content: plan
        };
    }
}

// Export for use
window.FarmPlanGenerator = FarmPlanGenerator;