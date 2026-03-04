// ===== COMPLETE EMERGENCY KIT MODULE =====
class EmergencyKit {
    constructor() {
        this.kitItems = this.loadKitItems();
        this.userKit = this.loadUserKit();
        this.categories = ['water', 'food', 'firstAid', 'tools', 'documents', 'clothing', 'special'];
    }
    
    loadKitItems() {
        return {
            water: [
                { id: 'w1', name: 'Water (3L per person/day)', quantity: '3-day supply', weight: '9kg', priority: 'essential' },
                { id: 'w2', name: 'Water purification tablets', quantity: '1 bottle', weight: '0.1kg', priority: 'high' },
                { id: 'w3', name: 'Collapsible water containers', quantity: '2', weight: '0.5kg', priority: 'medium' }
            ],
            food: [
                { id: 'f1', name: 'Non-perishable food', quantity: '3-day supply', weight: '3kg', priority: 'essential' },
                { id: 'f2', name: 'Energy bars', quantity: '10 bars', weight: '0.5kg', priority: 'high' },
                { id: 'f3', name: 'Canned food', quantity: '6 cans', weight: '2kg', priority: 'high' },
                { id: 'f4', name: 'Manual can opener', quantity: '1', weight: '0.2kg', priority: 'essential' },
                { id: 'f5', name: 'Disposable utensils', quantity: '10 sets', weight: '0.2kg', priority: 'low' }
            ],
            firstAid: [
                { id: 'fa1', name: 'First aid kit', quantity: '1 complete', weight: '1kg', priority: 'essential' },
                { id: 'fa2', name: 'Prescription medications', quantity: '2-week supply', weight: '0.5kg', priority: 'essential' },
                { id: 'fa3', name: 'Pain relievers', quantity: '2 packs', weight: '0.1kg', priority: 'high' },
                { id: 'fa4', name: 'Antiseptic wipes', quantity: '50', weight: '0.3kg', priority: 'high' },
                { id: 'fa5', name: 'Bandages (various sizes)', quantity: '1 box', weight: '0.2kg', priority: 'high' },
                { id: 'fa6', name: 'Medical gloves', quantity: '10 pairs', weight: '0.1kg', priority: 'medium' }
            ],
            tools: [
                { id: 't1', name: 'Flashlight', quantity: '2', weight: '0.5kg', priority: 'essential' },
                { id: 't2', name: 'Extra batteries', quantity: '4 packs', weight: '0.5kg', priority: 'essential' },
                { id: 't3', name: 'Battery-powered radio', quantity: '1', weight: '0.5kg', priority: 'essential' },
                { id: 't4', name: 'Multi-tool', quantity: '1', weight: '0.3kg', priority: 'high' },
                { id: 't5', name: 'Whistle', quantity: '2', weight: '0.1kg', priority: 'high' },
                { id: 't6', name: 'Dust masks', quantity: '10', weight: '0.2kg', priority: 'high' },
                { id: 't7', name: 'Duct tape', quantity: '2 rolls', weight: '0.5kg', priority: 'medium' },
                { id: 't8', name: 'Fire extinguisher', quantity: '1 small', weight: '2kg', priority: 'high' }
            ],
            documents: [
                { id: 'd1', name: 'ID proofs (Aadhar, Voter ID)', quantity: 'copies', weight: '0.1kg', priority: 'essential' },
                { id: 'd2', name: 'Insurance papers', quantity: 'copies', weight: '0.1kg', priority: 'essential' },
                { id: 'd3', name: 'Emergency contacts list', quantity: '2 copies', weight: '0.1kg', priority: 'essential' },
                { id: 'd4', name: 'Family photos', quantity: 'few', weight: '0.1kg', priority: 'low' },
                { id: 'd5', name: 'Cash (small denominations)', quantity: '₹5000', weight: '0.1kg', priority: 'high' }
            ],
            clothing: [
                { id: 'c1', name: 'Change of clothes', quantity: '2 sets', weight: '2kg', priority: 'medium' },
                { id: 'c2', name: 'Sturdy shoes', quantity: '1 pair', weight: '1kg', priority: 'high' },
                { id: 'c3', name: 'Rain gear', quantity: '1 set', weight: '0.5kg', priority: 'medium' },
                { id: 'c4', name: 'Warm blankets', quantity: '2', weight: '3kg', priority: 'high' },
                { id: 'c5', name: 'Thermal underwear', quantity: '2 sets', weight: '1kg', priority: 'low' }
            ],
            special: [
                { id: 's1', name: 'Baby supplies', quantity: 'as needed', weight: '2kg', priority: 'essential' },
                { id: 's2', name: 'Pet supplies', quantity: 'as needed', weight: '2kg', priority: 'medium' },
                { id: 's3', name: 'Elderly care items', quantity: 'as needed', weight: '1kg', priority: 'high' },
                { id: 's4', name: 'Sanitary supplies', quantity: '2-week supply', weight: '0.5kg', priority: 'high' },
                { id: 's5', name: 'Entertainment (cards, books)', quantity: 'few', weight: '0.5kg', priority: 'low' }
            ]
        };
    }
    
    loadUserKit() {
        return JSON.parse(localStorage.getItem('emergencyKit')) || {};
    }
    
    saveUserKit() {
        localStorage.setItem('emergencyKit', JSON.stringify(this.userKit));
    }
    
    getItemsByCategory(category) {
        return this.kitItems[category] || [];
    }
    
    getItemsByPriority(priority) {
        let items = [];
        for (const category in this.kitItems) {
            items = items.concat(this.kitItems[category].filter(item => item.priority === priority));
        }
        return items;
    }
    
    getTotalWeight() {
        let total = 0;
        for (const category in this.kitItems) {
            this.kitItems[category].forEach(item => {
                if (this.userKit[item.id]) {
                    total += parseFloat(item.weight) * this.userKit[item.id];
                }
            });
        }
        return total.toFixed(1);
    }
    
    getCompletionPercentage() {
        let total = 0;
        let completed = 0;
        
        for (const category in this.kitItems) {
            this.kitItems[category].forEach(item => {
                total++;
                if (this.userKit[item.id]) completed++;
            });
        }
        
        return Math.round((completed / total) * 100);
    }
    
    addItem(itemId, quantity = 1) {
        this.userKit[itemId] = quantity;
        this.saveUserKit();
    }
    
    removeItem(itemId) {
        delete this.userKit[itemId];
        this.saveUserKit();
    }
    
    updateQuantity(itemId, quantity) {
        if (quantity <= 0) {
            this.removeItem(itemId);
        } else {
            this.userKit[itemId] = quantity;
        }
        this.saveUserKit();
    }
    
    getKitForDisaster(type) {
        const recommendations = [];
        
        // Base kit for all disasters
        for (const category in this.kitItems) {
            this.kitItems[category].forEach(item => {
                if (item.priority === 'essential') {
                    recommendations.push(item);
                }
            });
        }
        
        // Disaster-specific additions
        const specific = {
            flood: ['Rubber boots', 'Life jacket', 'Waterproof bags'],
            earthquake: ['Hard hat', 'Crowbar', 'Work gloves'],
            fire: ['N95 masks', 'Fire blanket', 'Heat-resistant gloves'],
            cyclone: ['Tarps', 'Rope', 'Boarding materials']
        };
        
        return {
            base: recommendations,
            specific: specific[type] || [],
            totalWeight: this.calculateWeight(recommendations)
        };
    }
    
    calculateWeight(items) {
        return items.reduce((sum, item) => sum + parseFloat(item.weight || '0'), 0).toFixed(1);
    }
    
    getShoppingList() {
        const missing = [];
        
        for (const category in this.kitItems) {
            this.kitItems[category].forEach(item => {
                if (!this.userKit[item.id]) {
                    missing.push(item);
                }
            });
        }
        
        return missing.sort((a, b) => {
            const priority = { essential: 1, high: 2, medium: 3, low: 4 };
            return priority[a.priority] - priority[b.priority];
        });
    }
    
    getExpiryDates() {
        return {
            water: '6 months',
            food: '1 year',
            medications: 'Check dates',
            batteries: '2 years'
        };
    }
    
    getKitChecklist() {
        let checklist = '';
        for (const category in this.kitItems) {
            checklist += `\n${category.toUpperCase()}:\n`;
            this.kitItems[category].forEach(item => {
                const status = this.userKit[item.id] ? '✅' : '⬜';
                checklist += `${status} ${item.name} (${item.quantity})\n`;
            });
        }
        return checklist;
    }
    
    generatePDF() {
        const content = `
            EMERGENCY KIT CHECKLIST
            Generated: ${new Date().toLocaleString()}
            
            Overall Progress: ${this.getCompletionPercentage()}%
            Total Weight: ${this.getTotalWeight()}kg
            
            ${this.getKitChecklist()}
            
            EXPIRY NOTES:
            Water: Replace every 6 months
            Food: Check expiry dates
            Medications: Rotate regularly
            Batteries: Test every 3 months
        `;
        
        return content;
    }
}

// Initialize
const emergencyKit = new EmergencyKit();
window.emergencyKit = emergencyKit;