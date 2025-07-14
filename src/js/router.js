import { renderLogin } from './login.js';
import { renderRegister } from './register.js';
import { renderDashboard } from './dashboard.js';
import { renderVisitorView } from './visitor.js';
import { isAuthenticated, getUserRole } from './auth.js';

export function router() {
    const route = window.location.hash || '#login';
    const role = getUserRole();

    if (!isAuthenticated() && route !== '#login' && route !== '#register') {
        window.location.hash = '#login';
        return;
    }

    if (route === '#dashboard' && role === 'admin') renderDashboard();
    else if (route === '#dashboard' && role === 'visitor') renderVisitorView();
    else if (route === '#register') renderRegister();
    else renderLogin();
}
