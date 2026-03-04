// ===== COMPLETE AIR-PURIFYING PLANTS MODULE (NASA Clean Air Study) =====
class AirPurifyingPlants {
    constructor() {
        this.plants = this.loadPlants();
        this.pollutants = ['Formaldehyde', 'Benzene', 'Trichloroethylene', 'Xylene', 'Ammonia', 'Toluene'];
    }
    
    loadPlants() {
        return [
            {
                id: 1,
                name: 'Snake Plant',
                scientific: 'Sansevieria trifasciata',
                common: 'Mother-in-Law\'s Tongue',
                image: '🌿',
                nasaRating: 9.5,
                removes: ['formaldehyde', 'benzene', 'trichloroethylene', 'xylene'],
                removalEfficiency: {
                    formaldehyde: 85,
                    benzene: 80,
                    trichloroethylene: 75,
                    xylene: 70
                },
                care: {
                    light: 'Low to bright indirect',
                    water: 'Every 2-3 weeks',
                    soil: 'Well-draining cactus mix',
                    temp: '15-25°C',
                    humidity: 'Low'
                },
                toxicity: 'Mildly toxic to pets',
                benefits: ['Releases oxygen at night', 'Very hardy', 'Low maintenance'],
                size: '60-120 cm',
                origin: 'West Africa'
            },
            {
                id: 2,
                name: 'Spider Plant',
                scientific: 'Chlorophytum comosum',
                common: 'Airplane Plant',
                image: '🕷️',
                nasaRating: 9.0,
                removes: ['formaldehyde', 'xylene', 'carbon monoxide'],
                removalEfficiency: {
                    formaldehyde: 90,
                    xylene: 75,
                    carbonMonoxide: 70
                },
                care: {
                    light: 'Bright indirect',
                    water: 'Weekly',
                    soil: 'Well-draining',
                    temp: '18-32°C',
                    humidity: 'Moderate'
                },
                toxicity: 'Non-toxic',
                benefits: ['Produces "spiderettes" for propagation', 'Air purifying', 'Safe for pets'],
                size: '30-60 cm',
                origin: 'Southern Africa'
            },
            {
                id: 3,
                name: 'Peace Lily',
                scientific: 'Spathiphyllum wallisii',
                common: 'White Sails',
                image: '🌸',
                nasaRating: 9.8,
                removes: ['benzene', 'formaldehyde', 'trichloroethylene', 'ammonia'],
                removalEfficiency: {
                    benzene: 85,
                    formaldehyde: 80,
                    trichloroethylene: 75,
                    ammonia: 70
                },
                care: {
                    light: 'Low to medium',
                    water: 'Weekly',
                    soil: 'Moist, well-draining',
                    temp: '18-25°C',
                    humidity: 'High'
                },
                toxicity: 'Toxic to pets',
                benefits: ['Beautiful white flowers', 'Indicates when to water (droops)', 'High transpiration'],
                size: '40-60 cm',
                origin: 'Central America'
            },
            {
                id: 4,
                name: 'Aloe Vera',
                scientific: 'Aloe barbadensis',
                common: 'Medicinal Aloe',
                image: '🌵',
                nasaRating: 8.5,
                removes: ['formaldehyde', 'benzene'],
                removalEfficiency: {
                    formaldehyde: 75,
                    benzene: 70
                },
                care: {
                    light: 'Bright direct',
                    water: 'Every 3 weeks',
                    soil: 'Sandy cactus mix',
                    temp: '15-30°C',
                    humidity: 'Low'
                },
                toxicity: 'Toxic to pets',
                benefits: ['Healing gel for burns', 'Edible (with preparation)', 'Very drought tolerant'],
                size: '30-60 cm',
                origin: 'Arabian Peninsula'
            },
            {
                id: 5,
                name: 'Boston Fern',
                scientific: 'Nephrolepis exaltata',
                common: 'Sword Fern',
                image: '🌿',
                nasaRating: 9.2,
                removes: ['formaldehyde', 'xylene', 'toluene'],
                removalEfficiency: {
                    formaldehyde: 95,
                    xylene: 80,
                    toluene: 75
                },
                care: {
                    light: 'Indirect to shade',
                    water: '2-3 times weekly',
                    soil: 'Moist, organic',
                    temp: '18-24°C',
                    humidity: 'High'
                },
                toxicity: 'Non-toxic',
                benefits: ['Excellent humidifier', 'Lush foliage', 'Pet friendly'],
                size: '60-90 cm',
                origin: 'Tropical Americas'
            },
            {
                id: 6,
                name: 'Rubber Plant',
                scientific: 'Ficus elastica',
                common: 'Rubber Tree',
                image: '🪴',
                nasaRating: 8.8,
                removes: ['formaldehyde', 'carbon monoxide'],
                removalEfficiency: {
                    formaldehyde: 80,
                    carbonMonoxide: 70
                },
                care: {
                    light: 'Bright indirect',
                    water: 'Weekly',
                    soil: 'Well-draining',
                    temp: '15-25°C',
                    humidity: 'Moderate'
                },
                toxicity: 'Toxic to pets',
                benefits: ['Large glossy leaves', 'Fast growing', 'Air purifying'],
                size: '100-300 cm',
                origin: 'Southeast Asia'
            },
            {
                id: 7,
                name: 'Chinese Evergreen',
                scientific: 'Aglaonema modestum',
                common: 'Philippine Evergreen',
                image: '🎋',
                nasaRating: 8.9,
                removes: ['benzene', 'formaldehyde'],
                removalEfficiency: {
                    benzene: 85,
                    formaldehyde: 80
                },
                care: {
                    light: 'Low to medium',
                    water: 'Weekly',
                    soil: 'Well-draining',
                    temp: '18-25°C',
                    humidity: 'Moderate'
                },
                toxicity: 'Toxic to pets',
                benefits: ['Very low light tolerant', 'Variegated varieties', 'Slow growing'],
                size: '30-90 cm',
                origin: 'Southeast Asia'
            },
            {
                id: 8,
                name: 'Dracaena',
                scientific: 'Dracaena marginata',
                common: 'Dragon Tree',
                image: '🌴',
                nasaRating: 8.7,
                removes: ['benzene', 'formaldehyde', 'trichloroethylene'],
                removalEfficiency: {
                    benzene: 80,
                    formaldehyde: 75,
                    trichloroethylene: 70
                },
                care: {
                    light: 'Medium indirect',
                    water: 'Weekly',
                    soil: 'Well-draining',
                    temp: '18-25°C',
                    humidity: 'Moderate'
                },
                toxicity: 'Toxic to pets',
                benefits: ['Architectural shape', 'Red edges', 'Drought tolerant'],
                size: '150-200 cm',
                origin: 'Madagascar'
            },
            {
                id: 9,
                name: 'Pothos',
                scientific: 'Epipremnum aureum',
                common: 'Devil\'s Ivy',
                image: '🌱',
                nasaRating: 8.6,
                removes: ['formaldehyde', 'benzene', 'carbon monoxide'],
                removalEfficiency: {
                    formaldehyde: 85,
                    benzene: 80,
                    carbonMonoxide: 70
                },
                care: {
                    light: 'Low to bright',
                    water: 'Weekly',
                    soil: 'Well-draining',
                    temp: '18-30°C',
                    humidity: 'Moderate'
                },
                toxicity: 'Toxic to pets',
                benefits: ['Trailing/vining habit', 'Very easy to grow', 'Propagates easily'],
                size: '200-300 cm (trailing)',
                origin: 'Solomon Islands'
            },
            {
                id: 10,
                name: 'Areca Palm',
                scientific: 'Dypsis lutescens',
                common: 'Butterfly Palm',
                image: '🌴',
                nasaRating: 9.3,
                removes: ['xylene', 'toluene', 'formaldehyde'],
                removalEfficiency: {
                    xylene: 85,
                    toluene: 80,
                    formaldehyde: 75
                },
                care: {
                    light: 'Bright indirect',
                    water: 'Weekly',
                    soil: 'Well-draining',
                    temp: '18-25°C',
                    humidity: 'High'
                },
                toxicity: 'Non-toxic',
                benefits: ['Humidifier', 'Pet friendly', 'Tropical look'],
                size: '150-200 cm',
                origin: 'Madagascar'
            }
        ];
    }
    
    getPlantsByPollutant(pollutant) {
        return this.plants.filter(p => 
            p.removes.some(r => r.toLowerCase().includes(pollutant.toLowerCase()))
        );
    }
    
    getPlantsByLight(lightLevel) {
        return this.plants.filter(p => 
            p.care.light.toLowerCase().includes(lightLevel.toLowerCase())
        );
    }
    
    getPetFriendlyPlants() {
        return this.plants.filter(p => p.toxicity === 'Non-toxic');
    }
    
    getTopRatedPlants(limit = 5) {
        return [...this.plants].sort((a, b) => b.nasaRating - a.nasaRating).slice(0, limit);
    }
    
    calculatePlantsNeeded(roomSize, pollutant = 'formaldehyde') {
        // NASA recommends 1 plant per 100 sq ft for effective air purification
        const plantsNeeded = Math.ceil(roomSize / 10); // roomSize in sq meters, 1 plant per 10 sq m
        
        const recommendations = this.getPlantsByPollutant(pollutant)
            .sort((a, b) => b.removalEfficiency[pollutant] - a.removalEfficiency[pollutant])
            .slice(0, 3);
        
        return {
            plantsNeeded: plantsNeeded,
            recommendations: recommendations,
            coverageArea: plantsNeeded * 10,
            estimatedImprovement: Math.min(100, plantsNeeded * 15) // 15% improvement per plant
        };
    }
    
    getCareGuide(plantName) {
        const plant = this.plants.find(p => 
            p.name.toLowerCase().includes(plantName.toLowerCase())
        );
        
        if (!plant) return null;
        
        return {
            name: plant.name,
            care: plant.care,
            toxicity: plant.toxicity,
            commonProblems: [
                'Yellow leaves: Overwatering',
                'Brown tips: Low humidity',
                'Leggy growth: More light needed',
                'Pests: Check for spider mites'
            ],
            propagation: 'Stem cuttings in water or soil',
            fertilizing: 'Monthly in growing season'
        };
    }
    
    getNASAStudyFacts() {
        return [
            'NASA Clean Air Study (1989) tested 12 plants',
            'Plants remove VOCs through leaves and roots',
            'Soil microorganisms also help purify air',
            '1 plant per 100 sq ft recommended',
            'Combination of plants works best'
        ];
    }
}

// Initialize
const airPurifyingPlants = new AirPurifyingPlants();
window.airPurifyingPlants = airPurifyingPlants;