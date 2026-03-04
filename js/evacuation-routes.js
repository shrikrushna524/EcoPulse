// ===== COMPLETE EVACUATION ROUTES MODULE =====
class EvacuationRoutes {
    constructor() {
        this.cities = this.loadCities();
        this.routes = this.loadRoutes();
        this.shelters = this.loadShelters();
    }
    
    loadCities() {
        return [
            {
                name: 'Mumbai',
                coordinates: { lat: 19.0760, lng: 72.8777 },
                hazards: ['flood', 'cyclone'],
                population: '20M',
                area: '603 km²'
            },
            {
                name: 'Delhi',
                coordinates: { lat: 28.6139, lng: 77.2090 },
                hazards: ['earthquake', 'heatwave'],
                population: '19M',
                area: '1484 km²'
            },
            {
                name: 'Chennai',
                coordinates: { lat: 13.0827, lng: 80.2707 },
                hazards: ['flood', 'cyclone'],
                population: '10M',
                area: '426 km²'
            },
            {
                name: 'Kolkata',
                coordinates: { lat: 22.5726, lng: 88.3639 },
                hazards: ['flood', 'cyclone'],
                population: '14M',
                area: '185 km²'
            },
            {
                name: 'Bangalore',
                coordinates: { lat: 12.9716, lng: 77.5946 },
                hazards: ['earthquake', 'fire'],
                population: '12M',
                area: '709 km²'
            }
        ];
    }
    
    loadRoutes() {
        return {
            mumbai: [
                { id: 'r1', name: 'Coastal Route', distance: '45 km', time: '90 min', capacity: 'High', type: 'primary' },
                { id: 'r2', name: 'Eastern Express', distance: '55 km', time: '110 min', capacity: 'High', type: 'alternate' },
                { id: 'r3', name: 'Western Express', distance: '50 km', time: '100 min', capacity: 'High', type: 'alternate' }
            ],
            delhi: [
                { id: 'r4', name: 'GT Karnal Road', distance: '40 km', time: '75 min', capacity: 'Medium', type: 'primary' },
                { id: 'r5', name: 'NH 8', distance: '60 km', time: '120 min', capacity: 'High', type: 'alternate' },
                { id: 'r6', name: 'Eastern Peripheral', distance: '70 km', time: '130 min', capacity: 'High', type: 'alternate' }
            ],
            chennai: [
                { id: 'r7', name: 'Grand Southern Trunk', distance: '50 km', time: '90 min', capacity: 'High', type: 'primary' },
                { id: 'r8', name: 'East Coast Road', distance: '60 km', time: '120 min', capacity: 'Medium', type: 'alternate' }
            ]
        };
    }
    
    loadShelters() {
        return {
            mumbai: [
                { name: 'Bandra Sports Complex', capacity: 5000, distance: '5 km', facilities: ['water', 'food', 'medical'] },
                { name: 'NSCI Stadium', capacity: 8000, distance: '8 km', facilities: ['water', 'medical'] },
                { name: 'Andheri Sports Complex', capacity: 3000, distance: '12 km', facilities: ['water', 'food'] }
            ],
            delhi: [
                { name: 'Indira Gandhi Stadium', capacity: 15000, distance: '6 km', facilities: ['water', 'food', 'medical'] },
                { name: 'Talkatora Stadium', capacity: 5000, distance: '4 km', facilities: ['water', 'medical'] }
            ]
        };
    }
    
    getRoutes(city, hazardType) {
        const cityRoutes = this.routes[city.toLowerCase()] || [];
        const shelters = this.shelters[city.toLowerCase()] || [];
        
        return {
            routes: cityRoutes,
            shelters: shelters,
            nearestShelter: shelters[0] || null,
            evacuationTime: this.estimateEvacuationTime(city, hazardType)
        };
    }
    
    estimateEvacuationTime(city, hazardType) {
        // Simplified evacuation time estimation
        const baseTime = 60; // minutes
        const hazardFactors = {
            flood: 1.2,
            cyclone: 1.5,
            earthquake: 1.1,
            fire: 1.3
        };
        
        return Math.round(baseTime * (hazardFactors[hazardType] || 1));
    }
    
    getOptimalRoute(currentLocation, destination, hazardType) {
        // In production, use actual routing algorithm
        return {
            name: 'Recommended Route',
            distance: '45 km',
            time: '90 min',
            waypoints: ['Point A', 'Point B', 'Point C'],
            hazards: ['Flooded areas ahead', 'Bridge may be congested'],
            alternatives: 2
        };
    }
    
    getTrafficConditions(routeId) {
        return {
            congestion: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
            accidents: Math.random() > 0.8,
            roadClosures: Math.random() > 0.9,
            lastUpdated: new Date().toLocaleTimeString()
        };
    }
    
    getShelterCapacity(city) {
        const shelters = this.shelters[city.toLowerCase()] || [];
        const total = shelters.reduce((sum, s) => sum + s.capacity, 0);
        const occupied = Math.floor(total * Math.random() * 0.5);
        
        return {
            total: total,
            occupied: occupied,
            available: total - occupied,
            percentageFull: Math.round((occupied / total) * 100)
        };
    }
    
    getEvacuationZones(city) {
        return {
            zone1: { risk: 'High', population: 50000, shelters: 3 },
            zone2: { risk: 'Moderate', population: 75000, shelters: 5 },
            zone3: { risk: 'Low', population: 100000, shelters: 8 }
        };
    }
}

// Initialize
const evacuationRoutes = new EvacuationRoutes();
window.evacuationRoutes = evacuationRoutes;