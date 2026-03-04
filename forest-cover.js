// ===== COMPLETE FOREST COVER CHANGE MODULE =====
class ForestCover {
    constructor() {
        this.regions = this.loadRegions();
        this.historicalData = this.loadHistoricalData();
    }
    
    loadRegions() {
        return [
            { id: 1, name: 'Amazon Rainforest', country: 'Brazil', area: 5500000, loss: 17, gain: 5, primary: 80 },
            { id: 2, name: 'Congo Basin', country: 'DR Congo', area: 2000000, loss: 8, gain: 3, primary: 85 },
            { id: 3, name: 'Borneo', country: 'Indonesia', area: 740000, loss: 30, gain: 4, primary: 50 },
            { id: 4, name: 'Sundarbans', country: 'Bangladesh/India', area: 10000, loss: 12, gain: 2, primary: 70 },
            { id: 5, name: 'Western Ghats', country: 'India', area: 160000, loss: 25, gain: 8, primary: 60 },
            { id: 6, name: 'Sumatra', country: 'Indonesia', area: 480000, loss: 40, gain: 3, primary: 40 }
        ];
    }
    
    loadHistoricalData() {
        return {
            amazon: [
                { year: 2000, cover: 5400000 },
                { year: 2005, cover: 5300000 },
                { year: 2010, cover: 5200000 },
                { year: 2015, cover: 5100000 },
                { year: 2020, cover: 5000000 },
                { year: 2024, cover: 4950000 }
            ],
            borneo: [
                { year: 2000, cover: 800000 },
                { year: 2005, cover: 720000 },
                { year: 2010, cover: 650000 },
                { year: 2015, cover: 580000 },
                { year: 2020, cover: 520000 },
                { year: 2024, cover: 500000 }
            ]
        };
    }
    
    getCoverChange(region, startYear, endYear) {
        const data = this.historicalData[region.toLowerCase()];
        if (!data) return null;
        
        const start = data.find(d => d.year === startYear);
        const end = data.find(d => d.year === endYear);
        
        if (!start || !end) return null;
        
        const change = ((end.cover - start.cover) / start.cover) * 100;
        
        return {
            startYear: startYear,
            endYear: endYear,
            startCover: start.cover,
            endCover: end.cover,
            change: change.toFixed(1),
            loss: Math.abs(start.cover - end.cover)
        };
    }
    
    getDeforestationRate(region) {
        const rates = {
            'Amazon': 0.5, // % per year
            'Borneo': 1.2,
            'Congo': 0.3,
            'Sumatra': 1.5
        };
        
        return rates[region] || 0.5;
    }
    
    getReforestationPotential(region) {
        return {
            degraded: this.regions.find(r => r.name.includes(region))?.loss || 0,
            potential: Math.floor(Math.random() * 1000000) + 500000,
            suitable: Math.random() > 0.5,
            costPerHectare: 50000, // ₹
            carbonSequestration: 150 // tons/hectare
        };
    }
    
    calculateCarbonStock(area, forestType = 'tropical') {
        const carbonDensity = {
            'tropical': 200, // tons/hectare
            'temperate': 120,
            'boreal': 60,
            'mangrove': 250
        };
        
        const density = carbonDensity[forestType] || 150;
        const totalCarbon = area * density;
        
        return {
            carbonTons: totalCarbon,
            co2Equivalent: totalCarbon * 3.67, // CO2 = Carbon * 3.67
            carsRemoved: Math.round(totalCarbon * 3.67 / 4.6), // 1 car emits 4.6 tons CO2/year
            treesEquivalent: totalCarbon * 50 // 1 tree absorbs 21kg CO2/year
        };
    }
    
    getYearlyLoss(region) {
        const rate = this.getDeforestationRate(region);
        const regionData = this.regions.find(r => r.name.includes(region));
        
        if (!regionData) return null;
        
        const yearlyLoss = regionData.area * (rate / 100);
        
        return {
            rate: rate + '%',
            area: Math.round(yearlyLoss) + ' km²',
            footballFields: Math.round(yearlyLoss * 140), // 1 km² = 140 football fields
            trees: Math.round(yearlyLoss * 1000) // 1000 trees per hectare
        };
    }
    
    getProtectedAreas(region) {
        const protectedData = {
            'Amazon': ['National Parks', 'Indigenous Reserves', 'Biological Reserves'],
            'Congo': ['Salonga National Park', 'Okapi Reserve'],
            'Borneo': ['Danum Valley', 'Kinabalu Park'],
            'India': ['Jim Corbett', 'Kaziranga', 'Sunderbans']
        };
        
        return protectedData[region] || [];
    }
}

// Initialize
const forestCover = new ForestCover();
window.forestCover = forestCover;