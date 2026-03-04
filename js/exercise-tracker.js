// ===== COMPLETE GREEN EXERCISE TRACKER MODULE =====
class ExerciseTracker {
    constructor() {
        this.activities = this.loadActivities();
        this.calorieRates = {
            'walking': 4, // calories per minute
            'hiking': 6,
            'running': 10,
            'cycling': 8,
            'gardening': 3,
            'yoga': 2.5,
            'swimming': 7,
            'kayaking': 5,
            'trail running': 11,
            'outdoor gym': 5
        };
    }
    
    loadActivities() {
        return JSON.parse(localStorage.getItem('exerciseActivities')) || [];
    }
    
    saveActivities() {
        localStorage.setItem('exerciseActivities', JSON.stringify(this.activities));
    }
    
    addActivity(type, duration, location, intensity = 'moderate') {
        const activity = {
            id: Date.now(),
            type: type,
            duration: duration,
            location: location,
            intensity: intensity,
            calories: this.calculateCalories(type, duration, intensity),
            date: new Date().toISOString(),
            weather: this.getWeatherConditions(),
            notes: ''
        };
        
        this.activities.push(activity);
        this.saveActivities();
        return activity;
    }
    
    calculateCalories(type, duration, intensity) {
        const baseRate = this.calorieRates[type] || 4;
        const intensityFactor = {
            'low': 0.8,
            'moderate': 1.0,
            'high': 1.3
        };
        
        return Math.round(duration * baseRate * (intensityFactor[intensity] || 1.0));
    }
    
    getWeatherConditions() {
        // Simulate weather - in production, use weather API
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
        return conditions[Math.floor(Math.random() * conditions.length)];
    }
    
    getStats(period = 'month') {
        const now = new Date();
        let cutoff = new Date();
        
        if (period === 'week') cutoff.setDate(now.getDate() - 7);
        if (period === 'month') cutoff.setMonth(now.getMonth() - 1);
        if (period === 'year') cutoff.setFullYear(now.getFullYear() - 1);
        
        const filtered = this.activities.filter(a => new Date(a.date) > cutoff);
        
        const totalDuration = filtered.reduce((sum, a) => sum + a.duration, 0);
        const totalCalories = filtered.reduce((sum, a) => sum + a.calories, 0);
        const sessions = filtered.length;
        
        return {
            period: period,
            sessions: sessions,
            totalDuration: totalDuration,
            totalCalories: totalCalories,
            averageDuration: sessions > 0 ? Math.round(totalDuration / sessions) : 0,
            averageCalories: sessions > 0 ? Math.round(totalCalories / sessions) : 0,
            byType: this.getBreakdown(filtered)
        };
    }
    
    getBreakdown(activities) {
        const breakdown = {};
        
        activities.forEach(a => {
            if (!breakdown[a.type]) {
                breakdown[a.type] = {
                    count: 0,
                    duration: 0,
                    calories: 0
                };
            }
            breakdown[a.type].count++;
            breakdown[a.type].duration += a.duration;
            breakdown[a.type].calories += a.calories;
        });
        
        return breakdown;
    }
    
    getNatureTime() {
        const totalMinutes = this.activities.reduce((sum, a) => sum + a.duration, 0);
        const totalHours = totalMinutes / 60;
        
        return {
            totalMinutes: totalMinutes,
            totalHours: Math.round(totalHours * 10) / 10,
            sessions: this.activities.length,
            averagePerSession: Math.round(totalMinutes / this.activities.length),
            healthBenefits: this.calculateHealthBenefits(totalHours)
        };
    }
    
    calculateHealthBenefits(hoursInNature) {
        // Based on research: 2 hours/week in nature provides optimal benefits
        const weeks = hoursInNature / 2;
        
        return {
            stressReduction: Math.min(28, Math.round(weeks * 14)), // 14% per week
            vitaminDBoost: Math.min(40, Math.round(weeks * 20)),
            moodBoost: Math.min(33, Math.round(weeks * 16.5)),
            illnessRiskReduction: Math.min(20, Math.round(weeks * 10))
        };
    }
    
    getWeeklyGoal() {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const weeklyMinutes = this.activities
            .filter(a => new Date(a.date) > weekAgo)
            .reduce((sum, a) => sum + a.duration, 0);
        
        const weeklyHours = weeklyMinutes / 60;
        const targetHours = 2; // WHO recommendation
        
        return {
            current: Math.round(weeklyHours * 10) / 10,
            target: targetHours,
            percentage: Math.min(100, (weeklyHours / targetHours) * 100),
            onTrack: weeklyHours >= targetHours
        };
    }
    
    getRecommendations() {
        const goal = this.getWeeklyGoal();
        const recs = [];
        
        if (goal.current < goal.target) {
            const needed = goal.target - goal.current;
            recs.push(`Need ${needed.toFixed(1)} more hours in nature this week`);
            recs.push('Try a 30-minute walk in a local park');
            recs.push('Weekend hiking is great for reaching your goal');
        } else {
            recs.push('Great job! You\'ve met your weekly nature time goal');
            recs.push('Consider trying new outdoor activities');
        }
        
        return recs;
    }
    
    getFavoriteLocations() {
        const locations = {};
        
        this.activities.forEach(a => {
            if (a.location) {
                locations[a.location] = (locations[a.location] || 0) + 1;
            }
        });
        
        return Object.entries(locations)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([loc, count]) => ({ location: loc, visits: count }));
    }
    
    exportData() {
        const data = {
            activities: this.activities,
            stats: this.getStats('year'),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    }
}

// Initialize
const exerciseTracker = new ExerciseTracker();
window.exerciseTracker = exerciseTracker;