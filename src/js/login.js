import { alertError } from './alert.js';
import { loginUser } from './auth.js';

const app = document.getElementById("app");

export function renderLogin() {
    app.innerHTML = `
    <div class="body-container-login">
        <div class="container-login">
            <h2 class="sesion">Iniciar sesión</h2>
            <i class="fa-solid fa-user"></i>
            <form id="loginForm">
                <input type="email" name="email" placeholder="Correo" required />
                <input type="password" name="password" placeholder="Contraseña" required />
                <button type="submit">Entrar</button>
            </form>
            <p>¿No tienes cuenta? <a href="#register">Regístrate</a></p>
        </div>
    </div>
    `;

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        try {
            const user = await loginUser(email.value, password.value);
            window.location.hash = "#dashboard";
        } catch {
            alertError('Credenciales incorrectas')
        }
    });
}
