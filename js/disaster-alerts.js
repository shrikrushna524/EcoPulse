// ===== COMPLETE DISASTER ALERTS MODULE =====
class DisasterAlerts {
    constructor() {
        this.alerts = [];
        this.subscribers = [];
        this.alertSources = this.loadAlertSources();
        this.severityLevels = ['low', 'moderate', 'high', 'extreme'];
    }
    
    loadAlertSources() {
        return {
            imd: 'India Meteorological Department',
            ndma: 'National Disaster Management Authority',
            incois: 'Indian National Centre for Ocean Information Services',
            gsi: 'Geological Survey of India',
            isro: 'ISRO (satellite data)'
        };
    }
    
    generateAlert() {
        const types = ['cyclone', 'flood', 'earthquake', 'fire', 'heatwave', 'landslide', 'tsunami', 'drought'];
        const locations = ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Bangalore', 'Guwahati', 'Bhubaneswar', 'Ahmedabad', 'Pune', 'Lucknow'];
        const severities = ['low', 'moderate', 'high', 'extreme'];
        
        const type = types[Math.floor(Math.random() * types.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        
        const alert = {
            id: Date.now(),
            type: type,
            severity: severity,
            title: this.generateAlertTitle(type, severity),
            location: locations[Math.floor(Math.random() * locations.length)],
            time: new Date().toISOString(),
            source: Object.values(this.alertSources)[Math.floor(Math.random() * 5)],
            affected: this.generateAffectedArea(type),
            instructions: this.generateInstructions(type, severity),
            expires: new Date(Date.now() + 24*60*60*1000).toISOString() // 24 hours
        };
        
        this.alerts.unshift(alert);
        this.notifySubscribers(alert);
        return alert;
    }
    
    generateAlertTitle(type, severity) {
        const titles = {
            cyclone: {
                low: 'Depression in Bay of Bengal',
                moderate: 'Cyclonic Storm Forming',
                high: 'Severe Cyclonic Storm Warning',
                extreme: 'Super Cyclone Alert!'
            },
            flood: {
                low: 'Heavy Rainfall Expected',
                moderate: 'Flood Warning Issued',
                high: 'Severe Flood Alert',
                extreme: 'Flash Flood Emergency!'
            },
            earthquake: {
                low: 'Minor Tremor Recorded',
                moderate: 'Moderate Earthquake',
                high: 'Strong Earthquake',
                extreme: 'Major Earthquake!'
            },
            fire: {
                low: 'Dry Conditions',
                moderate: 'Forest Fire Risk',
                high: 'Active Fire Reported',
                extreme: 'Wildfire Emergency!'
            },
            heatwave: {
                low: 'Above Normal Temperatures',
                moderate: 'Heatwave Conditions',
                high: 'Severe Heatwave',
                extreme: 'Extreme Heatwave Emergency!'
            }
        };
        
        return titles[type]?.[severity] || 'Weather Alert';
    }
    
    generateAffectedArea(type) {
        return {
            radius: Math.floor(Math.random() * 100) + 20 + ' km',
            population: Math.floor(Math.random() * 5000000) + 100000,
            villages: Math.floor(Math.random() * 200) + 20
        };
    }
    
    generateInstructions(type, severity) {
        const instructions = {
            cyclone: 'Move to cyclone shelters. Keep emergency kit ready. Stay indoors.',
            flood: 'Move to higher ground. Avoid flood waters. Turn off electricity.',
            earthquake: 'Drop, cover, hold on. Stay away from windows. Expect aftershocks.',
            fire: 'Evacuate immediately. Cover nose with wet cloth. Follow designated routes.',
            heatwave: 'Stay hydrated. Avoid sun exposure. Check on elderly neighbors.'
        };
        
        return instructions[type] || 'Follow local authority instructions.';
    }
    
    getActiveAlerts(severity = null) {
        const now = new Date();
        let active = this.alerts.filter(alert => new Date(alert.expires) > now);
        
        if (severity) {
            active = active.filter(alert => alert.severity === severity);
        }
        
        return active.sort((a, b) => new Date(b.time) - new Date(a.time));
    }
    
    getAlertByLocation(location) {
        return this.alerts.filter(alert => 
            alert.location.toLowerCase().includes(location.toLowerCase())
        );
    }
    
    getSeverityColor(severity) {
        const colors = {
            low: '#27ae60',
            moderate: '#f39c12',
            high: '#e67e22',
            extreme: '#e74c3c'
        };
        return colors[severity] || '#95a5a6';
    }
    
    subscribe(callback) {
        this.subscribers.push(callback);
    }
    
    notifySubscribers(alert) {
        this.subscribers.forEach(callback => callback(alert));
    }
    
    getHistoricalAlerts(days = 30) {
        const cutoff = new Date(Date.now() - days*24*60*60*1000);
        return this.alerts.filter(alert => new Date(alert.time) > cutoff);
    }
    
    getStatistics() {
        const stats = {
            total: this.alerts.length,
            byType: {},
            bySeverity: {}
        };
        
        this.alerts.forEach(alert => {
            stats.byType[alert.type] = (stats.byType[alert.type] || 0) + 1;
            stats.bySeverity[alert.severity] = (stats.bySeverity[alert.severity] || 0) + 1;
        });
        
        return stats;
    }
    
    simulateDisaster(type, severity) {
        // Simulate a major disaster for training
        const alert = {
            id: Date.now(),
            type: type,
            severity: severity,
            title: `SIMULATION: ${type.toUpperCase()} DRILL`,
            location: 'Training Area',
            time: new Date().toISOString(),
            source: 'Disaster Management Training',
            affected: { radius: '50 km', population: 100000, villages: 50 },
            instructions: 'This is a simulation. Follow evacuation procedures.',
            expires: new Date(Date.now() + 2*60*60*1000).toISOString(),
            isSimulation: true
        };
        
        this.alerts.unshift(alert);
        return alert;
    }
}

// Initialize
const disasterAlerts = new DisasterAlerts();
window.disasterAlerts = disasterAlerts;