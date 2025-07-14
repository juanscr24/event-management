import { router } from './router.js';

export const endpointEvent = 'http://localhost:3000/events';
export const endpointUsers = 'http://localhost:3000/users'

export const app = document.getElementById("app");

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
