// ===== COMPLETE PUBLIC TRANSIT SCHEDULES MODULE =====
class TransitSchedules {
    constructor() {
        this.schedules = this.loadSchedules();
        this.routes = this.loadRoutes();
        this.stops = this.loadStops();
    }
    
    loadSchedules() {
        return {
            'Delhi': {
                'Metro': [
                    { route: 'Yellow Line', from: 'Samaypur Badli', to: 'HUDA City Centre', frequency: '3-5 min' },
                    { route: 'Blue Line', from: 'Dwarka', to: 'Noida City Centre', frequency: '4-6 min' },
                    { route: 'Red Line', from: 'Rithala', to: 'Shaheed Sthal', frequency: '5-7 min' },
                    { route: 'Green Line', from: 'Inderlok', to: 'Brigadier Hoshiyar Singh', frequency: '6-8 min' },
                    { route: 'Violet Line', from: 'Kashmere Gate', to: 'Raja Nahar Singh', frequency: '5-7 min' },
                    { route: 'Pink Line', from: 'Majlis Park', to: 'Shiv Vihar', frequency: '4-6 min' },
                    { route: 'Magenta Line', from: 'Janakpuri West', to: 'Botanical Garden', frequency: '5-7 min' },
                    { route: 'Grey Line', from: 'Dwarka', to: 'Najafgarh', frequency: '8-10 min' },
                    { route: 'Airport Express', from: 'New Delhi', to: 'IGI Airport', frequency: '10 min' }
                ],
                'DTC Buses': [
                    { route: '470', from: 'Lajpat Nagar', to: 'Uttam Nagar', frequency: '10-15 min' },
                    { route: '522', from: 'Anand Vihar', to: 'Dhaula Kuan', frequency: '12-18 min' },
                    { route: '165', from: 'Shahdara', to: 'Karol Bagh', frequency: '8-12 min' },
                    { route: '218', from: 'Noida', to: 'Kashmere Gate', frequency: '15-20 min' },
                    { route: '534', from: 'Gurgaon', to: 'Delhi Gate', frequency: '20-25 min' }
                ]
            },
            'Mumbai': {
                'Local Train': [
                    { line: 'Western', from: 'Churchgate', to: 'Dahanu Road', frequency: '3-4 min' },
                    { line: 'Central', from: 'CST', to: 'Kalyan', frequency: '4-5 min' },
                    { line: 'Harbour', from: 'CST', to: 'Panvel', frequency: '6-8 min' },
                    { line: 'Trans-Harbour', from: 'Thane', to: 'Vashi', frequency: '8-10 min' }
                ],
                'BEST Buses': [
                    { route: '1', from: 'CST', to: 'Worli', frequency: '10 min' },
                    { route: '7', from: 'Bandra', to: 'Andheri', frequency: '8 min' },
                    { route: '28', from: 'Goregaon', to: 'Malad', frequency: '12 min' }
                ],
                'Metro': [
                    { route: 'Line 1', from: 'Versova', to: 'Ghatkopar', frequency: '4 min' },
                    { route: 'Line 2A', from: 'Dahisar', to: 'Andheri West', frequency: '5 min' },
                    { route: 'Line 7', from: 'Dahisar', to: 'Andheri East', frequency: '5 min' }
                ]
            },
            'Bangalore': {
                'BMTC Buses': [
                    { route: '500A', from: 'Majestic', to: 'Electronic City', frequency: '15 min' },
                    { route: '365A', from: 'Shivajinagar', to: 'Whitefield', frequency: '20 min' },
                    { route: '600', from: 'KR Market', to: 'ITPL', frequency: '12 min' }
                ],
                'Metro': [
                    { route: 'Green Line', from: 'Nagasandra', to: 'Yelachenahalli', frequency: '5 min' },
                    { route: 'Purple Line', from: 'Baiyappanahalli', to: 'Mysore Road', frequency: '5 min' }
                ]
            },
            'Chennai': {
                'MTC Buses': [
                    { route: '1A', from: 'Broadway', to: 'Tambaram', frequency: '8 min' },
                    { route: '2B', from: 'Parrys', to: 'Adyar', frequency: '10 min' },
                    { route: '5C', from: 'T Nagar', to: 'Guindy', frequency: '6 min' }
                ],
                'Metro': [
                    { route: 'Blue Line', from: 'Chennai Central', to: 'Airport', frequency: '7 min' },
                    { route: 'Green Line', from: 'St Thomas Mount', to: 'Parrys', frequency: '8 min' }
                ]
            },
            'Kolkata': {
                'Metro': [
                    { route: 'North-South', from: 'Dakshineswar', to: 'Kavi Subhash', frequency: '5 min' },
                    { route: 'East-West', from: 'Salt Lake', to: 'Howrah', frequency: '6 min' }
                ],
                'WBTC Buses': [
                    { route: 'S1', from: 'Howrah', to: 'Salt Lake', frequency: '10 min' },
                    { route: 'C8', from: 'Garia', to: 'Dunlop', frequency: '12 min' }
                ]
            }
        };
    }
    
    loadRoutes() {
        return [
            { id: 'Y001', name: 'Yellow Line', type: 'Metro', city: 'Delhi', stops: 35, duration: '65 min' },
            { id: 'B002', name: 'Blue Line', type: 'Metro', city: 'Delhi', stops: 50, duration: '85 min' },
            { id: 'W003', name: 'Western Line', type: 'Train', city: 'Mumbai', stops: 36, duration: '90 min' },
            { id: 'C004', name: 'Central Line', type: 'Train', city: 'Mumbai', stops: 24, duration: '60 min' }
        ];
    }
    
    loadStops() {
        return {
            'Rajiv Chowk': { lat: 28.6328, lng: 77.2188, city: 'Delhi', routes: ['Yellow Line', 'Blue Line'] },
            'CST': { lat: 18.9400, lng: 72.8350, city: 'Mumbai', routes: ['Central Line', 'Harbour Line'] },
            'Majestic': { lat: 12.9770, lng: 77.5710, city: 'Bangalore', routes: ['Green Line', 'Purple Line'] }
        };
    }
    
    getSchedules(city, type = 'all') {
        if (type === 'all') {
            return this.schedules[city] || this.schedules['Delhi'];
        }
        return this.schedules[city]?.[type] || [];
    }
    
    findRoute(from, to, city) {
        const results = [];
        const citySchedules = this.schedules[city] || this.schedules['Delhi'];
        
        for (const [type, routes] of Object.entries(citySchedules)) {
            routes.forEach(route => {
                if (route.from.toLowerCase().includes(from.toLowerCase()) || 
                    route.to.toLowerCase().includes(to.toLowerCase())) {
                    results.push({
                        type: type,
                        route: route,
                        estimatedTime: this.estimateTravelTime(from, to, type)
                    });
                }
            });
        }
        
        return results;
    }
    
    estimateTravelTime(from, to, type) {
        // Simple estimation - in production, use actual route data
        const baseTime = 30; // minutes
        const typeFactors = {
            'Metro': 0.8,
            'Local Train': 0.7,
            'DTC Buses': 1.5,
            'BEST Buses': 1.5
        };
        
        return Math.round(baseTime * (typeFactors[type] || 1));
    }
    
    getNextDepartures(stopName, time = new Date()) {
        const hour = time.getHours();
        const minute = time.getMinutes();
        
        // Generate next 5 departures
        const departures = [];
        for (let i = 0; i < 5; i++) {
            const nextHour = hour + Math.floor((minute + i * 15) / 60);
            const nextMinute = (minute + i * 15) % 60;
            departures.push({
                time: `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`,
                route: ['470', '522', '165'][Math.floor(Math.random() * 3)],
                platform: Math.floor(Math.random() * 3) + 1
            });
        }
        
        return departures;
    }
    
    getFare(from, to, type, distance) {
        const baseFares = {
            'Metro': 10,
            'Bus': 5,
            'Train': 10,
            'Local Train': 5
        };
        
        const perKmFares = {
            'Metro': 1.5,
            'Bus': 1,
            'Train': 1.2,
            'Local Train': 0.8
        };
        
        const base = baseFares[type] || 10;
        const perKm = perKmFares[type] || 1;
        
        return Math.round(base + (distance * perKm));
    }
    
    getAccessibilityInfo(stopName) {
        return {
            wheelchair: Math.random() > 0.5,
            elevator: Math.random() > 0.3,
            parking: Math.random() > 0.6,
            bikeRacks: Math.random() > 0.4,
            restrooms: Math.random() > 0.7
        };
    }
}

// Initialize
const transitSchedules = new TransitSchedules();
window.transitSchedules = transitSchedules;