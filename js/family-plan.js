// ===== COMPLETE FAMILY EMERGENCY PLAN MODULE =====
class FamilyPlan {
    constructor() {
        this.plans = this.loadPlans();
        this.templates = this.loadTemplates();
    }
    
    loadPlans() {
        return JSON.parse(localStorage.getItem('familyPlans')) || [];
    }
    
    loadTemplates() {
        return {
            basic: {
                name: 'Basic Family Plan',
                sections: ['contacts', 'meetingPoints', 'medicalInfo', 'evacuation', 'communication']
            },
            comprehensive: {
                name: 'Comprehensive Plan',
                sections: ['contacts', 'meetingPoints', 'medicalInfo', 'evacuation', 'communication', 'petCare', 'specialNeeds', 'documents', 'supplies', 'insurance']
            },
            apartment: {
                name: 'Apartment Building Plan',
                sections: ['contacts', 'buildingEvacuation', 'neighborCoordination', 'utilityShutoff']
            }
        };
    }
    
    createPlan(familyName, members, template = 'basic') {
        const plan = {
            id: Date.now(),
            familyName: familyName,
            members: members,
            template: template,
            created: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            contacts: this.initializeContacts(members),
            meetingPoints: this.initializeMeetingPoints(),
            medicalInfo: this.initializeMedicalInfo(members),
            evacuation: this.initializeEvacuation(),
            communication: this.initializeCommunication(),
            completed: false
        };
        
        this.plans.push(plan);
        this.savePlans();
        return plan;
    }
    
    initializeContacts(members) {
        const contacts = {
            primary: { name: '', phone: '', relationship: '' },
            secondary: { name: '', phone: '', relationship: '' },
            outOfState: { name: '', phone: '', location: '' },
            emergency: { police: '112', fire: '112', ambulance: '112', disaster: '1070' }
        };
        
        members.forEach((member, index) => {
            contacts[`member${index+1}`] = {
                name: member,
                phone: '',
                work: '',
                school: ''
            };
        });
        
        return contacts;
    }
    
    initializeMeetingPoints() {
        return {
            nearHome: '',
            outsideNeighborhood: '',
            outOfTown: ''
        };
    }
    
    initializeMedicalInfo(members) {
        const info = {};
        members.forEach(member => {
            info[member] = {
                bloodType: '',
                allergies: '',
                medications: '',
                conditions: '',
                doctor: '',
                insurance: ''
            };
        });
        return info;
    }
    
    initializeEvacuation() {
        return {
            routes: [],
            transportation: '',
            petPlan: '',
            specialNeeds: ''
        };
    }
    
    initializeCommunication() {
        return {
            primaryMethod: 'Phone',
            backupMethod: 'SMS',
            familyGroupChat: '',
            emergencyAlertSystem: true
        };
    }
    
    savePlans() {
        localStorage.setItem('familyPlans', JSON.stringify(this.plans));
    }
    
    getPlan(id) {
        return this.plans.find(p => p.id === id);
    }
    
    updatePlan(id, updates) {
        const index = this.plans.findIndex(p => p.id === id);
        if (index !== -1) {
            this.plans[index] = { ...this.plans[index], ...updates, lastUpdated: new Date().toISOString() };
            this.savePlans();
        }
    }
    
    deletePlan(id) {
        this.plans = this.plans.filter(p => p.id !== id);
        this.savePlans();
    }
    
    generatePDF(planId) {
        const plan = this.getPlan(planId);
        if (!plan) return null;
        
        let content = `
            =================================
            FAMILY EMERGENCY PLAN
            =================================
            
            Family: ${plan.familyName}
            Created: ${new Date(plan.created).toLocaleDateString()}
            Last Updated: ${new Date(plan.lastUpdated).toLocaleDateString()}
            
            FAMILY MEMBERS:
            ${plan.members.join(', ')}
            
            EMERGENCY CONTACTS:
            Primary: ${plan.contacts.primary.name} (${plan.contacts.primary.phone})
            Secondary: ${plan.contacts.secondary.name} (${plan.contacts.secondary.phone})
            Out of State: ${plan.contacts.outOfState.name} (${plan.contacts.outOfState.phone}) - ${plan.contacts.outOfState.location}
            
            Emergency Numbers: Police/Fire/Ambulance - 112
            
            MEETING POINTS:
            Near Home: ${plan.meetingPoints.nearHome}
            Outside Neighborhood: ${plan.meetingPoints.outsideNeighborhood}
            Out of Town: ${plan.meetingPoints.outOfTown}
            
            MEDICAL INFORMATION:
        `;
        
        for (const [member, info] of Object.entries(plan.medicalInfo)) {
            content += `
            ${member}:
            - Blood Type: ${info.bloodType}
            - Allergies: ${info.allergies}
            - Medications: ${info.medications}
            - Conditions: ${info.conditions}
            `;
        }
        
        content += `
            EVACUATION PLAN:
            Routes: ${plan.evacuation.routes.join(', ')}
            Transportation: ${plan.evacuation.transportation}
            Pet Plan: ${plan.evacuation.petPlan}
            Special Needs: ${plan.evacuation.specialNeeds}
            
            COMMUNICATION:
            Primary: ${plan.communication.primaryMethod}
            Backup: ${plan.communication.backupMethod}
            
            =================================
            REVIEW THIS PLAN EVERY 6 MONTHS
            =================================
        `;
        
        return content;
    }
    
    checkCompleteness(planId) {
        const plan = this.getPlan(planId);
        if (!plan) return 0;
        
        let total = 0;
        let completed = 0;
        
        // Count contacts
        Object.values(plan.contacts).forEach(contact => {
            total++;
            if (contact.phone && contact.name) completed++;
        });
        
        // Count meeting points
        Object.values(plan.meetingPoints).forEach(point => {
            total++;
            if (point) completed++;
        });
        
        // Count medical info
        Object.values(plan.medicalInfo).forEach(info => {
            total += 4;
            if (info.bloodType) completed++;
            if (info.allergies) completed++;
            if (info.medications) completed++;
            if (info.conditions) completed++;
        });
        
        return Math.round((completed / total) * 100);
    }
    
    getEmergencyContacts() {
        return {
            national: {
                police: '112',
                ambulance: '112',
                fire: '112',
                disaster: '1070',
                women: '1091',
                child: '1098'
            },
            state: {
                delhi: '011-23434567',
                maharashtra: '022-22027990',
                tamilnadu: '044-28593990'
            }
        };
    }
    
    conductDrill(planId) {
        const plan = this.getPlan(planId);
        const drill = {
            date: new Date().toISOString(),
            type: 'Evacuation Drill',
            participants: plan.members,
            duration: Math.floor(Math.random() * 30) + 15, // minutes
            success: Math.random() > 0.2,
            issues: [],
            improvements: []
        };
        
        return drill;
    }
}

// Initialize
const familyPlan = new FamilyPlan();
window.familyPlan = familyPlan;