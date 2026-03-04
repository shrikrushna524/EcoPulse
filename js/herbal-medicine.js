// ===== COMPLETE HERBAL MEDICINE DATABASE MODULE =====
class HerbalMedicine {
    constructor() {
        this.herbs = this.loadHerbs();
        this.categories = ['Digestive', 'Respiratory', 'Immune', 'Stress', 'Skin', 'Pain', 'Women\'s Health'];
    }
    
    loadHerbs() {
        return [
            // Digestive System
            { id: 1, name: 'Ginger', scientific: 'Zingiber officinale', category: 'digestive', image: '🫚', properties: ['Anti-inflammatory', 'Antiemetic', 'Antioxidant'], uses: ['Nausea', 'Motion sickness', 'Indigestion', 'Arthritis'], preparations: ['Fresh tea', 'Dried powder', 'Tincture', 'Capsules'], dosage: '1-2g dried root daily', contraindications: ['Gallstones', 'Blood thinners'], interactions: ['Warfarin', 'Aspirin'], pregnancy: 'Safe in food amounts', research: 'Multiple studies confirm anti-nausea effects' },
            
            { id: 2, name: 'Peppermint', scientific: 'Mentha piperita', category: 'digestive', image: '🌱', properties: ['Antispasmodic', 'Carminative', 'Analgesic'], uses: ['IBS', 'Bloating', 'Headaches', 'Nausea'], preparations: ['Tea', 'Essential oil', 'Enteric-coated capsules'], dosage: '1-2 cups tea daily', contraindications: ['GERD', 'Gallstones'], interactions: ['Cyclosporine'], pregnancy: 'Avoid medicinal amounts', research: 'Effective for IBS symptoms' },
            
            // Respiratory System
            { id: 3, name: 'Tulsi', scientific: 'Ocimum sanctum', category: 'respiratory', image: '🌿', properties: ['Adaptogen', 'Antibacterial', 'Antiviral', 'Immunomodulator'], uses: ['Cough', 'Cold', 'Asthma', 'Stress'], preparations: ['Fresh leaves', 'Tea', 'Tincture'], dosage: '2-3 fresh leaves daily', contraindications: ['Blood thinners'], interactions: ['Anticoagulants'], pregnancy: 'Safe', research: 'Sacred plant in Ayurveda' },
            
            { id: 4, name: 'Eucalyptus', scientific: 'Eucalyptus globulus', category: 'respiratory', image: '🌳', properties: ['Expectorant', 'Antimicrobial', 'Decongestant'], uses: ['Congestion', 'Cough', 'Sinusitis', 'Bronchitis'], preparations: ['Steam inhalation', 'Essential oil', 'Chest rub'], dosage: '2-3 drops in steam', contraindications: ['Epilepsy', 'High blood pressure'], interactions: ['Diabetes medications'], pregnancy: 'Avoid', research: 'Contains eucalyptol, effective for respiratory conditions' },
            
            // Immune System
            { id: 5, name: 'Turmeric', scientific: 'Curcuma longa', category: 'immune', image: '🟡', properties: ['Anti-inflammatory', 'Antioxidant', 'Antimicrobial'], uses: ['Inflammation', 'Joint pain', 'Immunity', 'Digestion'], preparations: ['Golden milk', 'Curry', 'Capsules'], dosage: '1-3g daily with black pepper', contraindications: ['Gallstones', 'Blood thinners'], interactions: ['Anticoagulants', 'NSAIDs'], pregnancy: 'Safe in food amounts', research: 'Curcumin is extensively studied' },
            
            { id: 6, name: 'Ashwagandha', scientific: 'Withania somnifera', category: 'immune', image: '🌿', properties: ['Adaptogen', 'Anti-inflammatory', 'Immunomodulator'], uses: ['Stress', 'Anxiety', 'Fatigue', 'Immunity'], preparations: ['Powder in milk', 'Capsules', 'Tincture'], dosage: '300-500mg extract daily', contraindications: ['Hyperthyroidism', 'Autoimmune diseases'], interactions: ['Thyroid medications', 'Immunosuppressants'], pregnancy: 'Avoid', research: 'Reduces cortisol by 25%' },
            
            // Stress & Sleep
            { id: 7, name: 'Chamomile', scientific: 'Matricaria chamomilla', category: 'stress', image: '🌼', properties: ['Mild sedative', 'Anti-inflammatory', 'Antispasmodic'], uses: ['Insomnia', 'Anxiety', 'Digestive spasms'], preparations: ['Tea', 'Essential oil', 'Tincture'], dosage: '1-2 cups tea before bed', contraindications: ['Ragweed allergy'], interactions: ['Sedatives', 'Blood thinners'], pregnancy: 'Safe in moderation', research: 'Improves sleep quality' },
            
            { id: 8, name: 'Lavender', scientific: 'Lavandula angustifolia', category: 'stress', image: '🌸', properties: ['Calming', 'Antidepressant', 'Antimicrobial'], uses: ['Anxiety', 'Sleep', 'Headache', 'Skin'], preparations: ['Essential oil', 'Tea', 'Sachets'], dosage: '2-3 drops in diffuser', contraindications: ['Skin sensitivity'], interactions: ['Sedatives'], pregnancy: 'Avoid medicinal amounts', research: 'Reduces anxiety in clinical trials' },
            
            // Skin Care
            { id: 9, name: 'Aloe Vera', scientific: 'Aloe barbadensis', category: 'skin', image: '🌵', properties: ['Wound healing', 'Moisturizing', 'Anti-inflammatory'], uses: ['Burns', 'Wounds', 'Dry skin', 'Acne'], preparations: ['Fresh gel', 'Juice', 'Cream'], dosage: 'Apply topically as needed', contraindications: ['Latex allergy'], interactions: ['May enhance steroid absorption'], pregnancy: 'Safe topically', research: 'Speeds wound healing' },
            
            { id: 10, name: 'Neem', scientific: 'Azadirachta indica', category: 'skin', image: '🌳', properties: ['Antibacterial', 'Antifungal', 'Antiviral'], uses: ['Acne', 'Eczema', 'Fungal infections', 'Dandruff'], preparations: ['Oil', 'Leaf paste', 'Soap'], dosage: 'Apply diluted oil', contraindications: ['Pregnancy', 'Autoimmune'], interactions: ['Immunosuppressants'], pregnancy: 'Avoid', research: 'Broad-spectrum antimicrobial' },
            
            // Pain Relief
            { id: 11, name: 'Willow Bark', scientific: 'Salix alba', category: 'pain', image: '🌳', properties: ['Analgesic', 'Anti-inflammatory', 'Antipyretic'], uses: ['Headache', 'Back pain', 'Arthritis', 'Fever'], preparations: ['Tea', 'Tincture', 'Capsules'], dosage: '120-240mg salicin daily', contraindications: ['Aspirin allergy', 'Children under 16'], interactions: ['Blood thinners', 'Methotrexate'], pregnancy: 'Avoid', research: 'Natural source of salicin' },
            
            { id: 12, name: 'Arnica', scientific: 'Arnica montana', category: 'pain', image: '🌸', properties: ['Anti-inflammatory', 'Analgesic', 'Antibacterial'], uses: ['Bruises', 'Muscle pain', 'Sprains', 'Swelling'], preparations: ['Gel', 'Cream', 'Oil'], dosage: 'Apply topically 3x daily', contraindications: ['Broken skin', 'Allergy to Asteraceae'], interactions: ['Blood thinners'], pregnancy: 'Avoid', research: 'Reduces bruising time' },
            
            // Women's Health
            { id: 13, name: 'Red Raspberry Leaf', scientific: 'Rubus idaeus', category: 'womens', image: '🍃', properties: ['Uterine tonic', 'Astringent', 'Nutrient-rich'], uses: ['Menstrual cramps', 'Pregnancy support', 'Menopause'], preparations: ['Tea', 'Tincture'], dosage: '1-2 cups tea daily', contraindications: ['None known'], interactions: ['None known'], pregnancy: 'Safe and beneficial', research: 'Rich in iron and calcium' },
            
            { id: 14, name: 'Shatavari', scientific: 'Asparagus racemosus', category: 'womens', image: '🌿', properties: ['Adaptogen', 'Galactagogue', 'Immunomodulator'], uses: ['Hormonal balance', 'Fertility', 'Lactation', 'Menopause'], preparations: ['Powder in milk', 'Capsules'], dosage: '1-2 tsp powder daily', contraindications: ['Estrogen-sensitive cancers'], interactions: ['Hormonal medications'], pregnancy: 'Safe', research: 'Ayurvedic rasayana for women' }
        ];
    }
    
    searchHerbs(query) {
        query = query.toLowerCase();
        return this.herbs.filter(h => 
            h.name.toLowerCase().includes(query) ||
            h.scientific.toLowerCase().includes(query) ||
            h.uses.some(u => u.toLowerCase().includes(query)) ||
            h.category.includes(query)
        );
    }
    
    getHerbsByCategory(category) {
        return this.herbs.filter(h => h.category === category);
    }
    
    getHerb(id) {
        return this.herbs.find(h => h.id === id);
    }
    
    getSafetyInfo(herbName) {
        const herb = this.herbs.find(h => 
            h.name.toLowerCase().includes(herbName.toLowerCase())
        );
        
        if (!herb) return null;
        
        return {
            contraindications: herb.contraindications,
            interactions: herb.interactions,
            pregnancy: herb.pregnancy,
            dosage: herb.dosage
        };
    }
    
    getDrugInteractions(medication) {
        // Check for known interactions
        const interactions = [];
        
        this.herbs.forEach(herb => {
            if (herb.interactions.some(i => i.toLowerCase().includes(medication.toLowerCase()))) {
                interactions.push({
                    herb: herb.name,
                    interaction: herb.interactions.find(i => i.toLowerCase().includes(medication.toLowerCase()))
                });
            }
        });
        
        return interactions;
    }
    
    getAyurvedicProperties(herbName) {
        const ayurvedic = {
            'Tulsi': { dosha: 'Vata, Kapha', taste: 'Pungent, Bitter', energy: 'Heating' },
            'Ashwagandha': { dosha: 'Vata, Kapha', taste: 'Bitter, Sweet', energy: 'Warming' },
            'Turmeric': { dosha: 'All', taste: 'Bitter, Pungent', energy: 'Heating' },
            'Ginger': { dosha: 'Vata, Kapha', taste: 'Pungent', energy: 'Heating' }
        };
        
        return ayurvedic[herbName] || null;
    }
    
    getEvidenceLevel(herbName) {
        const levels = {
            'Ginger': 'Strong - Multiple RCTs',
            'Turmeric': 'Strong - Extensive research',
            'Peppermint': 'Strong for IBS',
            'Echinacea': 'Moderate - Mixed results',
            'St. Johns Wort': 'Strong - Effective for mild depression',
            'Ginkgo': 'Moderate - Memory effects debated'
        };
        
        return levels[herbName] || 'Traditional use only';
    }
}

// Initialize
const herbalMedicine = new HerbalMedicine();
window.herbalMedicine = herbalMedicine;