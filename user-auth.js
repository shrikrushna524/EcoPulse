// ===== SIMPLE USER AUTHENTICATION MODULE =====
class UserAuth {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
    }
    
    loadUsers() {
        return JSON.parse(localStorage.getItem('gameUsers')) || {};
    }
    
    saveUsers() {
        localStorage.setItem('gameUsers', JSON.stringify(this.users));
    }
    
    register(username, password, displayName, email = '') {
        // Validation
        if (!username || !password || !displayName) {
            return { success: false, message: 'All fields required' };
        }
        
        if (username.length < 3) {
            return { success: false, message: 'Username must be at least 3 characters' };
        }
        
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }
        
        if (this.users[username]) {
            return { success: false, message: 'Username already exists' };
        }
        
        // Create user (in production, hash password!)
        const user = {
            username: username,
            password: password, // UNSAFE - use hashing in production!
            displayName: displayName,
            email: email,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            stats: {
                territories: 0,
                steps: 0,
                distance: 0,
                walks: 0,
                badges: []
            },
            settings: {
                darkMode: true,
                notifications: true,
                shareData: false
            }
        };
        
        this.users[username] = user;
        this.saveUsers();
        
        return { success: true, message: 'Registration successful' };
    }
    
    login(username, password) {
        const user = this.users[username];
        
        if (!user || user.password !== password) {
            return { success: false, message: 'Invalid username or password' };
        }
        
        // Update login info
        user.lastLogin = new Date().toISOString();
        user.sessionToken = this.generateToken();
        this.currentUser = user;
        this.saveUsers();
        
        // Set session timeout
        setTimeout(() => this.logout(), this.sessionTimeout);
        
        return { 
            success: true, 
            user: {
                username: user.username,
                displayName: user.displayName,
                stats: user.stats,
                token: user.sessionToken
            }
        };
    }
    
    logout() {
        if (this.currentUser) {
            delete this.currentUser.sessionToken;
            this.saveUsers();
        }
        this.currentUser = null;
    }
    
    generateToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    updateStats(username, stats) {
        const user = this.users[username];
        if (!user) return false;
        
        user.stats = { ...user.stats, ...stats };
        user.lastActive = new Date().toISOString();
        
        if (this.currentUser?.username === username) {
            this.currentUser.stats = user.stats;
        }
        
        this.saveUsers();
        return true;
    }
    
    getLeaderboard(criteria = 'territories', limit = 10) {
        const users = Object.values(this.users)
            .map(user => ({
                displayName: user.displayName,
                username: user.username,
                ...user.stats
            }))
            .sort((a, b) => (b[criteria] || 0) - (a[criteria] || 0))
            .slice(0, limit);
        
        return users;
    }
    
    changePassword(username, oldPassword, newPassword) {
        const user = this.users[username];
        if (!user || user.password !== oldPassword) {
            return { success: false, message: 'Current password incorrect' };
        }
        
        if (newPassword.length < 6) {
            return { success: false, message: 'New password must be at least 6 characters' };
        }
        
        user.password = newPassword;
        this.saveUsers();
        
        return { success: true, message: 'Password changed successfully' };
    }
    
    resetPassword(username, email) {
        // In production, send email with reset link
        const user = this.users[username];
        if (!user || user.email !== email) {
            return { success: false, message: 'User not found or email mismatch' };
        }
        
        // Generate reset token
        const resetToken = this.generateToken();
        user.resetToken = resetToken;
        user.resetExpires = Date.now() + 3600000; // 1 hour
        this.saveUsers();
        
        // In production, send email with reset link
        console.log(`Reset link: https://yourapp.com/reset?token=${resetToken}`);
        
        return { 
            success: true, 
            message: 'Password reset email sent (check console for demo)' 
        };
    }
}

// Initialize
const userAuth = new UserAuth();
window.userAuth = userAuth;