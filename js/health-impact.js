// ===== COMPLETE HEALTH IMPACT CALCULATOR MODULE =====
class HealthImpact {
    constructor() {
        this.healthEffects = this.loadHealthEffects();
        this.riskFactors = this.loadRiskFactors();
    }
    
    loadHealthEffects() {
        return {
            shortTerm: [
                { aqi: 150, effect: 'Eye irritation', threshold: '1-2 hours' },
                { aqi: 150, effect: 'Throat irritation', threshold: '2-3 hours' },
                { aqi: 200, effect: 'Coughing', threshold: '1 hour' },
                { aqi: 200, effect: 'Wheezing', threshold: '2 hours' },
                { aqi: 250, effect: 'Chest tightness', threshold: '30 min' },
                { aqi: 300, effect: 'Difficulty breathing', threshold: '15 min' }
            ],
            longTerm: [
                { effect: 'Reduced lung function', risk: '+15% per 10 years' },
                { effect: 'Asthma development', risk: '+20%' },
                { effect: 'Heart disease', risk: '+10%' },
                { effect: 'Stroke risk', risk: '+8%' },
                { effect: 'Lung cancer', risk: '+5%' }
            ]
        };
    }
    
    loadRiskFactors() {
        return {
            age: {
                child: { factor: 1.3, reason: 'Developing lungs' },
                adult: { factor: 1.0, reason: 'Normal adult' },
                elderly: { factor: 1.4, reason: 'Reduced immunity' }
            },
            conditions: {
                asthma: { factor: 2.0, reason: 'Sensitive airways' },
                copd: { factor: 2.2, reason: 'Compromised lung function' },
                heart: { factor: 1.5, reason: 'Cardiovascular strain' },
                diabetes: { factor: 1.3, reason: 'Inflammation' },
                none: { factor: 1.0, reason: 'No pre-existing conditions' }
            },
            lifestyle: {
                smoker: { factor: 2.5, reason: 'Combined lung damage' },
                formerSmoker: { factor: 1.3, reason: 'Partial recovery' },
                active: { factor: 0.9, reason: 'Better lung capacity' },
                sedentary: { factor: 1.2, reason: 'Reduced respiratory reserve' }
            },
            occupation: {
                outdoor: { factor: 1.4, reason: 'Continuous exposure' },
                traffic: { factor: 1.6, reason: 'Peak hour exposure' },
                industrial: { factor: 1.8, reason: 'High local pollution' },
                office: { factor: 1.0, reason: 'Filtered air possible' }
            }
        };
    }
    
    calculateRisk(aqi, exposureHours, age, conditions, lifestyle, occupation) {
        // Base risk from AQI
        let baseRisk = 0;
        if (aqi <= 50) baseRisk = 5;
        else if (aqi <= 100) baseRisk = 15;
        else if (aqi <= 150) baseRisk = 30;
        else if (aqi <= 200) baseRisk = 50;
        else if (aqi <= 300) baseRisk = 75;
        else baseRisk = 95;
        
        // Exposure factor (hours per day)
        const exposureFactor = Math.min(2, exposureHours / 8);
        
        // Apply risk factors
        let totalRisk = baseRisk * exposureFactor;
        
        const ageFactor = this.riskFactors.age[age]?.factor || 1.0;
        const conditionFactor = this.riskFactors.conditions[conditions]?.factor || 1.0;
        const lifestyleFactor = this.riskFactors.lifestyle[lifestyle]?.factor || 1.0;
        const occupationFactor = this.riskFactors.occupation[occupation]?.factor || 1.0;
        
        totalRisk *= (ageFactor * conditionFactor * lifestyleFactor * occupationFactor);
        
        return Math.min(100, Math.round(totalRisk));
    }
    
    getSymptoms(aqi) {
        if (aqi <= 50) return ['No symptoms expected'];
        if (aqi <= 100) return ['Possible mild irritation in sensitive individuals'];
        if (aqi <= 150) return ['Eye irritation', 'Throat dryness', 'Mild cough'];
        if (aqi <= 200) return ['Persistent cough', 'Throat irritation', 'Chest discomfort', 'Fatigue'];
        if (aqi <= 300) return ['Wheezing', 'Chest tightness', 'Breathing difficulty', 'Headache'];
        return ['Severe breathing difficulty', 'Chest pain', 'Nausea', 'Dizziness'];
    }
    
    getRecommendations(riskLevel, aqi) {
        if (riskLevel < 20) {
            return {
                action: 'Enjoy outdoor activities',
                mask: 'Not needed',
                exercise: 'Safe for all',
                indoor: 'Ventilate naturally'
            };
        } else if (riskLevel < 40) {
            return {
                action: 'Limit prolonged exertion',
                mask: 'Optional for sensitive',
                exercise: 'Reduce intensity',
                indoor: 'Keep windows closed during peak'
            };
        } else if (riskLevel < 60) {
            return {
                action: 'Reduce outdoor activities',
                mask: 'N95 recommended',
                exercise: 'Indoor only',
                indoor: 'Use air purifier if available'
            };
        } else if (riskLevel < 80) {
            return {
                action: 'Avoid outdoor activities',
                mask: 'N95 mandatory outdoors',
                exercise: 'No outdoor exercise',
                indoor: 'Keep sealed, use purifier'
            };
        } else {
            return {
                action: 'STAY INDOORS',
                mask: 'N95 if must go out',
                exercise: 'No exertion',
                indoor: 'Maximum protection needed'
            };
        }
    }
    
    calculateLifeExpectancy(aqi, yearsExposed) {
        // Each 10 μg/m³ PM2.5 reduces life expectancy by 0.64 years
        const pm25 = aqi * 0.33; // Approximate conversion
        const reductionPerYear = (pm25 / 10) * 0.64;
        const totalReduction = reductionPerYear * (yearsExposed / 70) * 70;
        
        return {
            lifeExpectancyReduction: Math.round(totalReduction * 10) / 10,
            healthyYearsLost: Math.round(totalReduction * 0.7 * 10) / 10,
            qualityOfLifeReduction: Math.min(100, Math.round(totalReduction * 5))
        };
    }
    
    getVulnerableGroups() {
        return [
            { group: 'Children', reason: 'Developing lungs, breathe faster', protection: 'Limit outdoor play' },
            { group: 'Elderly', reason: 'Reduced immunity, existing conditions', protection: 'Stay indoors' },
            { group: 'Asthmatics', reason: 'Triggered by pollutants', protection: 'Keep inhaler ready' },
            { group: 'Pregnant Women', reason: 'Affects fetal development', protection: 'Avoid exposure' },
            { group: 'Heart Patients', reason: 'Increased strain', protection: 'Monitor symptoms' }
        ];
    }
    
    getLongTermEffects(yearsExposed, avgAQI) {
        const effects = [];
        
        if (avgAQI > 100) {
            effects.push({ effect: 'Reduced lung function', percentage: 15 });
            effects.push({ effect: 'Increased asthma risk', percentage: 20 });
        }
        
        if (avgAQI > 150) {
            effects.push({ effect: 'Heart disease risk', percentage: 10 });
            effects.push({ effect: 'Stroke risk', percentage: 8 });
        }
        
        if (avgAQI > 200) {
            effects.push({ effect: 'Lung cancer risk', percentage: 5 });
            effects.push({ effect: 'COPD development', percentage: 12 });
        }
        
        return effects;
    }
    
    getEconomicImpact(riskLevel, dailyWage) {
        const sickDaysPerYear = riskLevel < 30 ? 2 :
                                riskLevel < 50 ? 4 :
                                riskLevel < 70 ? 8 : 15;
        
        const medicalCosts = riskLevel < 30 ? 1000 :
                            riskLevel < 50 ? 2500 :
                            riskLevel < 70 ? 5000 : 10000;
        
        return {
            sickDaysPerYear: sickDaysPerYear,
            lostWages: sickDaysPerYear * dailyWage,
            medicalCosts: medicalCosts,
            totalAnnualCost: sickDaysPerYear * dailyWage + medicalCosts
        };
    }
}

// Initialize
const healthImpact = new HealthImpact();
window.healthImpact = healthImpact;