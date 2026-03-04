// ===== COMPLETE WASTE REDUCTION TRACKER =====
class WasteTracker {
    constructor() {
        this.logs = this.loadLogs();
        this.stats = this.calculateStats();
        this.goals = this.loadGoals();
        this.challenges = this.loadChallenges();
    }
    
    loadLogs() {
        return JSON.parse(localStorage.getItem('wasteLogs')) || [];
    }
    
    loadGoals() {
        return JSON.parse(localStorage.getItem('wasteGoals')) || {
            daily: 1, // kg per day
            weekly: 5,
            monthly: 20,
            yearly: 240
        };
    }
    
    loadChallenges() {
        return [
            {
                id: 1,
                name: 'Zero Waste Week',
                description: 'No trash to landfill for 7 days',
                target: 7,
                unit: 'days',
                reward: '🌱 Zero Waste Hero Badge'
            },
            {
                id: 2,
                name: 'Plastic Free July',
                description: 'Avoid all single-use plastic',
                target: 31,
                unit: 'days',
                reward: '🌊 Ocean Saver Badge'
            },
            {
                id: 3,
                name: '100 Items Recycled',
                description: 'Recycle 100 items',
                target: 100,
                unit: 'items',
                reward: '♻️ Master Recycler Badge'
            },
            {
                id: 4,
                name: 'Compost Champion',
                description: 'Compost 50kg of food waste',
                target: 50,
                unit: 'kg',
                reward: '🌿 Soil Saver Badge'
            }
        ];
    }
    
    addLog(item, weight, category) {
        const log = {
            id: Date.now(),
            date: new Date().toISOString(),
            item: item,
            weight: weight,
            category: category,
            co2: this.calculateCO2(weight, category)
        };
        
        this.logs.unshift(log);
        this.saveLogs();
        this.updateStats();
        return log;
    }
    
    deleteLog(id) {
        this.logs = this.logs.filter(log => log.id !== id);
        this.saveLogs();
        this.updateStats();
    }
    
    calculateCO2(weight, category) {
        const factors = {
            'plastic': 3.5,
            'paper': 2.0,
            'glass': 1.5,
            'metal': 6.0,
            'electronic': 4.0,
            'organic': 0.5,
            'textile': 3.0,
            'default': 2.0
        };
        
        const factor = factors[category] || factors.default;
        return weight * factor;
    }
    
    calculateStats() {
        const totalItems = this.logs.length;
        const totalWeight = this.logs.reduce((sum, log) => sum + log.weight, 0);
        const totalCO2 = this.logs.reduce((sum, log) => sum + log.co2, 0);
        
        // Weekly stats
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const weeklyLogs = this.logs.filter(log => new Date(log.date) > oneWeekAgo);
        const weeklyWeight = weeklyLogs.reduce((sum, log) => sum + log.weight, 0);
        
        // Monthly stats
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        
        const monthlyLogs = this.logs.filter(log => new Date(log.date) > oneMonthAgo);
        const monthlyWeight = monthlyLogs.reduce((sum, log) => sum + log.weight, 0);
        
        // Category breakdown
        const categories = {};
        this.logs.forEach(log => {
            if (!categories[log.category]) {
                categories[log.category] = {
                    count: 0,
                    weight: 0,
                    co2: 0
                };
            }
            categories[log.category].count++;
            categories[log.category].weight += log.weight;
            categories[log.category].co2 += log.co2;
        });
        
        return {
            totalItems,
            totalWeight,
            totalCO2,
            weeklyWeight,
            monthlyWeight,
            categories,
            treesSaved: Math.round(totalCO2 / 50), // 1 tree absorbs 50kg CO2/year
            carsEquivalent: (totalCO2 / 4600).toFixed(2), // 1 car emits 4600kg/year
            energySaved: Math.round(totalCO2 * 2.5) // kWh equivalent
        };
    }
    
    saveLogs() {
        localStorage.setItem('wasteLogs', JSON.stringify(this.logs));
    }
    
    updateStats() {
        this.stats = this.calculateStats();
        localStorage.setItem('wasteStats', JSON.stringify(this.stats));
        return this.stats;
    }
    
    getImpactMetrics() {
        return {
            co2Reduced: this.stats.totalCO2.toFixed(1) + ' kg',
            treesPlanted: this.stats.treesSaved,
            energySaved: this.stats.energySaved + ' kWh',
            carsOffRoad: this.stats.carsEquivalent
        };
    }
    
    getProgressToGoals() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const daysLeft = 365 - dayOfYear;
        
        return {
            daily: {
                current: this.stats.weeklyWeight / 7,
                target: this.goals.daily,
                percent: Math.min(100, (this.stats.weeklyWeight / 7 / this.goals.daily) * 100)
            },
            weekly: {
                current: this.stats.weeklyWeight,
                target: this.goals.weekly,
                percent: Math.min(100, (this.stats.weeklyWeight / this.goals.weekly) * 100)
            },
            monthly: {
                current: this.stats.monthlyWeight,
                target: this.goals.monthly,
                percent: Math.min(100, (this.stats.monthlyWeight / this.goals.monthly) * 100)
            },
            yearly: {
                current: this.stats.totalWeight,
                target: this.goals.yearly,
                percent: Math.min(100, (this.stats.totalWeight / this.goals.yearly) * 100)
            }
        };
    }
    
    getActiveChallenges() {
        const active = [];
        const today = new Date();
        
        this.challenges.forEach(challenge => {
            const progress = this.getChallengeProgress(challenge);
            if (progress.percent < 100) {
                active.push({
                    ...challenge,
                    progress: progress
                });
            }
        });
        
        return active;
    }
    
    getChallengeProgress(challenge) {
        let current = 0;
        
        switch(challenge.id) {
            case 1: // Zero Waste Week
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                current = this.logs.filter(l => new Date(l.date) > weekAgo).length;
                break;
            case 2: // Plastic Free July
                const julyStart = new Date(today.getFullYear(), 6, 1);
                const julyLogs = this.logs.filter(l => 
                    new Date(l.date) > julyStart && 
                    l.category === 'plastic'
                );
                current = 31 - julyLogs.length;
                break;
            case 3: // 100 Items
                current = this.logs.length;
                break;
            case 4: // Compost 50kg
                current = this.logs
                    .filter(l => l.category === 'organic')
                    .reduce((sum, l) => sum + l.weight, 0);
                break;
        }
        
        return {
            current: current,
            target: challenge.target,
            percent: Math.min(100, (current / challenge.target) * 100),
            remaining: Math.max(0, challenge.target - current)
        };
    }
    
    getTips() {
        const tips = [
            'Keep a recycling bin in every room to make sorting easy',
            'Wash containers before recycling to prevent contamination',
            'Flatten cardboard boxes to save space in your bin',
            'Bring your own bags when shopping',
            'Buy in bulk to reduce packaging waste',
            'Compost food scraps instead of throwing away',
            'Repair items before replacing them',
            'Borrow or rent items you rarely use',
            'Choose products with minimal packaging',
            'Use reusable water bottles and coffee cups'
        ];
        
        // Get personalized tip based on user's habits
        const plasticCount = this.stats.categories['plastic']?.count || 0;
        if (plasticCount > 10) {
            tips.unshift('You recycle a lot of plastic! Try to reduce single-use plastics by carrying a reusable water bottle.');
        }
        
        const organicWeight = this.stats.categories['organic']?.weight || 0;
        if (organicWeight > 5) {
            tips.unshift('Great job composting! Your food waste is turning into nutrient-rich soil.');
        }
        
        return tips;
    }
    
    getAchievements() {
        const achievements = [];
        
        // Weight milestones
        if (this.stats.totalWeight >= 10) achievements.push('🥉 Bronze Recycler - 10kg diverted');
        if (this.stats.totalWeight >= 50) achievements.push('🥈 Silver Recycler - 50kg diverted');
        if (this.stats.totalWeight >= 100) achievements.push('🥇 Gold Recycler - 100kg diverted');
        if (this.stats.totalWeight >= 500) achievements.push('💎 Diamond Recycler - 500kg diverted');
        
        // CO2 milestones
        if (this.stats.totalCO2 >= 100) achievements.push('🌍 Climate Saver - 100kg CO2 saved');
        if (this.stats.totalCO2 >= 1000) achievements.push('🌲 Forest Protector - 1 ton CO2 saved');
        
        // Tree equivalent
        if (this.stats.treesSaved >= 1) achievements.push(`🌳 Tree Planter - Saved ${this.stats.treesSaved} trees`);
        
        // Consistency
        if (this.logs.length >= 30) achievements.push('📅 Consistent Recycler - 30+ logs');
        if (this.logs.length >= 100) achievements.push('⭐ Dedicated Recycler - 100+ logs');
        
        return achievements;
    }
    
    exportData() {
        const data = {
            logs: this.logs,
            stats: this.stats,
            goals: this.goals,
            achievements: this.getAchievements(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `waste-tracker-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    }
    
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.logs) {
                    this.logs = data.logs;
                    this.saveLogs();
                    this.updateStats();
                    alert('Data imported successfully!');
                }
            } catch (error) {
                alert('Invalid file format');
            }
        };
        reader.readAsText(file);
    }
    
    resetData() {
        if (confirm('Are you sure? This will delete all your logs.')) {
            this.logs = [];
            this.saveLogs();
            this.updateStats();
            location.reload();
        }
    }
}

// Initialize
const wasteTracker = new WasteTracker();
window.wasteTracker = wasteTracker;