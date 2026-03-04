// ===== COMPLETE SHOWER TIMER MODULE =====
class ShowerTimer {
    constructor() {
        this.flowRate = 10; // L per minute (standard showerhead)
        this.lowFlowRate = 6; // L per minute (low-flow showerhead)
        this.targetTime = 5; // minutes (recommended)
        this.history = this.loadHistory();
    }
    
    loadHistory() {
        return JSON.parse(localStorage.getItem('showerHistory')) || [];
    }
    
    saveHistory() {
        localStorage.setItem('showerHistory', JSON.stringify(this.history));
    }
    
    startShower() {
        const shower = {
            id: Date.now(),
            startTime: new Date().toISOString(),
            endTime: null,
            duration: null,
            waterUsed: null,
            waterSaved: null
        };
        
        return shower;
    }
    
    endShower(shower, flowType = 'standard') {
        const endTime = new Date();
        const startTime = new Date(shower.startTime);
        const duration = (endTime - startTime) / 1000 / 60; // minutes
        
        const rate = flowType === 'low' ? this.lowFlowRate : this.flowRate;
        const waterUsed = duration * rate;
        const waterSaved = Math.max(0, (this.targetTime - duration) * rate);
        
        shower.endTime = endTime.toISOString();
        shower.duration = Math.round(duration * 10) / 10;
        shower.waterUsed = Math.round(waterUsed);
        shower.waterSaved = Math.round(waterSaved);
        
        this.history.push(shower);
        this.saveHistory();
        
        return shower;
    }
    
    getStats() {
        const total = this.history.length;
        const totalWater = this.history.reduce((sum, s) => sum + s.waterUsed, 0);
        const totalSaved = this.history.reduce((sum, s) => sum + s.waterSaved, 0);
        const avgDuration = this.history.reduce((sum, s) => sum + s.duration, 0) / total || 0;
        
        // This week
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weeklyShowers = this.history.filter(s => new Date(s.startTime) > weekAgo);
        const weeklyWater = weeklyShowers.reduce((sum, s) => sum + s.waterUsed, 0);
        const weeklySaved = weeklyShowers.reduce((sum, s) => sum + s.waterSaved, 0);
        
        // Best streak (showers under target)
        let currentStreak = 0;
        let bestStreak = 0;
        this.history.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        
        for (const shower of this.history) {
            if (shower.duration <= this.targetTime) {
                currentStreak++;
                bestStreak = Math.max(bestStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        }
        
        return {
            totalShowers: total,
            totalWater: totalWater,
            totalSaved: totalSaved,
            avgDuration: Math.round(avgDuration * 10) / 10,
            weeklyWater: weeklyWater,
            weeklySaved: weeklySaved,
            bestStreak: bestStreak,
            moneySaved: Math.round(totalSaved * 0.05), // ₹0.05 per liter
            co2Saved: Math.round(totalSaved * 0.0015 * 0.85), // kg CO2
            treesEquivalent: Math.ceil(totalSaved * 0.0015 / 21)
        };
    }
    
    getMusicPlaylist() {
        return [
            { name: 'Bohemian Rhapsody - Queen', duration: '5:55', ideal: 'Full song' },
            { name: 'Shape of You - Ed Sheeran', duration: '4:23', ideal: 'Good' },
            { name: 'Blinding Lights - The Weeknd', duration: '3:20', ideal: 'Perfect 3-min shower' },
            { name: 'Despacito - Luis Fonsi', duration: '4:41', ideal: 'Good' },
            { name: 'Uptown Funk - Bruno Mars', duration: '4:30', ideal: 'Good' },
            { name: 'Rolling in the Deep - Adele', duration: '3:48', ideal: 'Quick shower' }
        ];
    }
    
    getShowerTips() {
        return [
            {
                tip: 'Wet yourself, turn off water while soaping, then rinse',
                savings: '50% water reduction'
            },
            {
                tip: 'Install a low-flow showerhead',
                savings: '15,000L/year'
            },
            {
                tip: 'Take Navy showers (wet, off, soap, on, rinse)',
                savings: '70% water reduction'
            },
            {
                tip: 'Use a shower timer or playlist to track time',
                savings: '20-30% reduction'
            },
            {
                tip: 'Collect cold water while waiting for hot water',
                savings: '1000L/year'
            },
            {
                tip: 'Take shorter showers by 2 minutes',
                savings: '7,300L/year'
            }
        ];
    }
    
    getWaterHeaterEnergy(waterUsed, tempRise = 30) {
        // Specific heat capacity: 4.186 J/g°C
        // 1 liter = 1000g
        const energyJoules = waterUsed * 1000 * 4.186 * tempRise;
        const energyKWh = energyJoules / 3600000;
        
        return {
            energyKWh: Math.round(energyKWh * 100) / 100,
            cost: Math.round(energyKWh * 8), // ₹8 per kWh
            co2: Math.round(energyKWh * 0.85) // kg CO2
        };
    }
    
    setTargetTime(minutes) {
        this.targetTime = minutes;
        localStorage.setItem('showerTarget', minutes);
    }
    
    getTargetTime() {
        return this.targetTime;
    }
}

// Initialize
const showerTimer = new ShowerTimer();
window.showerTimer = showerTimer;