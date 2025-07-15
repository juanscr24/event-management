import { alertSucces } from './alert.js';
import { registerUser } from './auth.js';
import { app } from './main.js';

// This function renders the login
export function renderRegister() {
    app.innerHTML = `
    <div class="body-container-register"">
        <div class="container-register">
            <h2 class="register">Registro</h2>
            <form id="registerForm">
                <input type="text" name="name" placeholder="Nombre" required />
                <input type="email" name="email" placeholder="Correo" required />
                <input type="password" name="password" placeholder="Contraseña" required />
                <button type="submit">Registrar</button>
            </form>
            <p>¿Ya tienes cuenta? <a href="#login">Inicia sesión</a></p>
        </div>
    </div>
    `;

    // The values of the form are taken and it is validated if they already exist and then they are created if they do not.
    document.getElementById("registerForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const user = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        };
        try {
            // Function done in auth.js
            await registerUser(user);
            alertSucces('Registro exitoso. Inicia sesión.')
            window.location.hash = "#login";
        } catch (err) {
            alert(err.message);
        }
    });
}
