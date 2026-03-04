// ===== COMPLETE SEASONAL EATING GUIDE MODULE =====
class SeasonalEating {
    constructor() {
        this.seasons = this.loadSeasons();
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
        this.regions = ['North India', 'South India', 'East India', 'West India', 'Central India'];
    }
    
    loadSeasons() {
        return {
            'spring': {
                months: [2, 3, 4],
                foods: {
                    vegetables: ['Asparagus', 'Peas', 'Spinach', 'Lettuce', 'Radish', 'Spring onions'],
                    fruits: ['Strawberries', 'Mangoes', 'Lychee', 'Pineapple', 'Oranges'],
                    grains: ['Wheat', 'Barley', 'Millet'],
                    herbs: ['Mint', 'Coriander', 'Fenugreek']
                },
                benefits: ['Light and cleansing', 'Rich in vitamin C', 'Hydrating']
            },
            'summer': {
                months: [5, 6, 7],
                foods: {
                    vegetables: ['Cucumber', 'Bitter gourd', 'Bottle gourd', 'Okra', 'Pumpkin', 'Corn'],
                    fruits: ['Watermelon', 'Musk melon', 'Mangoes', 'Jackfruit', 'Plums', 'Jamun'],
                    grains: ['Rice', 'Millet', 'Corn'],
                    herbs: ['Mint', 'Coriander', 'Curry leaves']
                },
                benefits: ['Cooling', 'Hydrating', 'Rich in electrolytes']
            },
            'monsoon': {
                months: [7, 8, 9],
                foods: {
                    vegetables: ['Beans', 'Brinjal', 'Ridge gourd', 'Taro root', 'Yam'],
                    fruits: ['Pears', 'Peaches', 'Apples', 'Berries', 'Plums'],
                    grains: ['Rice', 'Millet', 'Buckwheat'],
                    herbs: ['Ginger', 'Turmeric', 'Garlic']
                },
                benefits: ['Immunity boosting', 'Warming', 'Digestive']
            },
            'autumn': {
                months: [9, 10, 11],
                foods: {
                    vegetables: ['Cauliflower', 'Cabbage', 'Carrots', 'Beetroot', 'Turnips'],
                    fruits: ['Apples', 'Pomegranate', 'Grapes', 'Pears', 'Quince'],
                    grains: ['Wheat', 'Barley', 'Millet'],
                    herbs: ['Sage', 'Rosemary', 'Thyme']
                },
                benefits: ['Nutrient dense', 'Rich in antioxidants', 'Gut healthy']
            },
            'winter': {
                months: [11, 0, 1],
                foods: {
                    vegetables: ['Spinach', 'Mustard greens', 'Fenugreek', 'Carrots', 'Peas', 'Radish'],
                    fruits: ['Oranges', 'Grapefruit', 'Dates', 'Guava', 'Custard apple'],
                    grains: ['Wheat', 'Corn', 'Millet'],
                    herbs: ['Ginger', 'Turmeric', 'Cinnamon', 'Clove']
                },
                benefits: ['Warming', 'Immunity boosting', 'Rich in vitamin C']
            }
        };
    }
    
    getFoodsForMonth(monthIndex) {
        for (const [season, data] of Object.entries(this.seasons)) {
            if (data.months.includes(monthIndex)) {
                return data.foods;
            }
        }
        return this.seasons.spring.foods;
    }
    
    getSeason(monthIndex) {
        for (const [season, data] of Object.entries(this.seasons)) {
            if (data.months.includes(monthIndex)) {
                return season;
            }
        }
        return 'spring';
    }
    
    getMealPlan(monthIndex) {
        const foods = this.getFoodsForMonth(monthIndex);
        
        return {
            breakfast: `Start with seasonal fruits like ${foods.fruits.slice(0, 3).join(', ')}`,
            lunch: `Include vegetables like ${foods.vegetables.slice(0, 3).join(', ')}`,
            dinner: `Light meal with ${foods.grains[0]} and seasonal vegetables`,
            snacks: `Fresh ${foods.fruits[2]} or roasted ${foods.grains[1]}`,
            herbs: `Season with ${foods.herbs.join(', ')}`
        };
    }
    
    getNutritionalAdvice(monthIndex) {
        const season = this.getSeason(monthIndex);
        const advice = {
            'spring': 'Focus on detoxifying foods, leafy greens, and light meals',
            'summer': 'Stay hydrated with water-rich fruits, avoid spicy foods',
            'monsoon': 'Eat light, warm foods; avoid raw vegetables',
            'autumn': 'Root vegetables and warming spices for immune health',
            'winter': 'Warming foods, healthy fats, and vitamin C rich fruits'
        };
        
        return advice[season] || advice.spring;
    }
    
    getLocalFoods(region, monthIndex) {
        const regional = {
            'North India': {
                'winter': ['Sarson ka saag', 'Makki di roti', 'Gajar ka halwa'],
                'summer': ['Mangoes', 'Lassi', 'Chole bhature']
            },
            'South India': {
                'winter': ['Sambar', 'Rasam', 'Avial'],
                'summer': ['Curd rice', 'Buttermilk', 'Mango pachadi']
            }
        };
        
        const season = this.getSeason(monthIndex);
        return regional[region]?.[season] || ['Seasonal local dishes'];
    }
    
    calculateEnvironmentalImpact(seasonalEating) {
        if (seasonalEating) {
            return {
                carbonFootprint: '-10%',
                waterUsage: '-15%',
                foodMiles: '-30%',
                pesticideExposure: '-25%'
            };
        } else {
            return {
                carbonFootprint: 'Baseline',
                waterUsage: 'Baseline',
                foodMiles: 'Baseline',
                pesticideExposure: 'Baseline'
            };
        }
    }
    
    getRecipeIdeas(monthIndex) {
        const foods = this.getFoodsForMonth(monthIndex);
        const primaryVegetable = foods.vegetables[0];
        const primaryFruit = foods.fruits[0];
        
        return [
            `${primaryVegetable} stir-fry with ${foods.herbs[0]}`,
            `${primaryFruit} smoothie bowl`,
            `${foods.grains[0]} pilaf with seasonal vegetables`,
            `Roasted ${foods.vegetables.slice(0, 2).join(' and ')}`
        ];
    }
}

// Initialize
const seasonalEating = new SeasonalEating();
window.seasonalEating = seasonalEating;