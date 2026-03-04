// ===== COMPLETE TREE PLANTATION COUNTER MODULE =====
class TreeCounter {
    constructor() {
        this.totalTrees = 10247893;
        this.dailyTarget = 10000;
        this.treesPlantedToday = 0;
        this.history = this.loadHistory();
    }
    
    loadHistory() {
        return JSON.parse(localStorage.getItem('treeHistory')) || [];
    }
    
    saveHistory() {
        localStorage.setItem('treeHistory', JSON.stringify(this.history));
    }
    
    plantTree(user = 'anonymous') {
        this.totalTrees++;
        this.treesPlantedToday++;
        
        const record = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            user: user,
            count: 1
        };
        
        this.history.push(record);
        this.saveHistory();
        
        return {
            total: this.totalTrees,
            impact: this.calculateImpact(1)
        };
    }
    
    plantTrees(count, user = 'anonymous') {
        this.totalTrees += count;
        this.treesPlantedToday += count;
        
        const record = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            user: user,
            count: count
        };
        
        this.history.push(record);
        this.saveHistory();
        
        return {
            total: this.totalTrees,
            impact: this.calculateImpact(count)
        };
    }
    
    calculateImpact(trees) {
        const co2PerTree = 21; // kg per year
        const oxygenPerTree = 15; // kg per year
        const waterPerTree = 50; // liters per day
        
        return {
            co2Absorbed: trees * co2PerTree,
            oxygenProduced: trees * oxygenPerTree,
            waterFiltered: trees * waterPerTree * 365,
            carsEquivalent: Math.round(trees * co2PerTree / 4600),
            peopleOxygen: Math.round(trees * oxygenPerTree / 200) // 1 person needs 200kg O2/year
        };
    }
    
    getLeaderboard(limit = 10) {
        const userStats = {};
        
        this.history.forEach(record => {
            if (!userStats[record.user]) {
                userStats[record.user] = 0;
            }
            userStats[record.user] += record.count;
        });
        
        return Object.entries(userStats)
            .map(([user, count]) => ({ user, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }
    
    getDailyProgress() {
        const today = new Date().toDateString();
        const todayTrees = this.history
            .filter(r => new Date(r.timestamp).toDateString() === today)
            .reduce((sum, r) => sum + r.count, 0);
        
        return {
            planted: todayTrees,
            target: this.dailyTarget,
            percentage: (todayTrees / this.dailyTarget) * 100
        };
    }
    
    getMonthlyStats(year, month) {
        const monthly = this.history.filter(r => {
            const date = new Date(r.timestamp);
            return date.getFullYear() === year && date.getMonth() === month;
        });
        
        const total = monthly.reduce((sum, r) => sum + r.count, 0);
        const users = new Set(monthly.map(r => r.user)).size;
        
        return {
            total: total,
            users: users,
            average: Math.round(total / (users || 1))
        };
    }
    
    getYearlyStats(year) {
        const yearly = this.history.filter(r => {
            const date = new Date(r.timestamp);
            return date.getFullYear() === year;
        });
        
        return {
            total: yearly.reduce((sum, r) => sum + r.count, 0),
            months: this.getMonthlyBreakdown(year)
        };
    }
    
    getMonthlyBreakdown(year) {
        const months = Array(12).fill(0);
        
        this.history.forEach(r => {
            const date = new Date(r.timestamp);
            if (date.getFullYear() === year) {
                months[date.getMonth()] += r.count;
            }
        });
        
        return months;
    }
    
    getGlobalImpact() {
        const totalCO2 = this.totalTrees * 21;
        const totalOxygen = this.totalTrees * 15;
        
        return {
            trees: this.totalTrees,
            co2Removed: totalCO2,
            oxygenProduced: totalOxygen,
            forestArea: Math.round(this.totalTrees / 1000), // hectares
            cities: Math.round(totalOxygen / 100000000), // cities of 1M people
            carsRemoved: Math.round(totalCO2 / 4600)
        };
    }
    
    getSpeciesBreakdown() {
        return {
            'Neem': 2500000,
            'Peepal': 1800000,
            'Banyan': 1200000,
            'Mango': 2000000,
            'Teak': 1500000,
            'Other': 1247893
        };
    }
}

// Initialize
const treeCounter = new TreeCounter();
window.treeCounter = treeCounter;