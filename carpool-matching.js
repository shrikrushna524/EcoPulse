// ===== COMPLETE CARPOOL MATCHING MODULE =====
class CarpoolMatching {
    constructor() {
        this.users = this.loadUsers();
        this.rides = this.loadRides();
        this.matches = [];
    }
    
    loadUsers() {
        // Sample users
        return [
            { id: 1, name: 'Rahul K.', start: 'Dwarka', end: 'CP', time: '09:00', return: '18:00', days: ['Mon','Tue','Wed','Thu','Fri'], rating: 4.8 },
            { id: 2, name: 'Priya S.', start: 'Vikaspuri', end: 'Rajiv Chowk', time: '09:15', return: '18:30', days: ['Mon','Tue','Wed','Thu','Fri'], rating: 4.9 },
            { id: 3, name: 'Amit M.', start: 'Janakpuri', end: 'ITO', time: '08:30', return: '17:30', days: ['Mon','Tue','Wed','Thu','Fri'], rating: 4.7 },
            { id: 4, name: 'Neha G.', start: 'Palam', end: 'AIIMS', time: '08:50', return: '17:45', days: ['Mon','Tue','Wed','Thu','Fri'], rating: 4.6 },
            { id: 5, name: 'Vikram S.', start: 'Rohini', end: 'Connaught Place', time: '08:45', return: '18:15', days: ['Mon','Tue','Wed','Thu','Fri'], rating: 4.5 },
            { id: 6, name: 'Anjali K.', start: 'Noida', end: 'Gurgaon', time: '08:00', return: '19:00', days: ['Mon','Tue','Wed','Thu','Fri'], rating: 4.9 }
        ];
    }
    
    loadRides() {
        return [
            { id: 101, userId: 1, seats: 3, preferences: 'non-smoking', vehicle: 'Hyundai i20' },
            { id: 102, userId: 2, seats: 2, preferences: 'female only', vehicle: 'Maruti Swift' },
            { id: 103, userId: 3, seats: 4, preferences: 'any', vehicle: 'Honda City' }
        ];
    }
    
    findMatches(userStart, userEnd, userTime, tolerance = 30) {
        const matches = [];
        const userTimeMinutes = this.timeToMinutes(userTime);
        
        this.users.forEach(user => {
            // Skip if same as current user (in real app, check user ID)
            
            // Calculate time difference
            const userTimeMinutes2 = this.timeToMinutes(user.time);
            const timeDiff = Math.abs(userTimeMinutes2 - userTimeMinutes);
            
            // Check if within tolerance
            if (timeDiff <= tolerance) {
                // Calculate route overlap
                const overlap = this.calculateRouteOverlap(
                    userStart, userEnd, user.start, user.end
                );
                
                if (overlap.score > 50) {
                    matches.push({
                        user: user,
                        timeDiff: timeDiff,
                        overlap: overlap,
                        score: this.calculateMatchScore(overlap.score, timeDiff, user.rating)
                    });
                }
            }
        });
        
        // Sort by match score
        return matches.sort((a, b) => b.score - a.score);
    }
    
    timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
    
    calculateRouteOverlap(start1, end1, start2, end2) {
        // Simplified route overlap calculation
        // In production, use actual routes and waypoints
        
        const commonStart = start1.toLowerCase().includes(start2.toLowerCase()) ||
                           start2.toLowerCase().includes(start1.toLowerCase());
        const commonEnd = end1.toLowerCase().includes(end2.toLowerCase()) ||
                         end2.toLowerCase().includes(end1.toLowerCase());
        
        let score = 0;
        let details = [];
        
        if (commonStart && commonEnd) {
            score = 100;
            details.push('Same start and destination');
        } else if (commonStart) {
            score = 60;
            details.push('Same starting point');
        } else if (commonEnd) {
            score = 60;
            details.push('Same destination');
        } else {
            // Check if routes intersect
            score = 40;
            details.push('Routes may intersect');
        }
        
        return { score, details };
    }
    
    calculateMatchScore(overlapScore, timeDiff, rating) {
        const overlapWeight = 0.5;
        const timeWeight = 0.3;
        const ratingWeight = 0.2;
        
        const timeScore = Math.max(0, 100 - (timeDiff * 2));
        const ratingScore = rating * 20; // Convert 5-star to 0-100
        
        return Math.round(
            overlapScore * overlapWeight +
            timeScore * timeWeight +
            ratingScore * ratingWeight
        );
    }
    
    createRide(userId, start, end, time, returnTime, seats, preferences) {
        const ride = {
            id: this.rides.length + 101,
            userId: userId,
            start: start,
            end: end,
            time: time,
            returnTime: returnTime,
            seats: seats,
            preferences: preferences,
            created: new Date().toISOString(),
            active: true
        };
        
        this.rides.push(ride);
        return ride;
    }
    
    requestJoin(rideId, userId) {
        const ride = this.rides.find(r => r.id === rideId);
        if (!ride) return { success: false, message: 'Ride not found' };
        
        if (ride.seats <= 0) {
            return { success: false, message: 'No seats available' };
        }
        
        // In production, create a request record
        return {
            success: true,
            message: 'Request sent to driver',
            ride: ride
        };
    }
    
    getRouteSuggestions(start, end) {
        // Suggest popular carpool routes
        const routes = [
            { start: 'Dwarka', end: 'CP', popularity: 95 },
            { start: 'Noida', end: 'Gurgaon', popularity: 90 },
            { start: 'Rohini', end: 'Connaught Place', popularity: 85 },
            { start: 'Janakpuri', end: 'ITO', popularity: 80 }
        ];
        
        return routes.filter(r => 
            r.start.toLowerCase().includes(start.toLowerCase()) ||
            r.end.toLowerCase().includes(end.toLowerCase())
        );
    }
    
    calculateSavingsPerPerson(distance, passengers) {
        const fuelCost = (distance / 15) * 100; // ₹100 per liter, 15 km/l
        const totalCost = fuelCost + (distance * 1.5); // Maintenance
        const perPerson = Math.round(totalCost / passengers);
        
        return {
            totalCost: totalCost,
            perPerson: perPerson,
            savingsPerPerson: Math.round(fuelCost - perPerson),
            monthlySavings: Math.round((fuelCost - perPerson) * 22) // 22 working days
        };
    }
    
    getSafetyTips() {
        return [
            'Meet in a public place first',
            'Share ride details with family/friends',
            'Check driver\'s license and vehicle',
            'Agree on fare sharing beforehand',
            'Keep emergency contacts handy',
            'Trust your instincts - cancel if uncomfortable'
        ];
    }
}

// Initialize
const carpoolMatching = new CarpoolMatching();
window.carpoolMatching = carpoolMatching;