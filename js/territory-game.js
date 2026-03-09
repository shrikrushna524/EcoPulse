// ===== TERRITORY CAPTURE GAME MODULE =====
class TerritoryGame {
    constructor() {
        this.users = this.loadUsers();
        this.territories = this.loadTerritories();
        this.currentUser = null;
        this.watchId = null;
        this.walkPath = [];
        this.lastPosition = null;
        this.totalDistance = 0;
        this.steps = 0;
        this.gameActive = false;
        this.mapSize = { width: 600, height: 400 };
        this.gridSize = 20; // Each territory cell is 20x20 pixels
        this.cols = Math.floor(this.mapSize.width / this.gridSize);
        this.rows = Math.floor(this.mapSize.height / this.gridSize);
    }
    
    loadUsers() {
        return JSON.parse(localStorage.getItem('territoryUsers')) || {};
    }
    
    loadTerritories() {
        return JSON.parse(localStorage.getItem('territories')) || this.initializeTerritories();
    }
    
    initializeTerritories() {
        const territories = {};
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                territories[`${x},${y}`] = {
                    owner: null,
                    lastCaptured: null,
                    captureCount: 0
                };
            }
        }
        return territories;
    }
    
    saveTerritories() {
        localStorage.setItem('territories', JSON.stringify(this.territories));
    }
    
    saveUsers() {
        localStorage.setItem('territoryUsers', JSON.stringify(this.users));
    }
    
    registerUser(username, password, displayName) {
        if (this.users[username]) {
            return { success: false, message: 'Username already exists' };
        }
        
        this.users[username] = {
            username: username,
            password: password, // In production, hash this!
            displayName: displayName,
            territories: 0,
            totalSteps: 0,
            totalDistance: 0,
            rank: 0,
            joinedDate: new Date().toISOString(),
            lastActive: new Date().toISOString()
        };
        
        this.saveUsers();
        return { success: true, message: 'Registration successful' };
    }
    
    loginUser(username, password) {
        const user = this.users[username];
        if (!user || user.password !== password) {
            return { success: false, message: 'Invalid credentials' };
        }
        
        this.currentUser = user;
        user.lastActive = new Date().toISOString();
        this.saveUsers();
        return { success: true, user: user };
    }
    
    logoutUser() {
        this.currentUser = null;
        this.stopWalking();
    }
    
    startWalking() {
        if (!this.currentUser) {
            alert('Please login first!');
            return false;
        }
        
        if (!navigator.geolocation) {
            alert('Geolocation not supported by your browser');
            return false;
        }
        
        this.gameActive = true;
        this.walkPath = [];
        this.totalDistance = 0;
        this.steps = 0;
        this.lastPosition = null;
        
        // Start watching position
        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handlePositionUpdate(position),
            (error) => this.handleLocationError(error),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        );
        
        return true;
    }
    
    stopWalking() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        this.gameActive = false;
        
        // Calculate territories earned from this walk
        const territoriesEarned = Math.floor(this.totalDistance / 100); // 100m = 1 territory
        if (territoriesEarned > 0 && this.currentUser) {
            this.awardTerritories(territoriesEarned);
        }
    }
    
    handlePositionUpdate(position) {
        const { latitude, longitude, accuracy } = position.coords;
        
        // Update location status
        document.getElementById('locationStatus').innerHTML = 
            `<span class="live-indicator"></span> GPS: Live (Accuracy: ${Math.round(accuracy)}m)`;
        
        // Convert GPS to map coordinates
        const mapX = this.gpsToMapX(longitude);
        const mapY = this.gpsToMapY(latitude);
        
        // Add to walk path
        this.walkPath.push({ x: mapX, y: mapY, timestamp: Date.now() });
        
        // Calculate distance from last position
        if (this.lastPosition) {
            const distance = this.calculateDistance(
                this.lastPosition.lat, this.lastPosition.lng,
                latitude, longitude
            );
            
            // Update stats
            this.totalDistance += distance;
            this.steps += Math.round(distance * 1.312); // Average step length 0.76m
            
            // Check for territory capture
            this.checkTerritoryCapture(mapX, mapY);
        }
        
        this.lastPosition = { lat: latitude, lng: longitude };
        
        // Update UI
        this.updateStats();
        this.drawMap();
    }
    
    gpsToMapX(lng) {
        // Convert longitude to map X coordinate (simplified)
        // Assume lng range: 68° to 97° (India)
        const minLng = 68;
        const maxLng = 97;
        const normalized = (lng - minLng) / (maxLng - minLng);
        return Math.floor(normalized * this.mapSize.width);
    }
    
    gpsToMapY(lat) {
        // Convert latitude to map Y coordinate (simplified)
        // Assume lat range: 8° to 37° (India)
        const minLat = 8;
        const maxLat = 37;
        const normalized = 1 - ((lat - minLat) / (maxLat - minLat)); // Invert Y
        return Math.floor(normalized * this.mapSize.height);
    }
    
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        return R * c; // in meters
    }
    
    checkTerritoryCapture(mapX, mapY) {
        const gridX = Math.floor(mapX / this.gridSize);
        const gridY = Math.floor(mapY / this.gridSize);
        
        if (gridX < 0 || gridX >= this.cols || gridY < 0 || gridY >= this.rows) return;
        
        const cellKey = `${gridX},${gridY}`;
        const cell = this.territories[cellKey];
        
        // If cell is unowned or owned by someone else, capture it
        if (!cell.owner || cell.owner !== this.currentUser.username) {
            cell.owner = this.currentUser.username;
            cell.lastCaptured = new Date().toISOString();
            cell.captureCount = (cell.captureCount || 0) + 1;
            
            this.saveTerritories();
            this.updateUserTerritoryCount();
            
            // Show capture notification
            this.showNotification(`🎯 Territory captured at ${gridX},${gridY}!`);
        }
    }
    
    awardTerritories(count) {
        // Award random unclaimed territories near user's path
        let awarded = 0;
        
        for (let i = 0; i < this.walkPath.length && awarded < count; i++) {
            const point = this.walkPath[i];
            const gridX = Math.floor(point.x / this.gridSize);
            const gridY = Math.floor(point.y / this.gridSize);
            const cellKey = `${gridX},${gridY}`;
            
            if (!this.territories[cellKey].owner) {
                this.territories[cellKey].owner = this.currentUser.username;
                this.territories[cellKey].lastCaptured = new Date().toISOString();
                awarded++;
            }
        }
        
        if (awarded > 0) {
            this.saveTerritories();
            this.updateUserTerritoryCount();
            this.showNotification(`✨ Earned ${awarded} new territories!`);
        }
    }
    
    updateUserTerritoryCount() {
        if (!this.currentUser) return;
        
        // Count territories owned by current user
        const count = Object.values(this.territories).filter(t => t.owner === this.currentUser.username).length;
        this.currentUser.territories = count;
        this.currentUser.totalSteps += this.steps;
        this.currentUser.totalDistance += this.totalDistance / 1000; // Convert to km
        
        this.saveUsers();
        document.getElementById('userTerritories').textContent = count;
    }
    
    drawMap() {
        const canvas = document.getElementById('territoryMap');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, this.mapSize.width, this.mapSize.height);
        
        // Draw territory grid
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                const cell = this.territories[`${x},${y}`];
                
                if (cell && cell.owner) {
                    // Draw territory cell
                    if (cell.owner === this.currentUser?.username) {
                        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'; // Your territory
                        ctx.strokeStyle = '#4CAF50';
                    } else {
                        ctx.fillStyle = 'rgba(244, 67, 54, 0.3)'; // Others' territory
                        ctx.strokeStyle = '#F44336';
                    }
                    
                    ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
                    ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
                } else {
                    // Empty cell
                    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                    ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
                }
            }
        }
        
        // Draw walk path
        if (this.walkPath.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = '#2196F3';
            ctx.lineWidth = 3;
            ctx.moveTo(this.walkPath[0].x, this.walkPath[0].y);
            
            for (let i = 1; i < this.walkPath.length; i++) {
                ctx.lineTo(this.walkPath[i].x, this.walkPath[i].y);
            }
            ctx.stroke();
        }
        
        // Draw current position
        if (this.lastPosition) {
            const x = this.gpsToMapX(this.lastPosition.lng);
            const y = this.gpsToMapY(this.lastPosition.lat);
            
            ctx.beginPath();
            ctx.fillStyle = '#FFC107';
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    updateStats() {
        document.getElementById('walkDistance').textContent = (this.totalDistance / 1000).toFixed(2);
        document.getElementById('walkSteps').textContent = this.steps.toLocaleString();
        document.getElementById('walkCalories').textContent = Math.round(this.steps * 0.04); // 4 cal per 100 steps
        
        if (this.currentUser) {
            document.getElementById('userSteps').textContent = this.currentUser.totalSteps.toLocaleString();
        }
    }
    
    showNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            animation: slideIn 0.3s ease;
            z-index: 1000;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    getLeaderboard(limit = 10) {
        const users = Object.values(this.users)
            .map(user => ({
                displayName: user.displayName,
                territories: user.territories,
                steps: user.totalSteps,
                distance: user.totalDistance
            }))
            .sort((a, b) => b.territories - a.territories)
            .slice(0, limit);
        
        return users;
    }
    
    handleLocationError(error) {
        let message = 'Location error: ';
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message += 'Please enable location access';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'Location information unavailable';
                break;
            case error.TIMEOUT:
                message += 'Location request timed out';
                break;
        }
        alert(message);
    }
}

// Initialize game
const territoryGame = new TerritoryGame();
window.territoryGame = territoryGame;