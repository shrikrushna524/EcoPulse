// ===== COMPLETE EV CHARGING MAP MODULE =====
class EVChargingMap {
    constructor() {
        this.stations = this.loadStations();
        this.chargerTypes = ['CCS', 'CHAdeMO', 'Type 2', 'Tesla', 'GB/T'];
        this.speedCategories = {
            'slow': { power: '3-7 kW', time: '6-12 hours' },
            'fast': { power: '22-50 kW', time: '1-2 hours' },
            'rapid': { power: '50-150 kW', time: '30-60 min' },
            'ultra': { power: '150-350 kW', time: '15-30 min' }
        };
    }
    
    loadStations() {
        return [
            // Mumbai
            { id: 1, name: 'EV Power Station', lat: 19.1136, lng: 72.8697, address: 'Andheri East, Mumbai', type: 'CCS', speed: 'fast', power: 50, connectors: 2, available: true, price: 15, operator: 'Tata Power' },
            { id: 2, name: 'Tesla Supercharger', lat: 19.0596, lng: 72.8295, address: 'Lower Parel, Mumbai', type: 'Tesla', speed: 'ultra', power: 250, connectors: 6, available: true, price: 20, operator: 'Tesla' },
            { id: 3, name: 'Fortum Charge', lat: 19.1176, lng: 72.9060, address: 'Powai, Mumbai', type: 'Type 2', speed: 'fast', power: 22, connectors: 2, available: false, price: 12, operator: 'Fortum' },
            { id: 4, name: 'Delta Electronics', lat: 19.1556, lng: 72.8484, address: 'Goregaon East, Mumbai', type: 'CHAdeMO', speed: 'fast', power: 50, connectors: 1, available: false, price: 18, operator: 'Delta' },
            { id: 5, name: 'Ather Grid', lat: 19.1075, lng: 72.8263, address: 'Juhu, Mumbai', type: 'Type 2', speed: 'fast', power: 15, connectors: 2, available: true, price: 10, operator: 'Ather' },
            
            // Delhi NCR
            { id: 6, name: 'EESL Charging Station', lat: 28.6139, lng: 77.2090, address: 'Connaught Place, Delhi', type: 'CCS', speed: 'fast', power: 50, connectors: 4, available: true, price: 12, operator: 'EESL' },
            { id: 7, name: 'MG Motor Charger', lat: 28.5678, lng: 77.3210, address: 'Noida Sector 62', type: 'CCS', speed: 'rapid', power: 100, connectors: 2, available: true, price: 18, operator: 'MG' },
            
            // Bangalore
            { id: 8, name: 'BESCOM Charging', lat: 12.9716, lng: 77.5946, address: 'MG Road, Bangalore', type: 'CCS', speed: 'fast', power: 50, connectors: 3, available: true, price: 12, operator: 'BESCOM' },
            { id: 9, name: 'Sun Mobility', lat: 12.9352, lng: 77.6245, address: 'HSR Layout, Bangalore', type: 'Type 2', speed: 'fast', power: 22, connectors: 4, available: false, price: 10, operator: 'Sun Mobility' },
            
            // Chennai
            { id: 10, name: 'TANGEDCO Charger', lat: 13.0827, lng: 80.2707, address: 'T Nagar, Chennai', type: 'CCS', speed: 'fast', power: 50, connectors: 2, available: true, price: 12, operator: 'TANGEDCO' }
        ];
    }
    
    getStationsNear(lat, lng, radius = 10) {
        return this.stations.filter(station => {
            const distance = this.calculateDistance(lat, lng, station.lat, station.lng);
            return distance <= radius;
        }).map(station => ({
            ...station,
            distance: this.calculateDistance(lat, lng, station.lat, station.lng)
        })).sort((a, b) => a.distance - b.distance);
    }
    
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return Math.round(R * c * 10) / 10;
    }
    
    toRad(deg) {
        return deg * Math.PI / 180;
    }
    
    getStationStatus(stationId) {
        const station = this.stations.find(s => s.id === stationId);
        if (!station) return null;
        
        return {
            available: station.available,
            waitingTime: station.available ? 0 : Math.floor(Math.random() * 30) + 5,
            lastUpdated: new Date().toLocaleTimeString()
        };
    }
    
    getChargingCost(stationId, kwh) {
        const station = this.stations.find(s => s.id === stationId);
        if (!station) return 0;
        
        return Math.round(kwh * station.price);
    }
    
    calculateChargeTime(stationId, batteryCapacity, currentCharge, targetCharge) {
        const station = this.stations.find(s => s.id === stationId);
        if (!station) return 0;
        
        const kwhNeeded = batteryCapacity * (targetCharge - currentCharge) / 100;
        const hours = kwhNeeded / station.power;
        const minutes = Math.round(hours * 60);
        
        return {
            minutes: minutes,
            hours: Math.round(hours * 10) / 10,
            cost: this.getChargingCost(stationId, kwhNeeded)
        };
    }
    
    getChargerTypeStats() {
        const stats = {};
        this.chargerTypes.forEach(type => {
            stats[type] = this.stations.filter(s => s.type === type).length;
        });
        return stats;
    }
    
    getNearbyAmenities(stationId) {
        return {
            restaurants: ['Cafe', 'Food Court'],
            shopping: ['Mall', 'Convenience Store'],
            restrooms: true,
            wifi: Math.random() > 0.5
        };
    }
}

// Initialize
const evChargingMap = new EVChargingMap();
window.evChargingMap = evChargingMap;