// ===== COMPLETE RESPIRATORY HEALTH MODULE =====
class RespiratoryHealth {
    constructor() {
        this.conditions = this.loadConditions();
        this.airQualityLevels = this.loadAirQualityLevels();
        this.breathingExercises = this.loadBreathingExercises();
    }
    
    loadConditions() {
        return {
            'asthma': {
                name: 'Asthma',
                triggers: ['Pollution', 'Pollen', 'Cold air', 'Exercise'],
                symptoms: ['Wheezing', 'Coughing', 'Chest tightness', 'Shortness of breath'],
                medications: ['Inhalers', 'Steroids', 'Bronchodilators'],
                tips: ['Use peak flow meter', 'Avoid triggers', 'Keep rescue inhaler handy']
            },
            'allergies': {
                name: 'Allergic Rhinitis',
                triggers: ['Pollen', 'Dust mites', 'Mold', 'Pet dander'],
                symptoms: ['Sneezing', 'Runny nose', 'Itchy eyes', 'Congestion'],
                medications: ['Antihistamines', 'Nasal sprays', 'Eye drops'],
                tips: ['Check pollen counts', 'Use air purifier', 'Shower after outdoors']
            },
            'copd': {
                name: 'COPD',
                triggers: ['Smoking', 'Pollution', 'Respiratory infections'],
                symptoms: ['Chronic cough', 'Shortness of breath', 'Wheezing', 'Fatigue'],
                medications: ['Bronchodilators', 'Steroids', 'Oxygen therapy'],
                tips: ['Quit smoking', 'Pulmonary rehabilitation', 'Breathing techniques']
            },
            'bronchitis': {
                name: 'Bronchitis',
                triggers: ['Viral infections', 'Smoking', 'Pollution'],
                symptoms: ['Productive cough', 'Chest discomfort', 'Fatigue', 'Low fever'],
                medications: ['Cough medicine', 'Inhalers', 'Antibiotics if bacterial'],
                tips: ['Rest', 'Hydrate', 'Use humidifier', 'Avoid irritants']
            }
        };
    }
    
    loadAirQualityLevels() {
        return {
            'good': { range: '0-50', color: 'green', advice: 'Great day for outdoor activities' },
            'moderate': { range: '51-100', color: 'yellow', advice: 'Sensitive individuals should limit prolonged exertion' },
            'unhealthy-sensitive': { range: '101-150', color: 'orange', advice: 'Sensitive groups: reduce outdoor activities' },
            'unhealthy': { range: '151-200', color: 'red', advice: 'Everyone should limit outdoor activities' },
            'very-unhealthy': { range: '201-300', color: 'purple', advice: 'Health alert: avoid all outdoor activities' },
            'hazardous': { range: '301-500', color: 'maroon', advice: 'Emergency conditions: stay indoors' }
        };
    }
    
    loadBreathingExercises() {
        return [
            {
                name: 'Diaphragmatic Breathing',
                steps: [
                    'Sit or lie down comfortably',
                    'Place one hand on chest, other on belly',
                    'Breathe in slowly through nose (belly rises)',
                    'Breathe out through pursed lips (belly falls)',
                    'Repeat for 5-10 minutes'
                ],
                benefits: ['Strengthens diaphragm', 'Reduces oxygen demand', 'Promotes relaxation'],
                duration: '5-10 minutes',
                frequency: '2-3 times daily'
            },
            {
                name: 'Pursed Lip Breathing',
                steps: [
                    'Inhale slowly through nose (2 counts)',
                    'Purse lips as if whistling',
                    'Exhale slowly through pursed lips (4 counts)',
                    'Repeat for 5 minutes'
                ],
                benefits: ['Keeps airways open longer', 'Improves ventilation', 'Releases trapped air'],
                duration: '5 minutes',
                frequency: 'During breathlessness'
            },
            {
                name: '4-7-8 Breathing',
                steps: [
                    'Inhale quietly through nose (4 counts)',
                    'Hold breath (7 counts)',
                    'Exhale completely through mouth (8 counts)',
                    'Repeat 4 times'
                ],
                benefits: ['Reduces anxiety', 'Helps sleep', 'Calms nervous system'],
                duration: '2 minutes',
                frequency: 'When stressed'
            },
            {
                name: 'Alternate Nostril Breathing',
                steps: [
                    'Close right nostril with thumb',
                    'Inhale through left nostril',
                    'Close left nostril with ring finger',
                    'Release right nostril, exhale through right',
                    'Inhale through right, close, exhale through left',
                    'Continue for 5 minutes'
                ],
                benefits: ['Balances hemispheres', 'Clears nasal passages', 'Reduces stress'],
                duration: '5 minutes',
                frequency: 'Daily'
            }
        ];
    }
    
    getAdvice(condition, aqi) {
        const conditionInfo = this.conditions[condition] || this.conditions.asthma;
        let advice = [];
        
        if (aqi <= 50) {
            advice.push('Good air quality. Enjoy outdoor activities!');
        } else if (aqi <= 100) {
            advice.push('Moderate air quality. Limit prolonged exertion if sensitive.');
        } else if (aqi <= 150) {
            advice.push('Unhealthy for sensitive groups. Reduce outdoor time.');
            advice.push('Keep rescue medication handy.');
        } else if (aqi <= 200) {
            advice.push('Unhealthy. Avoid outdoor activities.');
            advice.push('Use air purifier indoors. Wear N95 mask if going out.');
        } else {
            advice.push('Very unhealthy to hazardous. STAY INDOORS.');
            advice.push('Keep windows closed. Use air purifier.');
        }
        
        // Condition-specific advice
        if (condition === 'asthma') {
            advice.push('Monitor peak flow readings.');
            advice.push('Take controller medication as prescribed.');
        }
        
        return advice;
    }
    
    getBreathingExercise(recommendation) {
        if (recommendation === 'stress') {
            return this.breathingExercises.find(e => e.name.includes('4-7-8'));
        } else if (recommendation === 'shortness') {
            return this.breathingExercises.find(e => e.name.includes('Pursed'));
        } else {
            return this.breathingExercises[0];
        }
    }
    
    getPollenForecast(season) {
        const forecasts = {
            'spring': { level: 'High', types: ['Tree pollen'], advice: 'Start medications before season' },
            'summer': { level: 'Moderate', types: ['Grass pollen'], advice: 'Shower after outdoors' },
            'fall': { level: 'High', types: ['Ragweed'], advice: 'Keep windows closed' },
            'winter': { level: 'Low', types: ['Indoor allergens'], advice: 'Use humidifier' }
        };
        
        return forecasts[season] || forecasts.spring;
    }
    
    getLungHealthTips() {
        return [
            'Don\'t smoke or vape',
            'Exercise regularly to strengthen lungs',
            'Avoid secondhand smoke',
            'Wear mask in polluted areas',
            'Practice deep breathing daily',
            'Stay hydrated',
            'Get vaccinated against flu and pneumonia',
            'Test home for radon',
            'Use natural cleaning products',
            'Keep indoor plants'
        ];
    }
}

// Initialize
const respiratoryHealth = new RespiratoryHealth();
window.respiratoryHealth = respiratoryHealth;