import { renderLogin } from './login.js';
import { renderRegister } from './register.js';
import { renderDashboard } from './dashboard.js';
import { renderVisitorView } from './visitor.js';
import { isAuthenticated, getUserRole } from './auth.js';

// This javaScript render the routes

export function router() {
    const route = window.location.hash || '#login';
    const role = getUserRole();

    // If you are not registered and are not on the login page or register, redirect to login
    // Guardian
    if (!isAuthenticated() && route !== '#login' && route !== '#register') {
        window.location.hash = '#login';
        return;
    }

    // Routing system
    if (route === '#dashboard' && role === 'admin') renderDashboard();
    else if (route === '#dashboard' && role === 'visitor') renderVisitorView();
    else if (route === '#register') renderRegister();
    else renderLogin();
}
