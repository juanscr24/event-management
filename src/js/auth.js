import axios from 'axios';
import { endpointUsers } from './main';
import { alertSucces } from './alert';
import Swal from 'sweetalert2';

// This Javascript will have the entire authentication system

export function isAuthenticated() {
    return !!localStorage.getItem('user');
}

// Get user 
export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

// Get role
export function getUserRole() {
    const user = getUser();
    return user?.role || null;
}


// Login User Validates if the password and email are strictly the same as those in the database
export async function loginUser(email, password) {
    const { data } = await axios.get(`${endpointUsers}?email=${email}&password=${password}`);
    if (data.length > 0) {
        localStorage.setItem('user', JSON.stringify(data[0]));
        return data[0];
    }
    throw new Error('Credenciales inválidas');
}

// This function removes the local storage and also redirects you to the login

export async function logout() {
const result = await Swal.fire({
        title: "Estas seguro de cerrar sesion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Si, Porfavor!",
        cancelButtonText: "No, Gracias",
    });

    if (result.isConfirmed) {
        try {
            localStorage.removeItem('user');
            alertSucces('Cerraste sesion de forma exitosa!')
            window.location.hash = '#login';
        } catch (error) {
            alerError("Error al cerrar sesion.");
            console.error(error);
        }
    }
}

// Check if your email already exists and then make a post if the credentials are valid
export async function registerUser(user) {
    const exists = await axios.get(`${endpointUsers}?email=${user.email}`);
    if (exists.data.length > 0) throw new Error ('Correo ya registrado');
    user.role = 'visitor';
    await axios.post(endpointUsers, user);
}
