// ===== COMPLETE EV BATTERY RECYCLING MODULE =====
class EVRecycling {
    constructor() {
        this.recyclingCenters = this.loadRecyclingCenters();
        this.materials = this.loadMaterials();
        this.processSteps = this.loadProcessSteps();
    }
    
    loadRecyclingCenters() {
        return [
            {
                name: 'Li-Cycle India',
                location: 'Mumbai, Maharashtra',
                capacity: 5000, // tons/year
                materials: ['Lithium', 'Cobalt', 'Nickel'],
                recoveryRate: 95,
                established: 2020,
                contact: 'info@li-cycle.in',
                phone: '022-45678901'
            },
            {
                name: 'Attero Recycling',
                location: 'Noida, Uttar Pradesh',
                capacity: 4000,
                materials: ['Lithium', 'Cobalt', 'Manganese'],
                recoveryRate: 94,
                established: 2018,
                contact: 'info@attero.in',
                phone: '0120-4567890'
            },
            {
                name: 'TES-AMM',
                location: 'Bangalore, Karnataka',
                capacity: 3000,
                materials: ['All EV battery materials'],
                recoveryRate: 92,
                established: 2015,
                contact: 'info@tes-amm.com',
                phone: '080-45678901'
            },
            {
                name: 'Gravita India',
                location: 'Jaipur, Rajasthan',
                capacity: 2000,
                materials: ['Lead', 'Lithium'],
                recoveryRate: 90,
                established: 2017,
                contact: 'info@gravita.com',
                phone: '0141-4567890'
            },
            {
                name: 'E-Parisaraa',
                location: 'Bangalore, Karnataka',
                capacity: 1500,
                materials: ['Lithium', 'Cobalt'],
                recoveryRate: 88,
                established: 2019,
                contact: 'info@e-parisaraa.com',
                phone: '080-27631234'
            }
        ];
    }
    
    loadMaterials() {
        return [
            {
                name: 'Lithium',
                percentage: 7,
                value: 8500, // ₹ per kg
                recyclable: true,
                recoveryRate: 95,
                use: 'Cathode material',
                miningImpact: 'High water usage'
            },
            {
                name: 'Cobalt',
                percentage: 5,
                value: 25000,
                recyclable: true,
                recoveryRate: 95,
                use: 'Cathode stability',
                miningImpact: 'Conflict mineral concerns'
            },
            {
                name: 'Nickel',
                percentage: 10,
                value: 1200,
                recyclable: true,
                recoveryRate: 95,
                use: 'Energy density',
                miningImpact: 'Moderate'
            },
            {
                name: 'Manganese',
                percentage: 8,
                value: 800,
                recyclable: true,
                recoveryRate: 90,
                use: 'Cathode material',
                miningImpact: 'Low'
            },
            {
                name: 'Graphite',
                percentage: 15,
                value: 400,
                recyclable: true,
                recoveryRate: 85,
                use: 'Anode material',
                miningImpact: 'Moderate'
            },
            {
                name: 'Copper',
                percentage: 10,
                value: 600,
                recyclable: true,
                recoveryRate: 98,
                use: 'Current collectors',
                miningImpact: 'Moderate'
            },
            {
                name: 'Aluminum',
                percentage: 15,
                value: 200,
                recyclable: true,
                recoveryRate: 98,
                use: 'Casing, current collectors',
                miningImpact: 'High energy use'
            },
            {
                name: 'Steel',
                percentage: 20,
                value: 100,
                recyclable: true,
                recoveryRate: 98,
                use: 'Casing',
                miningImpact: 'High energy use'
            },
            {
                name: 'Plastics',
                percentage: 8,
                value: 50,
                recyclable: true,
                recoveryRate: 70,
                use: 'Separators, casing',
                miningImpact: 'Oil based'
            },
            {
                name: 'Electrolyte',
                percentage: 2,
                value: 500,
                recyclable: false,
                recoveryRate: 0,
                use: 'Ion transport',
                miningImpact: 'Toxic if leaked'
            }
        ];
    }
    
    loadProcessSteps() {
        return [
            {
                step: 1,
                name: 'Collection & Sorting',
                description: 'Batteries are collected from dealers, service centers, and scrap yards. They are sorted by chemistry type and condition.',
                duration: '1-2 days',
                equipment: ['Forklifts', 'Sorting lines', 'Safety gear']
            },
            {
                step: 2,
                name: 'Discharging',
                description: 'Batteries are completely discharged to eliminate electrical hazards during processing.',
                duration: '1-2 days',
                equipment: ['Discharge units', 'Resistors', 'Monitoring systems']
            },
            {
                step: 3,
                name: 'Dismantling',
                description: 'Manual or automated disassembly to separate casing, wiring, and modules.',
                duration: '2-3 days',
                equipment: ['Robotic arms', 'Conveyor belts', 'Hand tools']
            },
            {
                step: 4,
                name: 'Shredding & Separation',
                description: 'Cells are shredded and materials are separated using mechanical and chemical processes.',
                duration: '1 day',
                equipment: ['Shredders', 'Magnetic separators', 'Sieves']
            },
            {
                step: 5,
                name: 'Hydrometallurgy',
                description: 'Metals are dissolved in acids and recovered through precipitation or electrolysis.',
                duration: '3-4 days',
                equipment: ['Chemical reactors', 'Filters', 'Electrowinning cells']
            },
            {
                step: 6,
                name: 'Material Recovery',
                description: 'Recovered materials are purified and prepared for reuse in new batteries.',
                duration: '1-2 days',
                equipment: ['Furnaces', 'Refining equipment', 'Quality control']
            }
        ];
    }
    
    calculateRecyclingValue(batteryWeight, batteryType = 'NMC') {
        const composition = {
            'NMC': { lithium: 7, cobalt: 5, nickel: 10, manganese: 8, graphite: 15, copper: 10, aluminum: 15, steel: 20, plastics: 8, electrolyte: 2 },
            'LFP': { lithium: 5, cobalt: 0, nickel: 0, manganese: 0, graphite: 20, copper: 12, aluminum: 18, steel: 25, plastics: 8, electrolyte: 2 },
            'LCO': { lithium: 8, cobalt: 15, nickel: 0, manganese: 0, graphite: 12, copper: 10, aluminum: 15, steel: 20, plastics: 8, electrolyte: 2 }
        };
        
        const comp = composition[batteryType] || composition.NMC;
        let totalValue = 0;
        const breakdown = {};
        
        this.materials.forEach(material => {
            const percentage = comp[material.name.toLowerCase()] || 0;
            if (percentage > 0) {
                const weight = batteryWeight * percentage / 100;
                const recoveredWeight = weight * material.recoveryRate / 100;
                const value = recoveredWeight * material.value;
                totalValue += value;
                breakdown[material.name] = {
                    weight: weight,
                    recoveredWeight: recoveredWeight,
                    value: value
                };
            }
        });
        
        return {
            totalValue: Math.round(totalValue),
            breakdown: breakdown,
            co2Saved: Math.round(batteryWeight * 15), // kg CO2 saved vs mining
            energySaved: Math.round(batteryWeight * 200), // kWh saved
            treesEquivalent: Math.round(batteryWeight * 15 / 21)
        };
    }
    
    getSecondLifeApplications(batteryCapacity, healthPercentage) {
        const remainingCapacity = batteryCapacity * healthPercentage / 100;
        
        const applications = [
            {
                name: 'Home Solar Storage',
                capacity: 5,
                units: Math.floor(remainingCapacity / 5),
                lifespan: '5-8 years'
            },
            {
                name: 'Commercial Backup',
                capacity: 10,
                units: Math.floor(remainingCapacity / 10),
                lifespan: '4-6 years'
            },
            {
                name: 'Grid Stabilization',
                capacity: 50,
                units: Math.floor(remainingCapacity / 50),
                lifespan: '3-5 years'
            },
            {
                name: 'EV Charging Station Buffer',
                capacity: 30,
                units: Math.floor(remainingCapacity / 30),
                lifespan: '5-7 years'
            },
            {
                name: 'Street Light Backup',
                capacity: 2,
                units: Math.floor(remainingCapacity / 2),
                lifespan: '6-8 years'
            }
        ];
        
        return applications.filter(app => app.units > 0);
    }
    
    getEnvironmentalImpact(batteryWeight) {
        const miningImpact = {
            co2: batteryWeight * 20, // kg CO2 for mining
            water: batteryWeight * 100, // liters of water
            land: batteryWeight * 0.001 // hectares disturbed
        };
        
        const recyclingBenefit = {
            co2: batteryWeight * 15, // kg CO2 saved
            water: batteryWeight * 80, // liters saved
            land: batteryWeight * 0.0008 // hectares saved
        };
        
        return {
            mining: miningImpact,
            recycling: recyclingBenefit,
            netBenefit: {
                co2: miningImpact.co2 - recyclingBenefit.co2,
                water: miningImpact.water - recyclingBenefit.water,
                land: miningImpact.land - recyclingBenefit.land
            }
        };
    }
    
    findRecyclingCenter(location) {
        return this.recyclingCenters.filter(center => 
            center.location.toLowerCase().includes(location.toLowerCase())
        );
    }
    
    getRecyclingTimeline(batteryAge) {
        const timeline = [];
        
        if (batteryAge < 8) {
            timeline.push({
                stage: 'Current Use',
                duration: `${8 - batteryAge} years remaining`,
                action: 'Continue normal use'
            });
            timeline.push({
                stage: 'Second Life',
                duration: '5-8 years',
                action: 'Repurpose for stationary storage'
            });
            timeline.push({
                stage: 'Recycling',
                duration: '1-2 months',
                action: 'Material recovery'
            });
        } else if (batteryAge < 15) {
            timeline.push({
                stage: 'Second Life',
                duration: `${15 - batteryAge} years`,
                action: 'Ready for repurposing'
            });
            timeline.push({
                stage: 'Recycling',
                duration: '1-2 months',
                action: 'Plan for recycling'
            });
        } else {
            timeline.push({
                stage: 'Recycling',
                duration: 'Immediate',
                action: 'Take to recycling center'
            });
        }
        
        return timeline;
    }
    
    getRecyclingCertifications() {
        return [
            'ISO 14001 (Environmental Management)',
            'R2 (Responsible Recycling)',
            'e-Stewards Certification',
            'UL 1974 (EV Battery Recycling)',
            'BIS Standards for Battery Recycling'
        ];
    }
}

// Initialize
const evRecycling = new EVRecycling();
window.evRecycling = evRecycling;