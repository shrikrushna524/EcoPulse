// ===== COMPLETE ANIMAL ADOPTION MODULE =====
class AnimalAdoption {
    constructor() {
        this.animals = this.loadAnimals();
        this.adoptions = this.loadAdoptions();
    }
    
    loadAnimals() {
        return [
            { id: 'tiger', name: 'Bengal Tiger', image: '🐅', price: 500, habitat: 'Indian forests', conservation: 'Endangered', facts: ['Largest cat species', 'Excellent swimmers', 'Territorial'] },
            { id: 'elephant', name: 'Asian Elephant', image: '🐘', price: 500, habitat: 'Forests of India', conservation: 'Endangered', facts: ['Largest land animal in Asia', 'Excellent memory', 'Matriarchal society'] },
            { id: 'rhino', name: 'One-Horned Rhino', image: '🦏', price: 500, habitat: 'Assam, India', conservation: 'Vulnerable', facts: ['Single horn', 'Poor eyesight', 'Good swimmers'] },
            { id: 'panda', name: 'Giant Panda', image: '🐼', price: 500, habitat: 'China', conservation: 'Vulnerable', facts: ['Eat 12-38kg bamboo daily', '6 fingers', 'Sleep 10 hours'] },
            { id: 'orangutan', name: 'Sumatran Orangutan', image: '🦧', price: 500, habitat: 'Sumatra', conservation: 'Critical', facts: ['90% DNA shared with humans', 'Build nests daily', 'Long childhood'] },
            { id: 'snow-leopard', name: 'Snow Leopard', image: '🐆', price: 500, habitat: 'Himalayas', conservation: 'Vulnerable', facts: ['Elusive', 'Long tail for balance', 'Can leap 15m'] }
        ];
    }
    
    loadAdoptions() {
        return JSON.parse(localStorage.getItem('animalAdoptions')) || [];
    }
    
    saveAdoptions() {
        localStorage.setItem('animalAdoptions', JSON.stringify(this.adoptions));
    }
    
    adoptAnimal(animalId, adopterName, adopterEmail, isGift = false) {
        const animal = this.animals.find(a => a.id === animalId);
        if (!animal) return null;
        
        const adoption = {
            id: Date.now(),
            animalId: animalId,
            animalName: animal.name,
            animalImage: animal.image,
            adopterName: adopterName,
            adopterEmail: adopterEmail,
            isGift: isGift,
            adoptionDate: new Date().toISOString(),
            certificateId: 'ADOPT-' + Date.now().toString(36).toUpperCase(),
            validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        this.adoptions.push(adoption);
        this.saveAdoptions();
        
        return adoption;
    }
    
    generateCertificate(adoptionId) {
        const adoption = this.adoptions.find(a => a.id === adoptionId);
        if (!adoption) return null;
        
        const animal = this.animals.find(a => a.id === adoption.animalId);
        
        const certificate = {
            title: 'Certificate of Wildlife Adoption',
            recipient: adoption.adopterName,
            animal: adoption.animalName,
            animalImage: adoption.animalImage,
            date: new Date(adoption.adoptionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            certificateId: adoption.certificateId,
            validUntil: new Date(adoption.validUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            message: `This certifies that ${adoption.adopterName} has made a commitment to protect wildlife by adopting a ${adoption.animalName}.`,
            conservationFact: animal.facts[Math.floor(Math.random() * animal.facts.length)]
        };
        
        return certificate;
    }
    
    getAdoptionsByEmail(email) {
        return this.adoptions.filter(a => a.adopterEmail === email);
    }
    
    getAdoptionStats() {
        const stats = {
            total: this.adoptions.length,
            byAnimal: {},
            byMonth: {}
        };
        
        this.adoptions.forEach(a => {
            stats.byAnimal[a.animalId] = (stats.byAnimal[a.animalId] || 0) + 1;
            
            const month = new Date(a.adoptionDate).getMonth();
            stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
        });
        
        return stats;
    }
    
    getAnimal(id) {
        return this.animals.find(a => a.id === id);
    }
    
    getConservationMessage(animalId) {
        const messages = {
            'tiger': 'Your adoption helps protect tiger corridors and prevents poaching.',
            'elephant': 'Your support helps maintain elephant corridors and reduces human-elephant conflict.',
            'rhino': 'Your adoption supports anti-poaching patrols in Kaziranga.',
            'panda': 'Your contribution helps preserve bamboo forests in China.',
            'orangutan': 'Your adoption helps protect orangutan habitat from palm oil plantations.',
            'snow-leopard': 'Your support helps monitor and protect snow leopard populations.'
        };
        
        return messages[animalId] || 'Thank you for supporting wildlife conservation!';
    }
    
    renewAdoption(adoptionId) {
        const adoption = this.adoptions.find(a => a.id === adoptionId);
        if (!adoption) return null;
        
        adoption.validUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
        adoption.renewedDate = new Date().toISOString();
        
        this.saveAdoptions();
        return adoption;
    }
}

// Initialize
const animalAdoption = new AnimalAdoption();
window.animalAdoption = animalAdoption;