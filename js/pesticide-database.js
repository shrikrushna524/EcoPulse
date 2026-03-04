// Complete pesticide database with real Indian products
const pesticideDatabase = {
    // Insecticides
    insecticides: [
        {
            name: "Imidacloprid 17.8% SL",
            type: "Chemical",
            category: "Insecticide",
            target: ["Aphids", "Jassids", "Whiteflies", "Thrips"],
            dose: "2ml per liter water",
            quantity: "200ml per acre",
            timing: "At pest appearance",
            price: "₹850/L",
            company: "Bayer CropScience",
            phi: "7 days", // Pre-harvest interval
            organic: false,
            hazardous: "Moderate",
            safety: "Wear gloves, mask",
            effectiveness: "95%"
        },
        {
            name: "Neem Oil 1500 ppm",
            type: "Organic",
            category: "Insecticide",
            target: ["Aphids", "Whiteflies", "Mites", "Caterpillars"],
            dose: "5ml per liter water",
            quantity: "2.5L per acre",
            timing: "Early morning or evening",
            price: "₹450/L",
            company: "Godrej Agrovet",
            phi: "0 days",
            organic: true,
            hazardous: "Low",
            safety: "Safe for beneficial insects",
            effectiveness: "85%"
        },
        {
            name: "Chlorpyriphos 20% EC",
            type: "Chemical",
            category: "Insecticide",
            target: ["Stem borer", "Root grubs", "Termites"],
            dose: "2.5ml per liter water",
            quantity: "1.5L per acre",
            timing: "Soil application or foliar spray",
            price: "₹550/L",
            company: "Coromandel",
            phi: "15 days",
            organic: false,
            hazardous: "High",
            safety: "Use protective gear",
            effectiveness: "92%"
        }
    ],
    
    // Fungicides
    fungicides: [
        {
            name: "Mancozeb 75% WP",
            type: "Chemical",
            category: "Fungicide",
            target: ["Early blight", "Downy mildew", "Leaf spot"],
            dose: "2g per liter water",
            quantity: "1kg per acre",
            timing: "At disease appearance",
            price: "₹380/kg",
            company: "Indofil",
            phi: "7 days",
            organic: false,
            hazardous: "Low",
            safety: "Avoid inhalation",
            effectiveness: "88%"
        },
        {
            name: "Trichoderma Viride",
            type: "Bio",
            category: "Fungicide",
            target: ["Root rot", "Wilts", "Damping off"],
            dose: "250g in 50kg FYM",
            quantity: "250g per acre",
            timing: "At sowing/transplanting",
            price: "₹300/250g",
            company: "T. Stanes",
            phi: "0 days",
            organic: true,
            hazardous: "None",
            safety: "Bio-control agent",
            effectiveness: "80%"
        },
        {
            name: "Hexaconazole 5% EC",
            type: "Chemical",
            category: "Fungicide",
            target: ["Powdery mildew", "Rust", "Sheath blight"],
            dose: "2ml per liter water",
            quantity: "400ml per acre",
            timing: "At disease initiation",
            price: "₹620/L",
            company: "Syngenta",
            phi: "10 days",
            organic: false,
            hazardous: "Moderate",
            safety: "Wear protective clothing",
            effectiveness: "90%"
        }
    ],
    
    // Herbicides
    herbicides: [
        {
            name: "Glyphosate 41% SL",
            type: "Chemical",
            category: "Herbicide",
            target: ["All weeds", "Broad spectrum"],
            dose: "10ml per liter water",
            quantity: "2.5L per acre",
            timing: "Before planting or post-emergence",
            price: "₹480/L",
            company: "Monsanto",
            phi: "3 days",
            organic: false,
            hazardous: "Moderate",
            safety: "Avoid drift to crops",
            effectiveness: "95%"
        },
        {
            name: "Pendimethalin 30% EC",
            type: "Chemical",
            category: "Herbicide",
            target: ["Grassy weeds", "Broadleaf weeds"],
            dose: "3.3ml per liter water",
            quantity: "1L per acre",
            timing: "Pre-emergence",
            price: "₹580/L",
            company: "BASF",
            phi: "60 days",
            organic: false,
            hazardous: "Low",
            safety: "Incorporate into soil",
            effectiveness: "85%"
        }
    ],
    
    // Bio-pesticides
    bioPesticides: [
        {
            name: "Bacillus thuringiensis",
            type: "Bio",
            category: "Biopesticide",
            target: ["Caterpillars", "Larvae", "Borers"],
            dose: "2g per liter water",
            quantity: "500g per acre",
            timing: "Early larval stage",
            price: "₹850/kg",
            company: "International Panaacea",
            phi: "0 days",
            organic: true,
            hazardous: "None",
            safety: "Safe for humans",
            effectiveness: "82%"
        },
        {
            name: "Beauveria bassiana",
            type: "Bio",
            category: "Biopesticide",
            target: ["Whiteflies", "Aphids", "Thrips"],
            dose: "5g per liter water",
            quantity: "1kg per acre",
            timing: "Evening application",
            price: "₹750/kg",
            company: "Agriland Biotech",
            phi: "0 days",
            organic: true,
            hazardous: "None",
            safety: "Fungal based",
            effectiveness: "78%"
        }
    ],
    
    // Growth Promoters
    growthPromoters: [
        {
            name: "Humic Acid 98%",
            type: "Organic",
            category: "Growth Promoter",
            target: ["Soil health", "Root growth"],
            dose: "2g per liter water",
            quantity: "1kg per acre",
            timing: "With irrigation",
            price: "₹350/kg",
            company: "Jaipur Bio Fertilizers",
            phi: "0 days",
            organic: true,
            hazardous: "None",
            safety: "Improves soil structure",
            effectiveness: "90%"
        },
        {
            name: "Seaweed Extract",
            type: "Organic",
            category: "Growth Promoter",
            target: ["Stress tolerance", "Flowering"],
            dose: "3ml per liter water",
            quantity: "750ml per acre",
            timing: "At critical stages",
            price: "₹650/L",
            company: "Coromandel",
            phi: "0 days",
            organic: true,
            hazardous: "None",
            safety: "Natural product",
            effectiveness: "85%"
        }
    ]
};

// Function to get recommendations based on crop and pest
function getPesticideRecommendations(crop, pest, stage) {
    const allProducts = [
        ...pesticideDatabase.insecticides,
        ...pesticideDatabase.fungicides,
        ...pesticideDatabase.bioPesticides
    ];
    
    return allProducts.filter(p => 
        p.target.some(t => t.toLowerCase().includes(pest.toLowerCase())) ||
        p.target.includes("General")
    );
}

// Export for use
window.pesticideDatabase = pesticideDatabase;
window.getPesticideRecommendations = getPesticideRecommendations;