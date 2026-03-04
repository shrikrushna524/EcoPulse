// ===== COMPLETE RECYCLING CENTER LOCATOR =====
class RecyclingMap {
    constructor() {
        this.centers = this.loadCenters();
        this.userLocation = null;
    }
    
    loadCenters() {
        return [
            // Delhi NCR
            { id: 1, name: 'Delhi Recycling Hub', address: 'Okhla Industrial Area', city: 'Delhi', lat: 28.53, lng: 77.27, distance: 0, materials: ['plastic', 'paper', 'glass', 'metal'], phone: '011-45678901', hours: '9AM-6PM Mon-Sat' },
            { id: 2, name: 'E-Waste Recyclers India', address: 'Noida Sector 62', city: 'Noida', lat: 28.62, lng: 77.36, distance: 0, materials: ['electronic'], phone: '0120-4567890', hours: '10AM-7PM Mon-Fri' },
            
            // Mumbai
            { id: 3, name: 'Mumbai Waste Management', address: 'Andheri East', city: 'Mumbai', lat: 19.11, lng: 72.87, distance: 0, materials: ['all'], phone: '022-34567890', hours: '8AM-8PM All days' },
            { id: 4, name: 'Paper Recycling Co', address: 'Lower Parel', city: 'Mumbai', lat: 18.99, lng: 72.83, distance: 0, materials: ['paper'], phone: '022-23456789', hours: '9AM-6PM Mon-Sat' },
            
            // Bangalore
            { id: 5, name: 'Bangalore Green Center', address: 'Whitefield', city: 'Bangalore', lat: 12.97, lng: 77.71, distance: 0, materials: ['plastic', 'paper', 'glass'], phone: '080-45678901', hours: '9AM-7PM' },
            { id: 6, name: 'E-Parisaraa', address: 'Doddaballapur', city: 'Bangalore', lat: 13.27, lng: 77.54, distance: 0, materials: ['electronic'], phone: '080-27631234', hours: '9AM-5PM Mon-Fri' },
            
            // Chennai
            { id: 7, name: 'Chennai Recycling', address: 'Guindy', city: 'Chennai', lat: 13.00, lng: 80.22, distance: 0, materials: ['all'], phone: '044-34567890', hours: '9AM-6PM' },
            
            // Kolkata
            { id: 8, name: 'Kolkata Waste Hub', address: 'Salt Lake', city: 'Kolkata', lat: 22.58, lng: 88.41, distance: 0, materials: ['plastic', 'paper'], phone: '033-45678901', hours: '10AM-7PM' },
            
            // Pune
            { id: 9, name: 'Pune Recycle Center', address: 'Hinjewadi', city: 'Pune', lat: 18.58, lng: 73.73, distance: 0, materials: ['plastic', 'glass', 'metal'], phone: '020-45678901', hours: '9AM-6PM' },
            
            // Hyderabad
            { id: 10, name: 'Hyderabad Green', address: 'Hitech City', city: 'Hyderabad', lat: 17.44, lng: 78.38, distance: 0, materials: ['all'], phone: '040-45678901', hours: '9AM-7PM' },
            
            // Ahmedabad
            { id: 11, name: 'Ahmedabad Waste Mgmt', address: 'Gandhinagar Road', city: 'Ahmedabad', lat: 23.07, lng: 72.62, distance: 0, materials: ['plastic', 'paper'], phone: '079-45678901', hours: '9AM-6PM' }
        ];
    }
    
    getUserLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        this.calculateDistances();
                        resolve(this.userLocation);
                    },
                    error => {
                        console.error('Geolocation error:', error);
                        // Default to city center
                        this.userLocation = { lat: 28.61, lng: 77.23 }; // Delhi
                        this.calculateDistances();
                        resolve(this.userLocation);
                    }
                );
            } else {
                this.userLocation = { lat: 28.61, lng: 77.23 };
                this.calculateDistances();
                resolve(this.userLocation);
            }
        });
    }
    
    calculateDistances() {
        if (!this.userLocation) return;
        
        this.centers.forEach(center => {
            center.distance = this.getDistance(
                this.userLocation.lat, this.userLocation.lng,
                center.lat, center.lng
            );
        });
        
        this.centers.sort((a, b) => a.distance - b.distance);
    }
    
    getDistance(lat1, lon1, lat2, lon2) {
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
    
    findCenters(material = 'all', maxDistance = 10) {
        let filtered = this.centers;
        
        if (material !== 'all') {
            filtered = filtered.filter(c => 
                c.materials.includes(material) || c.materials.includes('all')
            );
        }
        
        if (maxDistance > 0) {
            filtered = filtered.filter(c => c.distance <= maxDistance);
        }
        
        return filtered;
    }
    
    getDirections(centerId) {
        const center = this.centers.find(c => c.id === centerId);
        if (center && this.userLocation) {
            const url = `https://www.google.com/maps/dir/${this.userLocation.lat},${this.userLocation.lng}/${center.lat},${center.lng}`;
            window.open(url, '_blank');
        }
    }
    
    getRecyclingInstructions(item) {
        const instructions = {
            'plastic': 'Rinse containers, remove caps, check number. #1 and #2 widely accepted.',
            'paper': 'Keep dry and clean. Remove tape and staples if possible.',
            'glass': 'Rinse, remove lids. Separate by color if required.',
            'metal': 'Rinse cans, crush if possible. Aluminum most valuable.',
            'electronic': 'Remove batteries and personal data. Find e-waste specific centers.',
            'organic': 'Compost at home or use green bin. No meat/dairy in compost.'
        };
        
        return instructions[item] || 'Check with local facility for specific requirements.';
    }
}

// Initialize
const recyclingMap = new RecyclingMap();
window.recyclingMap = recyclingMap;