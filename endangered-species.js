// ===== COMPLETE ENDANGERED SPECIES DATABASE MODULE =====
class EndangeredSpecies {
    constructor() {
        this.species = this.loadSpecies();
        this.regions = ['Asia', 'Africa', 'Americas', 'Europe', 'Australia', 'Oceans'];
        this.threatLevels = ['Critical', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'];
    }
    
    loadSpecies() {
        return [
            // Mammals
            { id: 1, name: 'Bengal Tiger', scientific: 'Panthera tigris tigris', type: 'mammal', image: '🐅', region: 'Asia', threat: 'Endangered', population: 2500, trend: 'increasing', habitat: 'Indian subcontinent', diet: 'Carnivore', lifespan: '15 years' },
            { id: 2, name: 'Sumatran Orangutan', scientific: 'Pongo abelii', type: 'mammal', image: '🦧', region: 'Asia', threat: 'Critical', population: 14600, trend: 'decreasing', habitat: 'Sumatra', diet: 'Omnivore', lifespan: '35 years' },
            { id: 3, name: 'Mountain Gorilla', scientific: 'Gorilla beringei beringei', type: 'mammal', image: '🦍', region: 'Africa', threat: 'Endangered', population: 1063, trend: 'increasing', habitat: 'Virunga Mountains', diet: 'Herbivore', lifespan: '35 years' },
            { id: 4, name: 'Black Rhino', scientific: 'Diceros bicornis', type: 'mammal', image: '🦏', region: 'Africa', threat: 'Critical', population: 5630, trend: 'increasing', habitat: 'Southern Africa', diet: 'Herbivore', lifespan: '40 years' },
            { id: 5, name: 'Giant Panda', scientific: 'Ailuropoda melanoleuca', type: 'mammal', image: '🐼', region: 'Asia', threat: 'Vulnerable', population: 1864, trend: 'increasing', habitat: 'China', diet: 'Herbivore', lifespan: '20 years' },
            { id: 6, name: 'Amur Leopard', scientific: 'Panthera pardus orientalis', type: 'mammal', image: '🐆', region: 'Asia', threat: 'Critical', population: 100, trend: 'increasing', habitat: 'Russian Far East', diet: 'Carnivore', lifespan: '15 years' },
            { id: 7, name: 'Snow Leopard', scientific: 'Panthera uncia', type: 'mammal', image: '🐆', region: 'Asia', threat: 'Vulnerable', population: 4000, trend: 'decreasing', habitat: 'Central Asia', diet: 'Carnivore', lifespan: '18 years' },
            { id: 8, name: 'Javan Rhino', scientific: 'Rhinoceros sondaicus', type: 'mammal', image: '🦏', region: 'Asia', threat: 'Critical', population: 75, trend: 'stable', habitat: 'Indonesia', diet: 'Herbivore', lifespan: '45 years' },
            { id: 9, name: 'African Elephant', scientific: 'Loxodonta africana', type: 'mammal', image: '🐘', region: 'Africa', threat: 'Endangered', population: 415000, trend: 'decreasing', habitat: 'Sub-Saharan Africa', diet: 'Herbivore', lifespan: '60 years' },
            { id: 10, name: 'Red Panda', scientific: 'Ailurus fulgens', type: 'mammal', image: '🦝', region: 'Asia', threat: 'Endangered', population: 10000, trend: 'decreasing', habitat: 'Himalayas', diet: 'Herbivore', lifespan: '10 years' },
            
            // Birds
            { id: 11, name: 'California Condor', scientific: 'Gymnogyps californianus', type: 'bird', image: '🦅', region: 'Americas', threat: 'Critical', population: 500, trend: 'increasing', habitat: 'California', diet: 'Carnivore', lifespan: '60 years' },
            { id: 12, name: 'Kakapo', scientific: 'Strigops habroptilus', type: 'bird', image: '🦜', region: 'Australia', threat: 'Critical', population: 250, trend: 'increasing', habitat: 'New Zealand', diet: 'Herbivore', lifespan: '60 years' },
            { id: 13, name: 'Philippine Eagle', scientific: 'Pithecophaga jefferyi', type: 'bird', image: '🦅', region: 'Asia', threat: 'Critical', population: 400, trend: 'decreasing', habitat: 'Philippines', diet: 'Carnivore', lifespan: '40 years' },
            
            // Marine
            { id: 14, name: 'Blue Whale', scientific: 'Balaenoptera musculus', type: 'marine', image: '🐋', region: 'Oceans', threat: 'Endangered', population: 15000, trend: 'increasing', habitat: 'Global oceans', diet: 'Carnivore', lifespan: '90 years' },
            { id: 15, name: 'Vaquita', scientific: 'Phocoena sinus', type: 'marine', image: '🐬', region: 'Americas', threat: 'Critical', population: 10, trend: 'decreasing', habitat: 'Gulf of California', diet: 'Carnivore', lifespan: '20 years' },
            { id: 16, name: 'Hawksbill Turtle', scientific: 'Eretmochelys imbricata', type: 'marine', image: '🐢', region: 'Oceans', threat: 'Critical', population: 15000, trend: 'decreasing', habitat: 'Tropical oceans', diet: 'Omnivore', lifespan: '50 years' },
            
            // Reptiles
            { id: 17, name: 'Komodo Dragon', scientific: 'Varanus komodoensis', type: 'reptile', image: '🐲', region: 'Asia', threat: 'Endangered', population: 3000, trend: 'stable', habitat: 'Indonesia', diet: 'Carnivore', lifespan: '30 years' },
            { id: 18, name: 'Gharial', scientific: 'Gavialis gangeticus', type: 'reptile', image: '🐊', region: 'Asia', threat: 'Critical', population: 650, trend: 'increasing', habitat: 'India', diet: 'Carnivore', lifespan: '40 years' }
        ];
    }
    
    getSpeciesByRegion(region) {
        if (region === 'All') return this.species;
        return this.species.filter(s => s.region === region);
    }
    
    getSpeciesByThreat(threat) {
        if (threat === 'All') return this.species;
        return this.species.filter(s => s.threat === threat);
    }
    
    getSpeciesByType(type) {
        return this.species.filter(s => s.type === type);
    }
    
    getCriticallyEndangered() {
        return this.species.filter(s => s.threat === 'Critical');
    }
    
    getSpecies(id) {
        return this.species.find(s => s.id === id);
    }
    
    searchSpecies(query) {
        query = query.toLowerCase();
        return this.species.filter(s => 
            s.name.toLowerCase().includes(query) ||
            s.scientific.toLowerCase().includes(query) ||
            s.region.toLowerCase().includes(query)
        );
    }
    
    getStatistics() {
        return {
            total: this.species.length,
            byThreat: {
                critical: this.species.filter(s => s.threat === 'Critical').length,
                endangered: this.species.filter(s => s.threat === 'Endangered').length,
                vulnerable: this.species.filter(s => s.threat === 'Vulnerable').length
            },
            byRegion: {
                asia: this.species.filter(s => s.region === 'Asia').length,
                africa: this.species.filter(s => s.region === 'Africa').length,
                americas: this.species.filter(s => s.region === 'Americas').length,
                australia: this.species.filter(s => s.region === 'Australia').length,
                oceans: this.species.filter(s => s.region === 'Oceans').length
            },
            byType: {
                mammal: this.species.filter(s => s.type === 'mammal').length,
                bird: this.species.filter(s => s.type === 'bird').length,
                marine: this.species.filter(s => s.type === 'marine').length,
                reptile: this.species.filter(s => s.type === 'reptile').length
            }
        };
    }
    
    getConservationStatus(threat) {
        const status = {
            'Critical': { color: '#F44336', description: 'Extremely high risk of extinction' },
            'Endangered': { color: '#FF9800', description: 'Very high risk of extinction' },
            'Vulnerable': { color: '#FFC107', description: 'High risk of extinction' },
            'Near Threatened': { color: '#2196F3', description: 'Likely to become endangered' },
            'Least Concern': { color: '#4CAF50', description: 'Low risk of extinction' }
        };
        
        return status[threat] || status['Least Concern'];
    }
    
    getRegionHotspots(region) {
        const hotspots = {
            'Asia': ['Sundarbans', 'Western Ghats', 'Borneo', 'Sumatra'],
            'Africa': ['Serengeti', 'Virunga', 'Okavango Delta'],
            'Americas': ['Amazon', 'Galapagos', 'Pantanal'],
            'Australia': ['Great Barrier Reef', 'Daintree'],
            'Oceans': ['Coral Triangle', 'Galapagos Marine Reserve']
        };
        
        return hotspots[region] || [];
    }
}

// Initialize
const endangeredSpecies = new EndangeredSpecies();
window.endangeredSpecies = endangeredSpecies;