// ===== AI POWERED ENVIRONMENTAL ASSISTANT =====
class EcoAI {
    constructor() {
        this.responses = {
            agriculture: [
                "Based on your location, consider planting cover crops to improve soil health! 🌱",
                "Companion planting can reduce pest issues naturally. Try basil with tomatoes!",
                "Drip irrigation could save you up to 60% water compared to sprinklers."
            ],
            forest: [
                "Did you know? One tree can absorb up to 48 lbs of CO2 per year! 🌳",
                "Plant native species - they support local wildlife better.",
                "Consider starting a tree nursery with local seeds."
            ],
            energy: [
                "Solar panels on just 25% of roof space could power your entire home! ☀️",
                "LED bulbs use 75% less energy than incandescent.",
                "Smart thermostats save average 10-15% on heating/cooling bills."
            ],
            waste: [
                "Composting kitchen waste reduces methane from landfills by 50%! ♻️",
                "The average person uses 167 plastic bottles per year. Refillable is better!",
                "Recycling one aluminum can saves enough energy to run a TV for 3 hours."
            ],
            transport: [
                "Cycling 10km daily saves 500kg CO2 yearly - that's like planting 20 trees! 🚲",
                "Carpooling with just one person cuts emissions in half.",
                "Walking 30 minutes daily reduces carbon footprint by 0.5 tons annually."
            ],
            disaster: [
                "Create an emergency kit: water, food, radio, first aid, documents. 🌪️",
                "Know your evacuation routes before disaster strikes.",
                "Sign up for local emergency alerts on your phone."
            ],
            water: [
                "Fixing a dripping tap saves 5,000+ liters yearly! 💧",
                "Collect rainwater - 1000 sq ft roof can collect 600 gallons from 1 inch rain.",
                "Shorten shower by 2 minutes = save 1500 gallons/year."
            ],
            ev: [
                "EVs produce zero tailpipe emissions and cost 60% less to fuel! ⚡",
                "Charging at night uses cleaner grid electricity.",
                "EV batteries can be recycled for 95% material recovery."
            ],
            pollution: [
                "Indoor plants can remove up to 87% of air toxins in 24 hours! 🌿",
                "HEPA filters capture 99.97% of airborne particles.",
                "Carpooling reduces rush hour pollution by 30%."
            ],
            healthcare: [
                "2 hours in nature weekly significantly boosts mental health! 🏥",
                "Forest bathing reduces cortisol by 16% on average.",
                "Gardening burns 300 calories/hour and reduces stress."
            ]
        };
        
        this.context = [];
        this.init();
    }

    init() {
        this.createChatWidget();
        this.setupEventListeners();
    }

    createChatWidget() {
        const widget = document.createElement('div');
        widget.className = 'ai-assistant';
        widget.id = 'aiAssistant';
        widget.innerHTML = `
            <div class="ai-header" id="aiHeader">
                <div class="ai-avatar">🌿</div>
                <div>
                    <h4>EcoAI Assistant</h4>
                    <small>Online • Ask me anything!</small>
                </div>
                <i class="fas fa-chevron-up" style="margin-left: auto;"></i>
            </div>
            <div class="ai-chat-body" id="aiChatBody">
                <div class="message ai">
                    <div class="message-content">
                        Hi! I'm your environmental AI assistant. Ask me about sustainability, conservation, or any green topic! 🌍
                    </div>
                </div>
            </div>
            <div style="padding: 1rem; border-top: 1px solid var(--border-color); display: none;" id="aiInput">
                <div style="display: flex; gap: 0.5rem;">
                    <input type="text" id="aiMessageInput" placeholder="Type your question..." style="flex: 1; padding: 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 20px; color: var(--text-primary);">
                    <button class="btn btn-primary" id="aiSendBtn" style="padding: 0.5rem 1rem;">Send</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
    }

    setupEventListeners() {
        const header = document.getElementById('aiHeader');
        const chatBody = document.getElementById('aiChatBody');
        const input = document.getElementById('aiInput');
        const sendBtn = document.getElementById('aiSendBtn');
        const messageInput = document.getElementById('aiMessageInput');

        let isOpen = false;

        header.addEventListener('click', () => {
            isOpen = !isOpen;
            chatBody.style.display = isOpen ? 'block' : 'none';
            input.style.display = isOpen ? 'block' : 'none';
            header.querySelector('i').style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0)';
        });

        sendBtn.addEventListener('click', () => {
            this.sendMessage(messageInput.value);
            messageInput.value = '';
        });

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage(messageInput.value);
                messageInput.value = '';
            }
        });
    }

    sendMessage(message) {
        if (!message.trim()) return;

        // Add user message
        this.addMessage('user', message);
        
        // Get AI response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage('ai', response);
        }, 1000);
    }

    addMessage(sender, text) {
        const chatBody = document.getElementById('aiChatBody');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    generateResponse(query) {
        query = query.toLowerCase();
        
        // Check for keywords and return relevant response
        if (query.includes('agriculture') || query.includes('farm') || query.includes('crop')) {
            return this.responses.agriculture[Math.floor(Math.random() * this.responses.agriculture.length)];
        }
        if (query.includes('forest') || query.includes('tree') || query.includes('wildlife')) {
            return this.responses.forest[Math.floor(Math.random() * this.responses.forest.length)];
        }
        if (query.includes('energy') || query.includes('solar') || query.includes('renewable')) {
            return this.responses.energy[Math.floor(Math.random() * this.responses.energy.length)];
        }
        if (query.includes('waste') || query.includes('recycle') || query.includes('trash')) {
            return this.responses.waste[Math.floor(Math.random() * this.responses.waste.length)];
        }
        if (query.includes('transport') || query.includes('car') || query.includes('bus')) {
            return this.responses.transport[Math.floor(Math.random() * this.responses.transport.length)];
        }
        if (query.includes('disaster') || query.includes('emergency') || query.includes('flood')) {
            return this.responses.disaster[Math.floor(Math.random() * this.responses.disaster.length)];
        }
        if (query.includes('water') || query.includes('rain') || query.includes('drought')) {
            return this.responses.water[Math.floor(Math.random() * this.responses.water.length)];
        }
        if (query.includes('ev') || query.includes('electric vehicle') || query.includes('charging')) {
            return this.responses.ev[Math.floor(Math.random() * this.responses.ev.length)];
        }
        if (query.includes('pollution') || query.includes('air') || query.includes('quality')) {
            return this.responses.pollution[Math.floor(Math.random() * this.responses.pollution.length)];
        }
        if (query.includes('health') || query.includes('healthcare') || query.includes('medical')) {
            return this.responses.healthcare[Math.floor(Math.random() * this.responses.healthcare.length)];
        }
        
        // Default response
        return "That's a great question! While I learn more, check out our specific modules for detailed information. Is there a particular area (agriculture, energy, waste, etc.) you'd like to know about? 🌍";
    }
}

// Initialize AI Assistant
const ecoAI = new EcoAI();