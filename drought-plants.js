// ===== COMPLETE DROUGHT-RESISTANT PLANTS DATABASE =====
const droughtPlants = {
    succulents: [
        {
            name: 'Aloe Vera',
            scientific: 'Aloe barbadensis miller',
            family: 'Asphodelaceae',
            waterNeeds: 'Very Low (every 2-3 weeks)',
            sunNeeds: 'Full sun to partial shade',
            soilType: 'Sandy, well-draining',
            matureHeight: '60-90 cm',
            matureSpread: '60-90 cm',
            growthRate: 'Moderate',
            hardinessZone: '10-12',
            native: 'Arabian Peninsula',
            uses: ['Medicinal', 'Ornamental', 'Air purifying'],
            careInstructions: [
                'Water deeply but infrequently',
                'Allow soil to dry completely between watering',
                'Use cactus/succulent potting mix',
                'Protect from frost',
                'Remove dead leaves at base'
            ],
            benefits: [
                'Healing gel for burns and cuts',
                'Removes formaldehyde from air',
                'Very low maintenance',
                'Produces offsets for propagation'
            ],
            problems: [
                'Overwatering causes root rot',
                'Mealybugs in indoor plants',
                'Sunburn if moved suddenly to full sun'
            ],
            image: '🌵',
            season: 'Year-round'
        },
        {
            name: 'Snake Plant',
            scientific: 'Sansevieria trifasciata',
            family: 'Asparagaceae',
            waterNeeds: 'Very Low (every 3-4 weeks)',
            sunNeeds: 'Low to bright indirect',
            soilType: 'Well-draining',
            matureHeight: '60-120 cm',
            matureSpread: '30-60 cm',
            growthRate: 'Slow',
            hardinessZone: '9-11',
            native: 'West Africa',
            uses: ['Air purifying', 'Ornamental', 'Bedroom plant'],
            careInstructions: [
                'Water only when soil completely dry',
                'Tolerates neglect - can go months without water',
                'Use well-draining potting mix',
                'Keep in temperatures above 10°C',
                'Dust leaves occasionally'
            ],
            benefits: [
                'Converts CO2 to oxygen at night',
                'Removes toxins (benzene, formaldehyde)',
                'Almost impossible to kill',
                'Good for beginners'
            ],
            problems: [
                'Overwatering causes root rot',
                'Cold damage below 5°C',
                'Mealybugs in crowded plants'
            ],
            image: '🌿',
            season: 'Year-round'
        },
        {
            name: 'Jade Plant',
            scientific: 'Crassula ovata',
            family: 'Crassulaceae',
            waterNeeds: 'Low (every 2-3 weeks)',
            sunNeeds: 'Bright indirect to full sun',
            soilType: 'Well-draining, sandy',
            matureHeight: '100-150 cm',
            matureSpread: '60-90 cm',
            growthRate: 'Slow to moderate',
            hardinessZone: '10-11',
            native: 'South Africa',
            uses: ['Ornamental', 'Bonsai', 'Good luck plant'],
            careInstructions: [
                'Water when soil is dry to touch',
                'Reduce watering in winter',
                'Provide bright light for compact growth',
                'Prune to maintain shape',
                'Rotate pot for even growth'
            ],
            benefits: [
                'Symbol of good luck and prosperity',
                'Easy to propagate from leaves',
                'Long-lived (can live 50+ years)',
                'Can be shaped as bonsai'
            ],
            problems: [
                'Leggy growth in low light',
                'Mealybugs and scale',
                'Leaf drop if overwatered'
            ],
            image: '🪴',
            season: 'Year-round'
        }
    ],
    
    herbs: [
        {
            name: 'Lavender',
            scientific: 'Lavandula angustifolia',
            family: 'Lamiaceae',
            waterNeeds: 'Low (every 2 weeks)',
            sunNeeds: 'Full sun (6+ hours)',
            soilType: 'Well-draining, alkaline',
            matureHeight: '60-90 cm',
            matureSpread: '60-90 cm',
            growthRate: 'Moderate',
            hardinessZone: '5-9',
            native: 'Mediterranean',
            uses: ['Aromatherapy', 'Culinary', 'Ornamental'],
            careInstructions: [
                'Water deeply but infrequently',
                'Allow soil to dry between watering',
                'Prune after flowering',
                'Provide good air circulation',
                'Mulch with gravel to prevent moisture'
            ],
            benefits: [
                'Fragrant flowers and foliage',
                'Attracts bees and butterflies',
                'Drought tolerant once established',
                'Can be used in cooking and teas'
            ],
            problems: [
                'Root rot in wet soil',
                'Poor flowering in shade',
                'Spittlebugs in spring'
            ],
            image: '🌸',
            season: 'Spring-Fall'
        },
        {
            name: 'Rosemary',
            scientific: 'Rosmarinus officinalis',
            family: 'Lamiaceae',
            waterNeeds: 'Low (every 1-2 weeks)',
            sunNeeds: 'Full sun',
            soilType: 'Well-draining, sandy',
            matureHeight: '100-150 cm',
            matureSpread: '60-120 cm',
            growthRate: 'Moderate',
            hardinessZone: '8-10',
            native: 'Mediterranean',
            uses: ['Culinary', 'Ornamental', 'Aromatherapy'],
            careInstructions: [
                'Water when soil feels dry',
                'Tolerates drought once established',
                'Prune regularly for bushiness',
                'Protect from harsh winter winds',
                'Use in containers for cold climates'
            ],
            benefits: [
                'Year-round harvest of leaves',
                'Repels some garden pests',
                'Very aromatic',
                'Evergreen in warm climates'
            ],
            problems: [
                'Root rot in heavy soil',
                'Powdery mildew in humidity',
                'Spider mites indoors'
            ],
            image: '🌱',
            season: 'Year-round'
        },
        {
            name: 'Thyme',
            scientific: 'Thymus vulgaris',
            family: 'Lamiaceae',
            waterNeeds: 'Low (every 1-2 weeks)',
            sunNeeds: 'Full sun',
            soilType: 'Well-draining',
            matureHeight: '15-30 cm',
            matureSpread: '30-45 cm',
            growthRate: 'Slow to moderate',
            hardinessZone: '5-9',
            native: 'Mediterranean',
            uses: ['Culinary', 'Ground cover', 'Ornamental'],
            careInstructions: [
                'Water sparingly - drought tolerant',
                'Trim after flowering',
                'Divide every 2-3 years',
                'Provide good drainage',
                'Harvest before flowering for best flavor'
            ],
            benefits: [
                'Spreads as ground cover',
                'Attracts beneficial insects',
                'Many varieties available',
                'Evergreen in mild climates'
            ],
            problems: [
                'Root rot in wet soil',
                'Leggy growth in shade',
                'Aphids on new growth'
            ],
            image: '🌿',
            season: 'Spring-Fall'
        }
    ],
    
    nativePlants: [
        {
            name: 'Neem Tree',
            scientific: 'Azadirachta indica',
            family: 'Meliaceae',
            waterNeeds: 'Low (once established)',
            sunNeeds: 'Full sun',
            soilType: 'Wide range, well-draining',
            matureHeight: '15-20 meters',
            matureSpread: '10-15 meters',
            growthRate: 'Fast',
            hardinessZone: '10-12',
            native: 'Indian subcontinent',
            uses: ['Medicinal', 'Shade', 'Pesticide'],
            careInstructions: [
                'Water young trees regularly',
                'Established trees need little water',
                'Tolerates poor soil',
                'Prune to shape when young',
                'Protect from frost when small'
            ],
            benefits: [
                'Natural pesticide (neem oil)',
                'Medicinal properties',
                'Provides dense shade',
                'Air purifying'
            ],
            problems: [
                'Scale insects',
                'Mealybugs',
                'Cold sensitivity'
            ],
            image: '🌳',
            season: 'Year-round'
        },
        {
            name: 'Banyan Tree',
            scientific: 'Ficus benghalensis',
            family: 'Moraceae',
            waterNeeds: 'Low to moderate',
            sunNeeds: 'Full sun',
            soilType: 'Wide range',
            matureHeight: '20-25 meters',
            matureSpread: 'Very wide (100+ meters)',
            growthRate: 'Fast',
            hardinessZone: '10-12',
            native: 'Indian subcontinent',
            uses: ['Shade', 'Religious', 'Ornamental'],
            careInstructions: [
                'Water deeply but infrequently',
                'Tolerates drought once established',
                'Provide plenty of space',
                'Can be pruned to control size',
                'Protect from frost'
            ],
            benefits: [
                'Massive shade coverage',
                'Supports wildlife',
                'Air roots create unique structure',
                'Long-lived (centuries)'
            ],
            problems: [
                'Invasive roots',
                'Too large for small gardens',
                'Fig wasps for pollination'
            ],
            image: '🌳',
            season: 'Year-round'
        }
    ],
    
    flowers: [
        {
            name: 'Bougainvillea',
            scientific: 'Bougainvillea glabra',
            family: 'Nyctaginaceae',
            waterNeeds: 'Low (every 2 weeks)',
            sunNeeds: 'Full sun',
            soilType: 'Well-draining',
            matureHeight: '1-12 meters (climbing)',
            matureSpread: '1-3 meters',
            growthRate: 'Fast',
            hardinessZone: '9-11',
            native: 'South America',
            uses: ['Ornamental', 'Hedges', 'Containers'],
            careInstructions: [
                'Water deeply but rarely',
                'Fertilize in spring',
                'Prune after flowering',
                'Protect from frost',
                'Provide trellis for climbing'
            ],
            benefits: [
                'Vibrant colors (bracts)',
                'Thrives on neglect',
                'Fast growing',
                'Can be trained as hedge'
            ],
            problems: [
                'Frost sensitive',
                'Caterpillars',
                'Leaf spots in humidity'
            ],
            image: '🌸',
            season: 'Year-round in warm climates'
        },
        {
            name: 'Portulaca',
            scientific: 'Portulaca grandiflora',
            family: 'Portulacaceae',
            waterNeeds: 'Very Low',
            sunNeeds: 'Full sun',
            soilType: 'Poor, sandy',
            matureHeight: '10-20 cm',
            matureSpread: '30-45 cm',
            growthRate: 'Fast',
            hardinessZone: '5-11',
            native: 'South America',
            uses: ['Ground cover', 'Containers', 'Rock gardens'],
            careInstructions: [
                'Water sparingly',
                'Deadhead to encourage blooms',
                'Self-seeds easily',
                'Grows in poorest soil',
                'Perfect for hanging baskets'
            ],
            benefits: [
                'Continuous summer color',
                'Thrives in heat and drought',
                'Low maintenance',
                'Comes in many colors'
            ],
            problems: [
                'Aphids occasionally',
                'Rot in wet soil',
                'Not frost tolerant'
            ],
            image: '🌼',
            season: 'Summer'
        }
    ],
    
    trees: [
        {
            name: 'Gulmohar',
            scientific: 'Delonix regia',
            family: 'Fabaceae',
            waterNeeds: 'Low (once established)',
            sunNeeds: 'Full sun',
            soilType: 'Well-draining',
            matureHeight: '10-15 meters',
            matureSpread: '15-20 meters',
            growthRate: 'Fast',
            hardinessZone: '10-12',
            native: 'Madagascar',
            uses: ['Ornamental', 'Shade'],
            careInstructions: [
                'Water young trees regularly',
                'Established trees drought tolerant',
                'Prune to shape when young',
                'Fertilize in spring',
                'Provide space for spreading canopy'
            ],
            benefits: [
                'Spectacular red flowers',
                'Provides light shade',
                'Fast growing',
                'Attracts birds'
            ],
            problems: [
                'Messy seed pods',
                'Brittle wood',
                'Frost sensitive'
            ],
            image: '🌳',
            season: 'Summer flowering'
        },
        {
            name: 'Palm Trees',
            scientific: 'Various species',
            family: 'Arecaceae',
            waterNeeds: 'Low to moderate',
            sunNeeds: 'Full sun',
            soilType: 'Well-draining',
            matureHeight: '5-30 meters (species dependent)',
            matureSpread: '3-10 meters',
            growthRate: 'Slow to moderate',
            hardinessZone: '10-11',
            native: 'Tropical regions',
            uses: ['Ornamental', 'Shade', 'Tropical look'],
            careInstructions: [
                'Water deeply but infrequently',
                'Remove old fronds',
                'Fertilize with palm-specific fertilizer',
                'Protect from cold winds',
                'Mulch around base'
            ],
            benefits: [
                'Tropical appearance',
                'Wind resistant',
                'Low maintenance',
                'Many varieties available'
            ],
            problems: [
                'Nutrient deficiencies',
                'Scale insects',
                'Cold sensitivity'
            ],
            image: '🌴',
            season: 'Year-round'
        }
    ]
};

// Search function
function searchPlants(query) {
    const results = [];
    query = query.toLowerCase();
    
    for (const category in droughtPlants) {
        droughtPlants[category].forEach(plant => {
            if (plant.name.toLowerCase().includes(query) ||
                plant.scientific.toLowerCase().includes(query) ||
                plant.family.toLowerCase().includes(query)) {
                results.push({...plant, category});
            }
        });
    }
    
    return results;
}

// Filter by water needs
function filterByWaterNeed(waterNeed) {
    const results = [];
    
    for (const category in droughtPlants) {
        droughtPlants[category].forEach(plant => {
            if (plant.waterNeeds.toLowerCase().includes(waterNeed.toLowerCase())) {
                results.push({...plant, category});
            }
        });
    }
    
    return results;
}

// Get plants by zone
function getPlantsByZone(zone) {
    const results = [];
    
    for (const category in droughtPlants) {
        droughtPlants[category].forEach(plant => {
            const zones = plant.hardinessZone.split('-').map(Number);
            if (zone >= zones[0] && zone <= zones[1]) {
                results.push({...plant, category});
            }
        });
    }
    
    return results;
}

// Get plant care guide
function getPlantCareGuide(plantName) {
    for (const category in droughtPlants) {
        const plant = droughtPlants[category].find(p => 
            p.name.toLowerCase() === plantName.toLowerCase()
        );
        if (plant) {
            return {
                name: plant.name,
                waterSchedule: plant.waterNeeds,
                lightNeeds: plant.sunNeeds,
                soil: plant.soilType,
                steps: plant.careInstructions,
                problems: plant.problems
            };
        }
    }
    return null;
}

// Export
window.droughtPlants = droughtPlants;
window.searchPlants = searchPlants;
window.filterByWaterNeed = filterByWaterNeed;
window.getPlantsByZone = getPlantsByZone;
window.getPlantCareGuide = getPlantCareGuide;