// ===== COMPLETE EV MODELS DATABASE MODULE =====
class EVModelsDatabase {
    constructor() {
        this.models = this.loadModels();
        this.brands = this.loadBrands();
        this.categories = ['Budget', 'Mid-Range', 'Premium', 'Luxury'];
    }
    
    loadModels() {
        return [
            // Budget EVs (under ₹20L)
            {
                id: 1,
                brand: 'Tata',
                model: 'Tata Nexon EV',
                price: 15.5,
                range: 312,
                battery: 30,
                chargeTime: 60,
                acceleration: 9.0,
                topSpeed: 150,
                power: 127,
                torque: 245,
                efficiency: 9.6,
                weight: 1400,
                seats: 5,
                type: 'SUV',
                category: 'budget',
                available: true,
                features: ['Fast Charging', 'Regen Braking', 'Connected Car'],
                colors: ['White', 'Blue', 'Red']
            },
            {
                id: 2,
                brand: 'Tata',
                model: 'Tata Tiago EV',
                price: 8.5,
                range: 250,
                battery: 19,
                chargeTime: 65,
                acceleration: 11.5,
                topSpeed: 130,
                power: 73,
                torque: 170,
                efficiency: 7.6,
                weight: 1150,
                seats: 4,
                type: 'Hatchback',
                category: 'budget',
                available: true,
                features: ['Fast Charging', 'Ziptron Tech'],
                colors: ['White', 'Silver', 'Red']
            },
            {
                id: 3,
                brand: 'MG',
                model: 'MG Comet',
                price: 8.0,
                range: 230,
                battery: 17,
                chargeTime: 90,
                acceleration: 12.0,
                topSpeed: 100,
                power: 41,
                torque: 110,
                efficiency: 7.4,
                weight: 900,
                seats: 2,
                type: 'Micro',
                category: 'budget',
                available: true,
                features: ['Compact', 'Tech-Loaded'],
                colors: ['Yellow', 'Green', 'White']
            },
            {
                id: 4,
                brand: 'Citroen',
                model: 'Citroen eC3',
                price: 12.0,
                range: 320,
                battery: 29,
                chargeTime: 55,
                acceleration: 10.5,
                topSpeed: 140,
                power: 56,
                torque: 143,
                efficiency: 9.1,
                weight: 1250,
                seats: 5,
                type: 'Hatchback',
                category: 'budget',
                available: true,
                features: ['French Design', 'Connected'],
                colors: ['White', 'Blue', 'Orange']
            },
            
            // Mid-Range EVs (₹20-40L)
            {
                id: 5,
                brand: 'MG',
                model: 'MG ZS EV',
                price: 23.5,
                range: 461,
                battery: 50,
                chargeTime: 50,
                acceleration: 8.5,
                topSpeed: 175,
                power: 174,
                torque: 353,
                efficiency: 10.8,
                weight: 1620,
                seats: 5,
                type: 'SUV',
                category: 'mid',
                available: true,
                features: ['Panoramic Sunroof', 'Connected Car', 'Level 2 ADAS'],
                colors: ['White', 'Black', 'Silver']
            },
            {
                id: 6,
                brand: 'Hyundai',
                model: 'Hyundai Kona',
                price: 24.0,
                range: 452,
                battery: 39,
                chargeTime: 57,
                acceleration: 7.9,
                topSpeed: 167,
                power: 134,
                torque: 395,
                efficiency: 8.6,
                weight: 1535,
                seats: 5,
                type: 'SUV',
                category: 'mid',
                available: true,
                features: ['Ventilated Seats', 'Sunroof', 'Wireless Charging'],
                colors: ['White', 'Red', 'Blue']
            },
            {
                id: 7,
                brand: 'BYD',
                model: 'BYD Atto 3',
                price: 34.0,
                range: 521,
                battery: 60,
                chargeTime: 45,
                acceleration: 7.3,
                topSpeed: 160,
                power: 201,
                torque: 310,
                efficiency: 11.5,
                weight: 1750,
                seats: 5,
                type: 'SUV',
                category: 'mid',
                available: true,
                features: ['Rotating Screen', 'Blade Battery', 'V2L'],
                colors: ['White', 'Blue', 'Grey']
            },
            
            // Premium EVs (₹40-70L)
            {
                id: 8,
                brand: 'Kia',
                model: 'Kia EV6',
                price: 65.0,
                range: 708,
                battery: 77,
                chargeTime: 18,
                acceleration: 5.2,
                topSpeed: 185,
                power: 320,
                torque: 605,
                efficiency: 10.9,
                weight: 1900,
                seats: 5,
                type: 'SUV',
                category: 'premium',
                available: true,
                features: ['800V Architecture', 'Ultra Fast Charging', 'AR HUD'],
                colors: ['White', 'Black', 'Red']
            },
            {
                id: 9,
                brand: 'Hyundai',
                model: 'Hyundai Ioniq 5',
                price: 45.0,
                range: 631,
                battery: 72,
                chargeTime: 18,
                acceleration: 5.1,
                topSpeed: 185,
                power: 302,
                torque: 605,
                efficiency: 11.4,
                weight: 1850,
                seats: 5,
                type: 'SUV',
                category: 'premium',
                available: true,
                features: ['V2L', 'Parametric Pixels', 'Ultra Fast Charging'],
                colors: ['White', 'Silver', 'Green']
            },
            {
                id: 10,
                brand: 'BMW',
                model: 'BMW i4',
                price: 72.0,
                range: 590,
                battery: 80,
                chargeTime: 30,
                acceleration: 5.7,
                topSpeed: 190,
                power: 335,
                torque: 430,
                efficiency: 13.6,
                weight: 1800,
                seats: 5,
                type: 'Sedan',
                category: 'premium',
                available: true,
                features: ['Curved Display', 'M Sport', 'Laser Lights'],
                colors: ['White', 'Blue', 'Black']
            },
            
            // Luxury EVs (₹70L+)
            {
                id: 11,
                brand: 'Mercedes',
                model: 'Mercedes EQS',
                price: 150,
                range: 857,
                battery: 108,
                chargeTime: 31,
                acceleration: 4.3,
                topSpeed: 210,
                power: 516,
                torque: 828,
                efficiency: 12.6,
                weight: 2200,
                seats: 5,
                type: 'Sedan',
                category: 'luxury',
                available: true,
                features: ['Hyperscreen', 'Air Suspension', 'Rear Seat Entertainment'],
                colors: ['White', 'Black', 'Silver']
            },
            {
                id: 12,
                brand: 'Tesla',
                model: 'Tesla Model 3',
                price: 58.0,
                range: 629,
                battery: 75,
                chargeTime: 25,
                acceleration: 4.4,
                topSpeed: 233,
                power: 450,
                torque: 639,
                efficiency: 11.9,
                weight: 1800,
                seats: 5,
                type: 'Sedan',
                category: 'premium',
                available: true,
                features: ['Autopilot', 'Minimalist Design', 'Supercharger Network'],
                colors: ['White', 'Red', 'Blue']
            },
            {
                id: 13,
                brand: 'Tesla',
                model: 'Tesla Model Y',
                price: 68.0,
                range: 676,
                battery: 75,
                chargeTime: 27,
                acceleration: 3.7,
                topSpeed: 241,
                power: 480,
                torque: 660,
                efficiency: 11.1,
                weight: 1900,
                seats: 7,
                type: 'SUV',
                category: 'premium',
                available: true,
                features: ['Autopilot', '7-Seater', 'Panoramic Roof'],
                colors: ['White', 'Red', 'Blue']
            },
            {
                id: 14,
                brand: 'Porsche',
                model: 'Porsche Taycan',
                price: 180,
                range: 484,
                battery: 93,
                chargeTime: 22,
                acceleration: 2.8,
                topSpeed: 260,
                power: 750,
                torque: 1050,
                efficiency: 19.2,
                weight: 2100,
                seats: 4,
                type: 'Sedan',
                category: 'luxury',
                available: true,
                features: ['800V Architecture', 'Launch Control', 'Adaptive Suspension'],
                colors: ['White', 'Red', 'Blue']
            }
        ];
    }
    
    loadBrands() {
        return ['Tata', 'MG', 'Hyundai', 'BYD', 'Kia', 'BMW', 'Mercedes', 'Tesla', 'Porsche', 'Citroen'];
    }
    
    getModels(filters = {}) {
        let filtered = [...this.models];
        
        if (filters.brand) {
            filtered = filtered.filter(m => m.brand.toLowerCase() === filters.brand.toLowerCase());
        }
        
        if (filters.category) {
            filtered = filtered.filter(m => m.category === filters.category);
        }
        
        if (filters.type) {
            filtered = filtered.filter(m => m.type === filters.type);
        }
        
        if (filters.minRange) {
            filtered = filtered.filter(m => m.range >= filters.minRange);
        }
        
        if (filters.maxPrice) {
            filtered = filtered.filter(m => m.price <= filters.maxPrice);
        }
        
        if (filters.minSeats) {
            filtered = filtered.filter(m => m.seats >= filters.minSeats);
        }
        
        return filtered;
    }
    
    getModelById(id) {
        return this.models.find(m => m.id === id);
    }
    
    getModelByName(name) {
        return this.models.find(m => m.model.toLowerCase().includes(name.toLowerCase()));
    }
    
    compareModels(modelIds) {
        const models = modelIds.map(id => this.getModelById(id)).filter(m => m);
        
        if (models.length === 0) return null;
        
        const comparison = {
            models: models,
            bestRange: models.reduce((best, m) => m.range > best.range ? m : best, models[0]),
            bestPrice: models.reduce((best, m) => m.price < best.price ? m : best, models[0]),
            bestAcceleration: models.reduce((best, m) => m.acceleration < best.acceleration ? m : best, models[0]),
            fastestCharging: models.reduce((best, m) => m.chargeTime < best.chargeTime ? m : best, models[0])
        };
        
        return comparison;
    }
    
    getStatistics() {
        return {
            total: this.models.length,
            byBrand: this.getCountByBrand(),
            byCategory: this.getCountByCategory(),
            byType: this.getCountByType(),
            averageRange: Math.round(this.models.reduce((sum, m) => sum + m.range, 0) / this.models.length),
            averagePrice: Math.round(this.models.reduce((sum, m) => sum + m.price, 0) / this.models.length),
            cheapest: this.models.reduce((min, m) => m.price < min.price ? m : min, this.models[0]),
            mostExpensive: this.models.reduce((max, m) => m.price > max.price ? m : max, this.models[0]),
            longestRange: this.models.reduce((max, m) => m.range > max.range ? m : max, this.models[0])
        };
    }
    
    getCountByBrand() {
        const counts = {};
        this.models.forEach(m => {
            counts[m.brand] = (counts[m.brand] || 0) + 1;
        });
        return counts;
    }
    
    getCountByCategory() {
        const counts = {};
        this.models.forEach(m => {
            counts[m.category] = (counts[m.category] || 0) + 1;
        });
        return counts;
    }
    
    getCountByType() {
        const counts = {};
        this.models.forEach(m => {
            counts[m.type] = (counts[m.type] || 0) + 1;
        });
        return counts;
    }
    
    searchModels(query) {
        query = query.toLowerCase();
        return this.models.filter(m => 
            m.model.toLowerCase().includes(query) ||
            m.brand.toLowerCase().includes(query) ||
            m.type.toLowerCase().includes(query)
        );
    }
    
    getRecommendations(budget, range, seats, usage) {
        let filtered = this.models.filter(m => m.price <= budget && m.range >= range && m.seats >= seats);
        
        if (usage === 'city') {
            filtered = filtered.sort((a, b) => a.battery - b.battery); // Smaller battery for city
        } else if (usage === 'highway') {
            filtered = filtered.sort((a, b) => b.range - a.range); // Longer range for highway
        } else if (usage === 'family') {
            filtered = filtered.sort((a, b) => b.seats - a.seats); // More seats for family
        }
        
        return filtered.slice(0, 5);
    }
    
    getUpcomingModels() {
        return [
            { model: 'Tata Curvv EV', expectedPrice: 20, expectedRange: 500, expectedLaunch: '2024' },
            { model: 'MG 4 EV', expectedPrice: 30, expectedRange: 450, expectedLaunch: '2024' },
            { model: 'Hyundai Ioniq 6', expectedPrice: 60, expectedRange: 600, expectedLaunch: '2024' },
            { model: 'Volvo EX90', expectedPrice: 100, expectedRange: 600, expectedLaunch: '2025' }
        ];
    }
}

// Initialize
const evModelsDatabase = new EVModelsDatabase();
window.evModelsDatabase = evModelsDatabase;