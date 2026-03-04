// ===== COMPLETE WALKABILITY SCORE MODULE =====
class WalkabilityScore {
    constructor() {
        this.criteria = this.loadCriteria();
        this.weights = this.loadWeights();
    }
    
    loadCriteria() {
        return [
            {
                id: 'grocery',
                name: 'Grocery Store',
                description: 'Within 15 min walk',
                weight: 1.5,
                category: 'essentials'
            },
            {
                id: 'school',
                name: 'School',
                description: 'Within 15 min walk',
                weight: 1.3,
                category: 'essentials'
            },
            {
                id: 'park',
                name: 'Park/Green Space',
                description: 'Within 10 min walk',
                weight: 1.2,
                category: 'recreation'
            },
            {
                id: 'transit',
                name: 'Public Transport',
                description: 'Within 10 min walk',
                weight: 1.4,
                category: 'transport'
            },
            {
                id: 'restaurants',
                name: 'Restaurants/Cafes',
                description: 'Within 15 min walk',
                weight: 1.1,
                category: 'amenities'
            },
            {
                id: 'pharmacy',
                name: 'Pharmacy',
                description: 'Within 15 min walk',
                weight: 1.2,
                category: 'essentials'
            },
            {
                id: 'bank',
                name: 'Bank/ATM',
                description: 'Within 15 min walk',
                weight: 1.0,
                category: 'services'
            },
            {
                id: 'sidewalks',
                name: 'Sidewalks',
                description: 'In good condition',
                weight: 1.3,
                category: 'infrastructure'
            },
            {
                id: 'crosswalks',
                name: 'Crosswalks',
                description: 'With signals',
                weight: 1.2,
                category: 'infrastructure'
            },
            {
                id: 'lighting',
                name: 'Street Lighting',
                description: 'At night',
                weight: 1.1,
                category: 'infrastructure'
            },
            {
                id: 'hospital',
                name: 'Hospital/Clinic',
                description: 'Within 20 min walk',
                weight: 1.3,
                category: 'essentials'
            },
            {
                id: 'library',
                name: 'Library',
                description: 'Within 20 min walk',
                weight: 0.8,
                category: 'amenities'
            },
            {
                id: 'gym',
                name: 'Gym/Fitness Center',
                description: 'Within 15 min walk',
                weight: 0.9,
                category: 'recreation'
            },
            {
                id: 'daycare',
                name: 'Daycare',
                description: 'Within 15 min walk',
                weight: 1.1,
                category: 'essentials'
            },
            {
                id: 'post_office',
                name: 'Post Office',
                description: 'Within 20 min walk',
                weight: 0.7,
                category: 'services'
            },
            {
                id: 'police',
                name: 'Police Station',
                description: 'Within 20 min walk',
                weight: 0.9,
                category: 'safety'
            }
        ];
    }
    
    loadWeights() {
        return {
            'essentials': 1.3,
            'transport': 1.2,
            'infrastructure': 1.2,
            'amenities': 1.0,
            'recreation': 1.1,
            'services': 0.9,
            'safety': 1.1
        };
    }
    
    calculateScore(responses) {
        let totalWeightedScore = 0;
        let totalWeight = 0;
        const categoryScores = {};
        
        this.criteria.forEach(criterion => {
            const response = responses[criterion.id] || false;
            const category = criterion.category;
            
            if (!categoryScores[category]) {
                categoryScores[category] = { score: 0, weight: 0 };
            }
            
            if (response) {
                const weightedValue = criterion.weight * this.weights[category];
                totalWeightedScore += weightedValue;
                categoryScores[category].score += weightedValue;
            }
            
            totalWeight += criterion.weight * this.weights[category];
            categoryScores[category].weight += criterion.weight * this.weights[category];
        });
        
        const rawScore = (totalWeightedScore / totalWeight) * 100;
        const finalScore = Math.min(100, Math.round(rawScore));
        
        // Calculate category percentages
        const categoryPercentages = {};
        for (const [cat, data] of Object.entries(categoryScores)) {
            categoryPercentages[cat] = Math.round((data.score / data.weight) * 100) || 0;
        }
        
        return {
            score: finalScore,
            rating: this.getRating(finalScore),
            categoryScores: categoryPercentages,
            rawScore: Math.round(rawScore * 10) / 10,
            maxPossible: 100
        };
    }
    
    getRating(score) {
        if (score >= 90) return { text: 'Walker\'s Paradise', color: '#2ecc71', description: 'Daily errands do not require a car' };
        if (score >= 70) return { text: 'Very Walkable', color: '#27ae60', description: 'Most errands can be accomplished on foot' };
        if (score >= 50) return { text: 'Somewhat Walkable', color: '#f39c12', description: 'Some errands can be accomplished on foot' };
        if (score >= 30) return { text: 'Car-Dependent', color: '#e67e22', description: 'Most errands require a car' };
        return { text: 'Very Car-Dependent', color: '#e74c3c', description: 'Almost all errands require a car' };
    }
    
    getRecommendations(score, missingAmenities) {
        const recs = [];
        
        if (score < 50) {
            recs.push('Consider living closer to essential services');
        }
        
        if (missingAmenities.includes('sidewalks')) {
            recs.push('Advocate for sidewalk improvements in your area');
        }
        
        if (missingAmenities.includes('lighting')) {
            recs.push('Request better street lighting from local authorities');
        }
        
        if (missingAmenities.includes('transit')) {
            recs.push('Check for bus stops within 1km - they may be closer than you think');
        }
        
        return recs;
    }
    
    getNearbyAmenities(lat, lng) {
        // In production, use Google Places API
        return {
            grocery: ['Store A (0.3 km)', 'Store B (0.8 km)'],
            restaurants: ['Cafe X (0.2 km)', 'Restaurant Y (0.5 km)'],
            parks: ['Central Park (0.7 km)'],
            transit: ['Bus Stop (0.3 km)', 'Metro Station (1.2 km)']
        };
    }
    
    compareNeighborhoods(neighborhood1, neighborhood2) {
        // Simulate comparing two neighborhoods
        return {
            neighborhood1: {
                name: neighborhood1,
                score: Math.floor(Math.random() * 30) + 50
            },
            neighborhood2: {
                name: neighborhood2,
                score: Math.floor(Math.random() * 30) + 50
            },
            difference: Math.abs(score1 - score2),
            betterFor: score1 > score2 ? 'walking' : 'driving'
        };
    }
    
    getHealthBenefits(score) {
        const minutesWalkedPerWeek = score * 10; // Estimate
        const caloriesBurned = minutesWalkedPerWeek * 4; // 4 cal/min
        const co2Saved = (minutesWalkedPerWeek / 60) * 0.2; // 0.2 kg CO2 per minute driven
        
        return {
            minutesWalkedPerWeek: minutesWalkedPerWeek,
            caloriesBurnedPerWeek: caloriesBurned,
            co2SavedPerWeek: co2Saved.toFixed(2) + ' kg',
            healthScore: Math.min(100, score + 20)
        };
    }
}

// Initialize
const walkabilityScore = new WalkabilityScore();
window.walkabilityScore = walkabilityScore;