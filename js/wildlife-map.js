// ===== COMPLETE WILDLIFE SIGHTING MAP MODULE =====
class WildlifeMap {
    constructor() {
        this.sightings = this.loadSightings();
        this.nationalParks = this.loadNationalParks();
        this.species = ['Tiger', 'Elephant', 'Rhino', 'Leopard', 'Deer', 'Bear', 'Wolf', 'Fox'];
    }
    
    loadSightings() {
        return JSON.parse(localStorage.getItem('wildlifeSightings')) || [];
    }
    
    loadNationalParks() {
        return [
            { name: 'Jim Corbett', state: 'Uttarakhand', lat: 29.53, lng: 78.77, area: 520, animals: ['Tiger', 'Elephant', 'Leopard'] },
            { name: 'Kaziranga', state: 'Assam', lat: 26.57, lng: 93.17, area: 430, animals: ['Rhino', 'Elephant', 'Tiger'] },
            { name: 'Sunderbans', state: 'West Bengal', lat: 21.94, lng: 88.89, area: 1330, animals: ['Tiger', 'Crocodile'] },
            { name: 'Bandipur', state: 'Karnataka', lat: 11.66, lng: 76.62, area: 874, animals: ['Tiger', 'Elephant', 'Leopard'] },
            { name: 'Kanha', state: 'Madhya Pradesh', lat: 22.33, lng: 80.62, area: 940, animals: ['Tiger', 'Leopard', 'Deer'] },
            { name: 'Ranthambore', state: 'Rajasthan', lat: 26.01, lng: 76.50, area: 392, animals: ['Tiger', 'Leopard', 'Bear'] }
        ];
    }
    
    addSighting(animal, location, lat, lng, user) {
        const sighting = {
            id: Date.now(),
            animal: animal,
            location: location,
            lat: lat,
            lng: lng,
            date: new Date().toISOString(),
            user: user || 'Anonymous',
            verified: false
        };
        
        this.sightings.push(sighting);
        this.saveSightings();
        return sighting;
    }
    
    saveSightings() {
        localStorage.setItem('wildlifeSightings', JSON.stringify(this.sightings));
    }
    
    getSightings(animal, days) {
        let filtered = this.sightings;
        
        if (animal) {
            filtered = filtered.filter(s => s.animal === animal);
        }
        
        if (days) {
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - days);
            filtered = filtered.filter(s => new Date(s.date) > cutoff);
        }
        
        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    getHotspots(radius = 10) {
        // Group sightings by location
        const hotspots = {};
        
        this.sightings.forEach(s => {
            const key = `${Math.round(s.lat * 10)},${Math.round(s.lng * 10)}`;
            if (!hotspots[key]) {
                hotspots[key] = {
                    lat: s.lat,
                    lng: s.lng,
                    count: 0,
                    animals: new Set()
                };
            }
            hotspots[key].count++;
            hotspots[key].animals.add(s.animal);
        });
        
        return Object.values(hotspots)
            .filter(h => h.count > 5)
            .map(h => ({
                ...h,
                animals: Array.from(h.animals)
            }));
    }
    
    getBestViewingSeason(park) {
        const seasons = {
            'Jim Corbett': { best: 'Nov-Jun', avoid: 'Jul-Sep' },
            'Kaziranga': { best: 'Nov-Apr', avoid: 'May-Oct' },
            'Ranthambore': { best: 'Oct-Jun', avoid: 'Jul-Sep' },
            'Bandipur': { best: 'Oct-May', avoid: 'Jun-Sep' }
        };
        
        return seasons[park] || { best: 'Winter months', avoid: 'Monsoon' };
    }
    
    getSafariTips(park) {
        return {
            bestTime: 'Early morning (6-9 AM)',
            duration: '3-4 hours',
            guides: 'Mandatory',
            booking: 'Online in advance',
            cost: '₹1500-3000 per jeep'
        };
    }
    
    verifySighting(id) {
        const sighting = this.sightings.find(s => s.id === id);
        if (sighting) {
            sighting.verified = true;
            this.saveSightings();
        }
    }
    
    getStatistics() {
        const stats = {
            total: this.sightings.length,
            byAnimal: {},
            byMonth: {},
            verified: this.sightings.filter(s => s.verified).length
        };
        
        this.sightings.forEach(s => {
            stats.byAnimal[s.animal] = (stats.byAnimal[s.animal] || 0) + 1;
            
            const month = new Date(s.date).getMonth();
            stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
        });
        
        return stats;
    }
}

// Initialize
const wildlifeMap = new WildlifeMap();
window.wildlifeMap = wildlifeMap;