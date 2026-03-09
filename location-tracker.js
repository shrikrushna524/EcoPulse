// ===== ADVANCED LOCATION TRACKER MODULE =====
class LocationTracker {
    constructor() {
        this.watchId = null;
        this.path = [];
        this.distance = 0;
        this.speed = 0;
        this.altitude = 0;
        this.accuracy = 0;
        this.lastPosition = null;
        this.isTracking = false;
        this.startTime = null;
        this.elapsedTime = 0;
    }
    
    startTracking(options = {}) {
        if (!navigator.geolocation) {
            throw new Error('Geolocation not supported');
        }
        
        this.isTracking = true;
        this.startTime = Date.now();
        this.path = [];
        this.distance = 0;
        
        const defaultOptions = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        };
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handlePosition(position),
            (error) => this.handleError(error),
            { ...defaultOptions, ...options }
        );
        
        return this.watchId;
    }
    
    stopTracking() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        this.isTracking = false;
        this.elapsedTime = (Date.now() - this.startTime) / 1000; // seconds
    }
    
    handlePosition(position) {
        const { latitude, longitude, accuracy, altitude, speed, heading } = position.coords;
        
        const point = {
            lat: latitude,
            lng: longitude,
            accuracy: accuracy,
            altitude: altitude,
            speed: speed,
            heading: heading,
            timestamp: Date.now()
        };
        
        // Calculate distance from last point
        if (this.lastPosition) {
            const segmentDistance = this.calculateDistance(
                this.lastPosition.lat, this.lastPosition.lng,
                latitude, longitude
            );
            
            // Only count if accuracy is good enough ( < 50m)
            if (accuracy < 50) {
                this.distance += segmentDistance;
                this.path.push(point);
            }
        } else {
            this.path.push(point);
        }
        
        this.lastPosition = point;
        this.accuracy = accuracy;
        this.speed = speed || 0;
        this.altitude = altitude || 0;
        
        // Trigger update event
        this.onUpdate?.(this.getStats());
    }
    
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        return R * c;
    }
    
    getStats() {
        const now = Date.now();
        const duration = this.startTime ? (now - this.startTime) / 1000 : 0;
        
        return {
            distance: this.distance,
            distanceKm: (this.distance / 1000).toFixed(2),
            duration: this.formatDuration(duration),
            speed: this.speed,
            avgSpeed: duration > 0 ? (this.distance / duration) * 3.6 : 0, // km/h
            accuracy: this.accuracy,
            altitude: this.altitude,
            points: this.path.length,
            isTracking: this.isTracking
        };
    }
    
    formatDuration(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    getPath() {
        return this.path;
    }
    
    clearPath() {
        this.path = [];
        this.distance = 0;
        this.lastPosition = null;
    }
    
    handleError(error) {
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
        this.onError?.(message);
    }
    
    onUpdate(callback) {
        this.onUpdate = callback;
    }
    
    onError(callback) {
        this.onError = callback;
    }
}

// Initialize
const locationTracker = new LocationTracker();
window.locationTracker = locationTracker;