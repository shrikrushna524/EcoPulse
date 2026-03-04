// ===== REAL-TIME CARBON TRACKING MODULE =====
// Live carbon emission tracking and equivalents

class CarbonCounter {
    constructor() {
        this.currentCount = 1245789; // Starting value (tons)
        this.updateInterval = null;
        this.historicalData = this.loadHistoricalData();
        this.listeners = [];
        this.countries = this.loadCountryData();
    }

    loadHistoricalData() {
        // Global CO2 emissions data (million tons)
        return {
            '2020': 34800,
            '2021': 36300,
            '2022': 36800,
            '2023': 37400,
            '2024': 38100,
            '2025': 38700
        };
    }

    loadCountryData() {
        // Top emitting countries (million tons)
        return {
            'China': { emissions: 11500, perCapita: 8.2, renewable: 28 },
            'USA': { emissions: 5100, perCapita: 15.3, renewable: 20 },
            'India': { emissions: 2800, perCapita: 2.0, renewable: 38 },
            'Russia': { emissions: 1700, perCapita: 11.6, renewable: 18 },
            'Japan': { emissions: 1100, perCapita: 8.7, renewable: 22 },
            'Germany': { emissions: 700, perCapita: 8.4, renewable: 46 },
            'UK': { emissions: 400, perCapita: 5.9, renewable: 43 },
            'France': { emissions: 300, perCapita: 4.5, renewable: 51 }
        };
    }

    // Start real-time counter
    startCounter(initialValue = null) {
        if (initialValue !== null) {
            this.currentCount = initialValue;
        }

        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        this.updateInterval = setInterval(() => {
            // Increase based on estimated global emissions
            // Approximately 1000 tons per second globally
            this.currentCount += Math.floor(Math.random() * 10) + 5;
            this.notifyListeners();
        }, 1000);

        return this.currentCount;
    }

    // Stop counter
    stopCounter() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    // Get current count
    getCurrentCount() {
        return this.currentCount;
    }

    // Get formatted count
    getFormattedCount() {
        return this.currentCount.toLocaleString();
    }

    // Calculate equivalents
    getEquivalents() {
        const count = this.currentCount;
        
        return {
            trees: Math.round(count * 50), // 1 tree absorbs 50kg/year
            cars: Math.round(count / 4.6), // Average car emits 4.6 tons/year
            homes: Math.round(count / 7.5), // Average home emits 7.5 tons/year
            flights: Math.round(count / 0.4), // Delhi-Mumbai flight ~0.4 tons
            smartphones: Math.round(count * 20000), // 20,000 phones charged per ton
            coalPlants: (count / 3500000).toFixed(2), // 3.5M tons per coal plant/year
            footballFields: Math.round(count * 100), // 100 football fields of forest per ton
            oceans: (count / 2000000000).toFixed(8), // Oceans absorb 2B tons/year
            timeToAbsorb: this.getTimeToAbsorb(count)
        };
    }

    // Time for nature to absorb
    getTimeToAbsorb(tons) {
        // Forests absorb ~2.5 tons per hectare per year
        const hectares = tons / 2.5;
        return {
            forestHectares: Math.round(hectares),
            forestAcres: Math.round(hectares * 2.47),
            yearsForOneHectare: (tons / 2.5).toFixed(1)
        };
    }

    // Get reduction targets
    getReductionTargets() {
        const parisTarget = this.currentCount * 0.45; // 45% reduction by 2030
        const netZero2050 = this.currentCount * 0.9; // 90% reduction by 2050
        
        return {
            paris2030: {
                target: Math.round(parisTarget),
                reduction: '45%',
                yearsLeft: 5,
                dailyReductionNeeded: Math.round((this.currentCount - parisTarget) / (5 * 365))
            },
            netZero2050: {
                target: Math.round(netZero2050),
                reduction: '90%',
                yearsLeft: 25,
                dailyReductionNeeded: Math.round((this.currentCount - netZero2050) / (25 * 365))
            },
            perPerson: {
                global: (this.currentCount / 7800000000).toFixed(2), // 7.8B people
                india: 2.0,
                usa: 15.3,
                eu: 6.8
            }
        };
    }

    // Calculate personal contribution
    calculatePersonalFootprint(electricity, carMiles, flights, diet) {
        // Electricity (kg CO2 per kWh)
        const electricityEmissions = electricity * 0.85;
        
        // Car travel (kg CO2 per mile)
        const carEmissions = carMiles * 0.4;
        
        // Flights (kg CO2 per flight)
        const flightEmissions = flights * 400;
        
        // Diet (kg CO2 per year)
        const dietFactors = {
            'meatHeavy': 3000,
            'average': 2000,
            'vegetarian': 1500,
            'vegan': 1000
        };
        const dietEmissions = dietFactors[diet] || 2000;
        
        const total = (electricityEmissions + carEmissions + flightEmissions + dietEmissions) / 1000; // tons
        
        return {
            totalTons: total.toFixed(2),
            breakdown: {
                electricity: (electricityEmissions / 1000).toFixed(2),
                car: (carEmissions / 1000).toFixed(2),
                flights: (flightEmissions / 1000).toFixed(2),
                diet: (dietEmissions / 1000).toFixed(2)
            },
            treesNeeded: Math.round(total * 50),
            offsetCost: '₹' + Math.round(total * 1000).toLocaleString(), // ₹1000 per ton
            vsGlobalAvg: (total / 4.8 * 100).toFixed(1) + '%', // Global avg 4.8 tons
            vsIndiaAvg: (total / 2.0 * 100).toFixed(1) + '%'
        };
    }

    // Get daily statistics
    getDailyStats() {
        const dailyEmission = this.currentCount / 365;
        
        return {
            dailyTons: Math.round(dailyEmission),
            dailyPerPerson: (dailyEmission / 7800000000).toFixed(3),
            treesNeededDaily: Math.round(dailyEmission * 50),
            carsEquivalentDaily: Math.round(dailyEmission / 4.6),
            flightsEquivalentDaily: Math.round(dailyEmission / 0.4)
        };
    }

    // Get progress towards goals
    getProgress() {
        const historical = this.historicalData;
        const lastYear = historical['2024'];
        const change = ((this.currentCount / 1000 - lastYear) / lastYear) * 100;
        
        return {
            current: (this.currentCount / 1000).toFixed(1) + 'M tons',
            lastYear: lastYear + 'M tons',
            changePercent: change.toFixed(1) + '%',
            trend: change > 0 ? '↑ Increasing' : '↓ Decreasing',
            onTrack: change < 0 ? true : false
        };
    }

    // Add listener for updates
    addListener(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => {
            callback(this.currentCount, this.getEquivalents());
        });
    }

    // Reset counter
    resetCounter(value = 1245789) {
        this.currentCount = value;
        this.notifyListeners();
    }

    // Get data for charts
    getChartData() {
        const years = Object.keys(this.historicalData);
        const values = Object.values(this.historicalData);
        
        // Add current year projection
        years.push('2025');
        values.push(this.currentCount / 1000);
        
        return {
            labels: years,
            datasets: [{
                label: 'Global CO2 Emissions (Million Tons)',
                data: values,
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: '#4CAF50',
                borderWidth: 2
            }]
        };
    }

    // Get country comparison
    getCountryComparison() {
        const countries = [];
        for (const [country, data] of Object.entries(this.countries)) {
            countries.push({
                country: country,
                emissions: data.emissions,
                perCapita: data.perCapita,
                renewable: data.renewable,
                share: ((data.emissions / 38700) * 100).toFixed(1) + '%'
            });
        }
        
        return countries.sort((a, b) => b.emissions - a.emissions);
    }

    // Calculate offset projects
    getOffsetProjects() {
        return [
            {
                name: 'Tree Plantation in India',
                cost: '₹500 per ton',
                impact: '10 trees planted per ton',
                type: 'Nature-based',
                duration: '25 years'
            },
            {
                name: 'Solar Panel Installation',
                cost: '₹800 per ton',
                impact: '1kW solar per 2 tons',
                type: 'Renewable Energy',
                duration: 'Permanent'
            },
            {
                name: 'Wind Farm Investment',
                cost: '₹700 per ton',
                impact: '1kW wind per 1.5 tons',
                type: 'Renewable Energy',
                duration: 'Permanent'
            },
            {
                name: 'Methane Capture',
                cost: '₹600 per ton',
                impact: 'Prevents methane release',
                type: 'Industrial',
                duration: '10 years'
            },
            {
                name: 'Forest Conservation',
                cost: '₹400 per ton',
                impact: 'Protects existing forest',
                type: 'Nature-based',
                duration: 'Permanent'
            }
        ];
    }

    // Get future projections
    getProjections() {
        const current = this.currentCount / 1000;
        
        return {
            businessAsUsual: {
                2030: Math.round(current * 1.15),
                2040: Math.round(current * 1.3),
                2050: Math.round(current * 1.5)
            },
            parisAgreement: {
                2030: Math.round(current * 0.55),
                2040: Math.round(current * 0.35),
                2050: Math.round(current * 0.1)
            },
            netZero: {
                2030: Math.round(current * 0.7),
                2040: Math.round(current * 0.3),
                2050: 0
            }
        };
    }

    // Get daily tip for reduction
    getDailyReductionTip() {
        const tips = [
            {
                action: 'Switch to LED bulbs',
                reduction: '50 kg/year',
                cost: '₹500 investment'
            },
            {
                action: 'Use public transport',
                reduction: '500 kg/year',
                cost: '₹0-5000/year'
            },
            {
                action: 'Reduce meat consumption',
                reduction: '300 kg/year',
                cost: 'Savings on food'
            },
            {
                action: 'Install solar panels',
                reduction: '1500 kg/year',
                cost: '₹50,000 investment'
            },
            {
                action: 'Air dry clothes',
                reduction: '200 kg/year',
                cost: '₹0'
            },
            {
                action: 'Work from home',
                reduction: '400 kg/year',
                cost: '₹0'
            }
        ];
        
        return tips[Math.floor(Math.random() * tips.length)];
    }

    // Calculate city-wise emissions (Indian cities)
    getCityEmissions() {
        return {
            'Delhi': { perCapita: 2.8, total: 38000000, airQuality: 'Poor' },
            'Mumbai': { perCapita: 2.5, total: 32000000, airQuality: 'Moderate' },
            'Bangalore': { perCapita: 2.1, total: 18000000, airQuality: 'Good' },
            'Chennai': { perCapita: 2.2, total: 15000000, airQuality: 'Moderate' },
            'Kolkata': { perCapita: 2.0, total: 17000000, airQuality: 'Moderate' },
            'Pune': { perCapita: 2.3, total: 12000000, airQuality: 'Good' },
            'Ahmedabad': { perCapita: 2.4, total: 14000000, airQuality: 'Moderate' },
            'Hyderabad': { perCapita: 2.2, total: 16000000, airQuality: 'Good' }
        };
    }
}

// Initialize global counter
const carbonCounter = new CarbonCounter();
carbonCounter.startCounter();

// Export
window.CarbonCounter = CarbonCounter;
window.carbonCounter = carbonCounter;