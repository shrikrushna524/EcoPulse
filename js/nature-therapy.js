// ===== COMPLETE NATURE THERAPY MODULE =====
class NatureTherapy {
    constructor() {
        this.therapies = this.loadTherapies();
        this.benefits = this.loadBenefits();
    }
    
    loadTherapies() {
        return {
            'forestBathing': {
                name: 'Forest Bathing (Shinrin-yoku)',
                origin: 'Japan',
                duration: '2-3 hours',
                steps: [
                    'Find a quiet forest or natural area',
                    'Leave phone and distractions behind',
                    'Walk slowly and mindfully',
                    'Engage all senses - sight, sound, smell, touch',
                    'Notice details - leaves, moss, sunlight',
                    'Pause frequently to observe',
                    'Breathe deeply - inhale phytoncides',
                    'Sit in one spot for 10-15 minutes',
                    'Drink in the atmosphere',
                    'End with gratitude for nature'
                ],
                benefits: [
                    'Reduces cortisol by 16%',
                    'Boosts immune function',
                    'Lowers blood pressure',
                    'Improves mood',
                    'Increases energy'
                ],
                bestTime: 'Morning, 2-3 hours after sunrise',
                frequency: 'Weekly'
            },
            'grounding': {
                name: 'Earthing/Grounding',
                origin: 'Ancient practice',
                duration: '30-60 minutes',
                steps: [
                    'Find a safe outdoor area with bare earth',
                    'Remove shoes and socks',
                    'Walk slowly on grass, sand, or soil',
                    'Stand still and feel the earth',
                    'Sit or lie down on ground',
                    'Focus on connection with earth',
                    'Practice for 30-60 minutes',
                    'Repeat regularly for best results'
                ],
                benefits: [
                    'Reduces inflammation',
                    'Improves sleep',
                    'Normalizes cortisol',
                    'Reduces pain',
                    'Thins blood'
                ],
                bestTime: 'Any time, especially after sunset',
                frequency: 'Daily if possible'
            },
            'sunGazing': {
                name: 'Sun Gazing',
                origin: 'Ancient traditions',
                duration: '5-10 minutes',
                steps: [
                    'Go outside within 1 hour of sunrise/sunset',
                    'Face the sun',
                    'Look at the sun briefly (start with 10 seconds)',
                    'Gradually increase time (max 10 minutes)',
                    'Blink normally, don\'t strain',
                    'Never look at midday sun',
                    'Stand on bare earth if possible',
                    'End with gratitude'
                ],
                benefits: [
                    'Increases vitamin D',
                    'Regulates circadian rhythm',
                    'Boosts serotonin',
                    'Improves mood',
                    'Increases melatonin at night'
                ],
                bestTime: 'Sunrise or sunset only',
                frequency: 'Daily'
            },
            'cloudGazing': {
                name: 'Cloud Gazing',
                origin: 'Mindfulness practice',
                duration: '20-30 minutes',
                steps: [
                    'Lie down on grass or blanket',
                    'Look up at sky',
                    'Watch clouds drift by',
                    'Notice shapes and patterns',
                    'Let thoughts drift like clouds',
                    'Practice non-judgmental awareness',
                    'Stay for 20-30 minutes'
                ],
                benefits: [
                    'Reduces anxiety',
                    'Increases creativity',
                    'Promotes relaxation',
                    'Mindfulness practice',
                    'Connects with nature'
                ],
                bestTime: 'Afternoon on partly cloudy days',
                frequency: 'As needed'
            },
            'birdWatching': {
                name: 'Mindful Bird Watching',
                origin: 'Nature observation',
                duration: '1-2 hours',
                steps: [
                    'Find a quiet natural area',
                    'Bring binoculars if desired',
                    'Sit quietly and still',
                    'Listen for bird calls',
                    'Observe birds without disturbing',
                    'Notice colors, behaviors, interactions',
                    'Keep a journal of sightings',
                    'Learn to identify local species'
                ],
                benefits: [
                    'Increases patience',
                    'Sharpens focus',
                    'Connects with wildlife',
                    'Reduces stress',
                    'Provides purpose'
                ],
                bestTime: 'Early morning',
                frequency: 'Weekly'
            },
            'gardenTherapy': {
                name: 'Therapeutic Gardening',
                origin: 'Horticultural therapy',
                duration: '1-3 hours',
                steps: [
                    'Choose plants suited to your space',
                    'Prepare soil mindfully',
                    'Plant seeds or seedlings',
                    'Water and nurture plants',
                    'Weed gently and intentionally',
                    'Harvest when ready',
                    'Compost waste',
                    'Observe growth daily'
                ],
                benefits: [
                    'Provides gentle exercise',
                    'Produces healthy food',
                    'Reduces stress',
                    'Increases vitamin D',
                    'Sense of accomplishment'
                ],
                bestTime: 'Morning or late afternoon',
                frequency: 'Several times weekly'
            }
        };
    }
    
    loadBenefits() {
        return {
            physical: [
                { benefit: 'Lower blood pressure', improvement: '5-10 points' },
                { benefit: 'Reduced heart rate', improvement: '5-15 bpm' },
                { benefit: 'Better sleep', improvement: '+30%' },
                { benefit: 'Stronger immune system', improvement: '+50% NK cells' },
                { benefit: 'Reduced pain', improvement: '-30%' }
            ],
            mental: [
                { benefit: 'Reduced anxiety', improvement: '-20%' },
                { benefit: 'Improved mood', improvement: '+33%' },
                { benefit: 'Better focus', improvement: '+25%' },
                { benefit: 'Reduced depression', improvement: '-30%' },
                { benefit: 'Increased creativity', improvement: '+50%' }
            ]
        };
    }
    
    getTherapy(name) {
        return this.therapies[name] || this.therapies.forestBathing;
    }
    
    getSessionPlan(duration = 120) {
        // Create a customized nature therapy session
        const session = {
            warmup: {
                activity: 'Mindful walking',
                duration: Math.floor(duration * 0.2)
            },
            main: {
                activity: 'Forest bathing',
                duration: Math.floor(duration * 0.6)
            },
            cooldown: {
                activity: 'Grounding',
                duration: Math.floor(duration * 0.2)
            }
        };
        
        return session;
    }
    
    calculateTherapyValue(minutesPerWeek) {
        const sessions = minutesPerWeek / 120; // 2-hour sessions
        
        return {
            stressReduction: Math.min(28, Math.round(sessions * 14)),
            immuneBoost: Math.min(50, Math.round(sessions * 25)),
            moodImprovement: Math.min(33, Math.round(sessions * 16.5)),
            bloodPressureReduction: Math.min(5, Math.round(sessions * 2.5)),
            sleepImprovement: Math.min(30, Math.round(sessions * 15))
        };
    }
    
    getSeasonalTherapy(season) {
        const seasonal = {
            'spring': 'Forest bathing - witness new growth',
            'summer': 'Early morning walks before heat',
            'autumn': 'Leaf peeping and forest bathing',
            'winter': 'Sun gazing and grounding on clear days'
        };
        
        return seasonal[season] || seasonal.spring;
    }
    
    getNatureSounds() {
        return [
            'Birdsong - calming and joyful',
            'Wind through leaves - meditative',
            'Water flowing - soothing',
            'Rain on leaves - relaxing',
            'Crickets at night - sleep inducing'
        ];
    }
}

// Initialize
const natureTherapy = new NatureTherapy();
window.natureTherapy = natureTherapy;