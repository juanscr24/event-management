import { router } from './router.js';

export const endpointEvent = 'http://localhost:3000/events';
export const endpointUsers = 'http://localhost:3000/users'
export const endpointReservations = 'http://localhost:3000/reservations'

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
