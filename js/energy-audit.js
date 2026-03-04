// ===== COMPLETE HOME ENERGY AUDIT MODULE =====
// Real energy efficiency calculations based on BEE standards

class EnergyAudit {
    constructor() {
        this.auditItems = this.loadAuditItems();
        this.userResponses = {};
        this.roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Home Office'];
    }

    loadAuditItems() {
        return {
            // Lighting
            lighting: [
                { id: 'led_all', text: 'LED bulbs installed throughout', points: 10, saving: 500, co2: 45 },
                { id: 'led_outdoor', text: 'Outdoor lighting with sensors', points: 5, saving: 200, co2: 18 },
                { id: 'daylight', text: 'Maximize daylight usage', points: 5, saving: 150, co2: 13 },
                { id: 'task_lighting', text: 'Task lighting instead of room lighting', points: 5, saving: 180, co2: 16 }
            ],
            
            // Appliances
            appliances: [
                { id: 'star5_refrigerator', text: '5-star rated refrigerator', points: 15, saving: 2000, co2: 180 },
                { id: 'star5_ac', text: '5-star rated ACs (all rooms)', points: 20, saving: 3000, co2: 270 },
                { id: 'star5_washing', text: '5-star washing machine', points: 10, saving: 800, co2: 72 },
                { id: 'star5_tv', text: 'Energy efficient TV', points: 5, saving: 300, co2: 27 },
                { id: 'induction', text: 'Induction cooktop (vs gas)', points: 10, saving: 1200, co2: 0 }
            ],
            
            // Insulation & Building
            insulation: [
                { id: 'wall_insulation', text: 'Wall insulation installed', points: 15, saving: 2500, co2: 225 },
                { id: 'roof_insulation', text: 'Roof/ceiling insulation', points: 15, saving: 2000, co2: 180 },
                { id: 'double_glaze', text: 'Double-glazed windows', points: 10, saving: 1500, co2: 135 },
                { id: 'weather_stripping', text: 'Door/window weather stripping', points: 8, saving: 800, co2: 72 },
                { id: 'window_tint', text: 'Solar control window film', points: 7, saving: 1000, co2: 90 }
            ],
            
            // HVAC
            hvac: [
                { id: 'programmable_thermostat', text: 'Programmable thermostat', points: 8, saving: 1200, co2: 108 },
                { id: 'ceiling_fans', text: 'Energy efficient ceiling fans', points: 5, saving: 400, co2: 36 },
                { id: 'ac_maintenance', text: 'Regular AC maintenance', points: 5, saving: 600, co2: 54 },
                { id: 'air_purifier', text: 'Energy efficient air purifier', points: 3, saving: 200, co2: 18 },
                { id: 'humidifier', text: 'Humidity control system', points: 4, saving: 300, co2: 27 }
            ],
            
            // Water Heating
            waterHeating: [
                { id: 'solar_water_heater', text: 'Solar water heater installed', points: 15, saving: 3000, co2: 270 },
                { id: 'heat_pump', text: 'Heat pump water heater', points: 12, saving: 2000, co2: 180 },
                { id: 'tankless_heater', text: 'Tankless/on-demand water heater', points: 8, saving: 1000, co2: 90 },
                { id: 'insulated_pipes', text: 'Insulated hot water pipes', points: 5, saving: 400, co2: 36 }
            ],
            
            // Smart Home
            smartHome: [
                { id: 'smart_power_strips', text: 'Smart power strips', points: 5, saving: 300, co2: 27 },
                { id: 'smart_thermostat', text: 'Smart thermostat', points: 8, saving: 1000, co2: 90 },
                { id: 'energy_monitor', text: 'Real-time energy monitor', points: 5, saving: 600, co2: 54 },
                { id: 'smart_lighting', text: 'Smart lighting controls', points: 5, saving: 400, co2: 36 },
                { id: 'motion_sensors', text: 'Motion sensor lights', points: 5, saving: 300, co2: 27 }
            ],
            
            // Renewable Energy
            renewable: [
                { id: 'solar_panels', text: 'Solar PV system installed', points: 25, saving: 12000, co2: 1500 },
                { id: 'solar_rooftop', text: 'Rooftop solar (grid-tied)', points: 20, saving: 10000, co2: 1250 },
                { id: 'battery_storage', text: 'Battery storage system', points: 15, saving: 0, co2: 0 },
                { id: 'wind_turbine', text: 'Small wind turbine', points: 20, saving: 8000, co2: 1000 },
                { id: 'biogas', text: 'Biogas system', points: 15, saving: 5000, co2: 750 }
            ],
            
            // Habits & Behavior
            habits: [
                { id: 'unplug_idle', text: 'Unplug idle electronics', points: 5, saving: 500, co2: 45 },
                { id: 'natural_ventilation', text: 'Use natural ventilation', points: 5, saving: 800, co2: 72 },
                { id: 'cold_wash', text: 'Wash clothes in cold water', points: 3, saving: 400, co2: 36 },
                { id: 'full_loads', text: 'Run full loads only', points: 3, saving: 300, co2: 27 },
                { id: 'fan_before_ac', text: 'Use fans before AC', points: 4, saving: 600, co2: 54 },
                { id: 'curtains', text: 'Use curtains to block sun', points: 4, saving: 500, co2: 45 }
            ]
        };
    }

    // Calculate audit score
    calculateScore(responses) {
        this.userResponses = { ...this.userResponses, ...responses };
        
        let totalPoints = 0;
        let maxPoints = 0;
        let annualSavings = 0;
        let co2Reduction = 0;
        let recommendations = [];
        let completedItems = [];

        // Calculate totals
        for (const category in this.auditItems) {
            this.auditItems[category].forEach(item => {
                maxPoints += item.points;
                if (this.userResponses[item.id]) {
                    totalPoints += item.points;
                    annualSavings += item.saving;
                    co2Reduction += item.co2;
                    completedItems.push(item);
                } else {
                    recommendations.push({
                        ...item,
                        category: category
                    });
                }
            });
        }

        // Calculate efficiency rating
        const efficiencyPercent = (totalPoints / maxPoints) * 100;
        let rating, ratingColor;

        if (efficiencyPercent >= 80) {
            rating = 'Excellent';
            ratingColor = '#4CAF50';
        } else if (efficiencyPercent >= 60) {
            rating = 'Good';
            ratingColor = '#2196F3';
        } else if (efficiencyPercent >= 40) {
            rating = 'Average';
            ratingColor = '#FFC107';
        } else if (efficiencyPercent >= 20) {
            rating = 'Below Average';
            ratingColor = '#FF9800';
        } else {
            rating = 'Poor';
            ratingColor = '#F44336';
        }

        // Calculate payback periods
        const priorityRecommendations = this.prioritizeRecommendations(recommendations);

        return {
            score: totalPoints,
            maxScore: maxPoints,
            efficiencyPercent: Math.round(efficiencyPercent),
            rating: rating,
            ratingColor: ratingColor,
            annualSavings: Math.round(annualSavings),
            co2Reduction: Math.round(co2Reduction),
            co2Tons: (co2Reduction / 1000).toFixed(1),
            treesEquivalent: Math.round(co2Reduction / 50), // 50kg CO2 per tree per year
            carsEquivalent: (co2Reduction / 4600).toFixed(1), // 4600kg per car per year
            completedCount: completedItems.length,
            totalItems: completedItems.length + recommendations.length,
            recommendations: recommendations.slice(0, 10),
            priorityRecs: priorityRecommendations.slice(0, 5),
            completedItems: completedItems,
            categoryBreakdown: this.getCategoryBreakdown()
        };
    }

    // Prioritize recommendations by ROI
    prioritizeRecommendations(recommendations) {
        return recommendations.sort((a, b) => {
            const roiA = a.saving / a.points;
            const roiB = b.saving / b.points;
            return roiB - roiA;
        });
    }

    // Get breakdown by category
    getCategoryBreakdown() {
        const breakdown = {};

        for (const category in this.auditItems) {
            let categoryPoints = 0;
            let categoryMax = 0;
            let categorySavings = 0;

            this.auditItems[category].forEach(item => {
                categoryMax += item.points;
                if (this.userResponses[item.id]) {
                    categoryPoints += item.points;
                    categorySavings += item.saving;
                }
            });

            breakdown[category] = {
                score: categoryPoints,
                max: categoryMax,
                percent: Math.round((categoryPoints / categoryMax) * 100) || 0,
                savings: categorySavings
            };
        }

        return breakdown;
    }

    // Compare with similar homes
    getComparison(houseSize, familySize) {
        // Average scores based on house size (sq ft)
        const avgScores = {
            'small': { '<1000': 45, '1000-1500': 50, '1500-2000': 55 },
            'medium': { '<1000': 50, '1000-1500': 55, '1500-2000': 60 },
            'large': { '<1000': 55, '1000-1500': 60, '1500-2000': 65 }
        };

        let sizeCategory = 'medium';
        if (houseSize < 1000) sizeCategory = 'small';
        if (houseSize > 2000) sizeCategory = 'large';

        let familyCategory = '<1000';
        if (familySize >= 3 && familySize <= 4) familyCategory = '1000-1500';
        if (familySize >= 5) familyCategory = '1500-2000';

        const avgScore = avgScores[sizeCategory][familyCategory] || 55;

        return {
            avgScore: avgScore,
            percentile: this.calculatePercentile(avgScore),
            betterThan: Math.round((this.userResponses.score / avgScore) * 100) || 0
        };
    }

    calculatePercentile(avgScore) {
        // Simplified percentile calculation
        const score = this.userResponses.score || 0;
        if (score > avgScore + 20) return 95;
        if (score > avgScore + 10) return 80;
        if (score > avgScore) return 60;
        if (score > avgScore - 10) return 40;
        if (score > avgScore - 20) return 20;
        return 5;
    }

    // Generate detailed report
    generateReport(userInfo = {}) {
        const score = this.calculateScore({});
        
        const report = {
            generatedAt: new Date().toISOString(),
            userInfo: userInfo,
            summary: {
                score: score.efficiencyPercent,
                rating: score.rating,
                annualSavings: '₹' + score.annualSavings.toLocaleString(),
                co2Reduction: score.co2Tons + ' tons',
                treesEquivalent: score.treesEquivalent
            },
            breakdown: score.categoryBreakdown,
            topRecommendations: score.priorityRecs.map(rec => ({
                action: rec.text,
                savings: '₹' + rec.saving + '/year',
                co2Reduction: rec.co2 + ' kg',
                priority: 'High'
            })),
            completedItems: score.completedItems.map(item => item.text),
            financialAnalysis: this.calculateFinancials(score.annualSavings),
            environmentalImpact: {
                co2Tons: score.co2Tons,
                treesPlanted: score.treesEquivalent,
                carsRemoved: (score.co2Reduction / 4600).toFixed(1)
            }
        };

        return report;
    }

    // Calculate financial projections
    calculateFinancials(annualSavings) {
        const years = [1, 5, 10, 20];
        const projections = {};

        years.forEach(year => {
            projections[year + 'year'] = {
                savings: '₹' + (annualSavings * year).toLocaleString(),
                co2Reduction: (annualSavings * year / 1000).toFixed(1) + ' tons',
                roi: (year * (annualSavings / 50000) * 100).toFixed(1) + '%'
            };
        });

        return projections;
    }

    // Get appliance-specific recommendations
    getApplianceAdvice(applianceType, model, age) {
        const advice = {
            'refrigerator': {
                efficient: age < 5 && model?.includes('5-star'),
                recommendation: age > 10 ? 'Consider replacing - old refrigerators use 2x energy' :
                               !model?.includes('5-star') ? 'Upgrade to 5-star model to save ₹2000/year' :
                               'Your refrigerator is efficient',
                savings: age > 10 ? 3000 : (model?.includes('5-star') ? 0 : 2000)
            },
            'ac': {
                efficient: age < 3 && model?.includes('5-star'),
                recommendation: age > 8 ? 'Replace with 5-star inverter AC' :
                               !model?.includes('5-star') ? '5-star ACs use 40% less energy' :
                               'Regular maintenance will maintain efficiency',
                savings: age > 8 ? 4000 : (model?.includes('5-star') ? 0 : 2500)
            },
            'washing_machine': {
                efficient: age < 4 && model?.includes('5-star'),
                recommendation: age > 7 ? 'New machines use 50% less water and energy' :
                               'Use cold water cycles to save energy',
                savings: 800
            },
            'tv': {
                efficient: age < 3 && model?.includes('LED'),
                recommendation: 'LED TVs use 40% less than LCD',
                savings: 300
            }
        };

        return advice[applianceType] || {
            efficient: true,
            recommendation: 'Your appliance seems efficient',
            savings: 0
        };
    }

    // Calculate peak demand
    calculatePeakDemand(appliances) {
        let peakLoad = 0;
        const applianceLoads = {
            'ac': 1500, // watts
            'geyser': 2000,
            'refrigerator': 200,
            'tv': 100,
            'lighting': 300,
            'fan': 70,
            'iron': 1000,
            'microwave': 1200,
            'washing_machine': 500
        };

        appliances.forEach(app => {
            peakLoad += applianceLoads[app.type] || 0;
        });

        return {
            peakLoad: peakLoad / 1000, // kW
            recommendedSanction: Math.ceil(peakLoad / 1000) * 1000,
            monthlyFixedCharge: Math.ceil(peakLoad / 1000) * 50 // ₹50 per kW
        };
    }

    // Export audit data
    exportAudit(format = 'json') {
        const data = {
            timestamp: new Date().toISOString(),
            responses: this.userResponses,
            score: this.calculateScore({})
        };

        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        } else if (format === 'csv') {
            return this.convertToCSV(data);
        } else if (format === 'pdf') {
            return this.generatePDF(data);
        }
    }

    convertToCSV(data) {
        const headers = ['Category', 'Item', 'Status', 'Points', 'Savings'];
        const rows = [];

        for (const category in this.auditItems) {
            this.auditItems[category].forEach(item => {
                rows.push([
                    category,
                    item.text,
                    this.userResponses[item.id] ? 'Completed' : 'Pending',
                    item.points,
                    '₹' + item.saving
                ]);
            });
        }

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    generatePDF(data) {
        // In production, use jsPDF library
        return 'PDF generation requires jsPDF library';
    }

    // Get energy saving tips
    getDailyTips() {
        const tips = [
            {
                tip: 'Set AC to 24°C instead of 18°C',
                savings: 'Save ₹2000/year',
                co2: '180 kg CO2'
            },
            {
                tip: 'Use natural light during day',
                savings: 'Save ₹800/year',
                co2: '72 kg CO2'
            },
            {
                tip: 'Unplug chargers when not in use',
                savings: 'Save ₹500/year',
                co2: '45 kg CO2'
            },
            {
                tip: 'Wash clothes in cold water',
                savings: 'Save ₹400/year',
                co2: '36 kg CO2'
            },
            {
                tip: 'Clean AC filters monthly',
                savings: 'Save ₹600/year',
                co2: '54 kg CO2'
            },
            {
                tip: 'Use ceiling fans before AC',
                savings: 'Save ₹800/year',
                co2: '72 kg CO2'
            },
            {
                tip: 'Cook with lids on pots',
                savings: 'Save ₹300/year',
                co2: '27 kg CO2'
            },
            {
                tip: 'Run full loads in washing machine',
                savings: 'Save ₹400/year',
                co2: '36 kg CO2'
            }
        ];

        // Return random tip for today
        const today = new Date().getDate();
        return tips[today % tips.length];
    }

    // Seasonal advice
    getSeasonalAdvice(season = 'summer') {
        const advice = {
            'summer': [
                'Set AC temperature to 24°C',
                'Use curtains to block afternoon sun',
                'Cook outdoors or use microwave',
                'Service AC before summer peak',
                'Use ceiling fans to supplement AC'
            ],
            'winter': [
                'Use natural sunlight for heating',
                'Seal windows to prevent drafts',
                'Wear warm clothes instead of heating',
                'Reverse ceiling fan direction',
                'Use space heaters only when needed'
            ],
            'monsoon': [
                'Check for water leaks',
                'Use dehumidifiers efficiently',
                'Air dry clothes when possible',
                'Maintain indoor air quality',
                'Check electrical safety'
            ]
        };

        return advice[season] || advice.summer;
    }
}

// Export for use
window.EnergyAudit = EnergyAudit;