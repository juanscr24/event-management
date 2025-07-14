import axios from 'axios';
import { endpointUsers } from './main';
import { alertSucces } from './alert';

export function isAuthenticated() {
    return !!localStorage.getItem('user');
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function getUserRole() {
    const user = getUser();
    return user?.role || null;
}

export async function loginUser(email, password) {
    const { data } = await axios.get(`${endpointUsers}?email=${email}&password=${password}`);
    if (data.length > 0) {
        localStorage.setItem('user', JSON.stringify(data[0]));
        return data[0];
    }
    throw new Error('Credenciales inválidas');
}

export function logout() {
    localStorage.removeItem('user');
    alertSucces('Cerraste sesion de forma exitosa!')
    window.location.hash = '#login';
}

export async function registerUser(user) {
    const exists = await axios.get(`${endpointUsers}?email=${user.email}`);
    if (exists.data.length > 0) throw new Error ('Correo ya registrado');
    user.role = 'visitor';
    await axios.post(endpointUsers, user);
}
