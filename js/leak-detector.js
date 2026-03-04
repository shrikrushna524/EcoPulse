// ===== COMPLETE LEAK DETECTOR MODULE =====
class LeakDetector {
    constructor() {
        this.leakChecks = [
            {
                id: 'meter',
                name: 'Water Meter Check',
                description: 'Turn off all water, check if meter still moves',
                difficulty: 'Easy',
                timeNeeded: '10 mins',
                tools: ['Flashlight'],
                instructions: [
                    'Turn off all taps and water-using appliances',
                    'Locate your water meter (usually in front yard or basement)',
                    'Note the meter reading',
                    'Wait 30 minutes without using any water',
                    'Check if the meter reading changed'
                ],
                warning: 'A moving meter indicates a leak somewhere in your system'
            },
            {
                id: 'toilet',
                name: 'Toilet Leak Test',
                description: 'Check if your toilet is silently leaking',
                difficulty: 'Easy',
                timeNeeded: '15 mins',
                tools: ['Food coloring', 'Paper towel'],
                instructions: [
                    'Remove toilet tank lid',
                    'Add 10 drops of food coloring to tank water',
                    'Wait 15-20 minutes (don\'t flush)',
                    'Check toilet bowl for colored water',
                    'Also check around base with paper towel for moisture'
                ],
                warning: 'Colored water in bowl indicates a flapper leak'
            },
            {
                id: 'faucet',
                name: 'Faucet Drip Test',
                description: 'Check all faucets for drips',
                difficulty: 'Easy',
                timeNeeded: '5 mins',
                tools: ['Tissue paper'],
                instructions: [
                    'Wipe faucet spout dry',
                    'Place dry tissue under faucet',
                    'Wait 10 minutes',
                    'Check tissue for wet spots',
                    'Repeat for all faucets (kitchen, bathroom, outdoor)'
                ],
                warning: 'One drip per second wastes 3000L/year'
            },
            {
                id: 'shower',
                name: 'Showerhead Check',
                description: 'Check for drips and efficiency',
                difficulty: 'Easy',
                timeNeeded: '5 mins',
                tools: ['Plastic bag', 'Timer'],
                instructions: [
                    'Turn shower off completely',
                    'Watch showerhead for 2 minutes for drips',
                    'Place plastic bag over showerhead overnight',
                    'Check for water in bag in morning',
                    'Check for leaks at shower arm connection'
                ],
                warning: 'A leaking showerhead can waste 500L/month'
            },
            {
                id: 'pipes',
                name: 'Under Sink Pipes',
                description: 'Check all visible pipes for leaks',
                difficulty: 'Easy',
                timeNeeded: '10 mins',
                tools: ['Flashlight', 'Paper towel'],
                instructions: [
                    'Clear out under-sink cabinets',
                    'Use flashlight to inspect all pipe connections',
                    'Wipe pipes dry with paper towel',
                    'Check for moisture, drips, or corrosion',
                    'Feel pipes for any wetness'
                ],
                warning: 'Even small pipe leaks can cause major damage'
            },
            {
                id: 'outdoor',
                name: 'Outdoor Spigots',
                description: 'Check garden taps and hose connections',
                difficulty: 'Easy',
                timeNeeded: '10 mins',
                tools: ['Hose', 'Teflon tape'],
                instructions: [
                    'Turn on each outdoor tap slightly',
                    'Check for leaks at handle and spout',
                    'Attach hose and check connection',
                    'Turn water on fully with hose attached',
                    'Check for leaks along hose'
                ],
                warning: 'Outdoor leaks often go unnoticed for months'
            },
            {
                id: 'waterHeater',
                name: 'Water Heater Check',
                description: 'Inspect water heater for leaks',
                difficulty: 'Medium',
                timeNeeded: '15 mins',
                tools: ['Flashlight', 'Screwdriver'],
                instructions: [
                    'Check pressure relief valve for drips',
                    'Inspect all pipe connections',
                    'Look for rust or water stains around base',
                    'Check T&P valve discharge pipe',
                    'Feel insulation for wetness'
                ],
                warning: 'Water heater leaks can cause flooding'
            },
            {
                id: 'irrigation',
                name: 'Irrigation System',
                description: 'Check sprinklers and drip systems',
                difficulty: 'Medium',
                timeNeeded: '20 mins',
                tools: ['Screwdriver', 'Extra sprinkler heads'],
                instructions: [
                    'Run each zone manually',
                    'Check each sprinkler head for proper operation',
                    'Look for geysers or misting (indicates problems)',
                    'Check for broken or tilted heads',
                    'Inspect drip lines for punctures'
                ],
                warning: 'Broken sprinklers can waste 1000L/hour'
            }
        ];
        
        this.commonLeakLocations = [
            'Under kitchen sink',
            'Under bathroom sinks',
            'Behind washing machine',
            'Behind refrigerator (ice maker)',
            'Toilet base',
            'Water heater',
            'Outdoor faucets',
            'Irrigation valves',
            'Pool equipment',
            'Basement pipes'
        ];
    }
    
    getLeakChecks() {
        return this.leakChecks;
    }
    
    getCheckById(id) {
        return this.leakChecks.find(check => check.id === id);
    }
    
    calculateLeakCost(leakRate, duration, waterRate = 0.05) {
        // leakRate in L/day
        const totalLiters = leakRate * duration;
        const cost = totalLiters * waterRate;
        
        return {
            liters: totalLiters,
            cost: Math.round(cost),
            co2Impact: totalLiters * 0.0015 * 0.85, // kg CO2
            treesNeeded: Math.ceil(totalLiters * 0.0015 / 21)
        };
    }
    
    detectCommonLeaks(symptoms) {
        const possibleLeaks = [];
        
        if (symptoms.includes('high bill')) {
            possibleLeaks.push('Hidden leak (check meter)');
        }
        if (symptoms.includes('running water sound')) {
            possibleLeaks.push('Toilet flapper leak');
        }
        if (symptoms.includes('water stains')) {
            possibleLeaks.push('Pipe leak in wall/ceiling');
        }
        if (symptoms.includes('low pressure')) {
            possibleLeaks.push('Pipe leak or clog');
        }
        if (symptoms.includes('wet spots')) {
            possibleLeaks.push('Visible pipe leak');
        }
        if (symptoms.includes('mold smell')) {
            possibleLeaks.push('Hidden leak (wall/floor)');
        }
        
        return possibleLeaks;
    }
    
    getEmergencyShutdown() {
        return {
            steps: [
                'Locate main water shutoff valve',
                'Main valve usually near water meter',
                'Turn clockwise to shut off',
                'Open highest faucet to drain system',
                'Open lowest faucet to complete draining'
            ],
            locations: [
                'Basement or crawlspace',
                'Near water heater',
                'Outside near foundation',
                'Under kitchen sink (apartments)'
            ]
        };
    }
    
    getPlumberContacts(city) {
        const plumbers = {
            'Mumbai': ['24/7 Plumbing: 98765-43210', 'QuickFix: 98765-43211'],
            'Delhi': ['Delhi Plumbers: 98765-43212', 'Emergency Plumbing: 98765-43213'],
            'Bangalore': ['Bangalore Plumbing: 98765-43214', 'FixIt Fast: 98765-43215'],
            'Chennai': ['Chennai Plumbers: 98765-43216', 'WaterWorks: 98765-43217'],
            'default': ['Emergency Plumber: 1800-123-4567']
        };
        
        return plumbers[city] || plumbers.default;
    }
}

// Initialize
const leakDetector = new LeakDetector();
window.leakDetector = leakDetector;