import axios from 'axios';
import { logout, getUser } from './auth.js';
import { app, endpointEvent } from './main.js';
import { alertSucces } from './alert.js';


export function renderVisitorView() {
    const user = getUser()

    app.innerHTML = `
    <div class="container-dashboard">
        <nav>
            <div class="logout-visitor">
            <img class="logo" src="./public/icon/iconPage.webp" alt="Logo">
            <h2>Eventos disponibles</h2>
            </div>
            <div class="logout-visitor">
                <p>${user.name}</p>
                <button id="logoutBtn">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
        </nav>
        <ul id="eventList"></ul>
    </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", logout);

    async function loadEvents() {
        const user = getUser();
        const { data: events } = await axios.get(endpointEvent);
        const list = document.getElementById("eventList");
        list.innerHTML = "";

        events.forEach(event => {
            const isRegistered = event.usersRegistered?.includes(user.id);
            const li = document.createElement("li");
            li.innerHTML = `
        ${event.name} - ${event.date}
        <button data-id="${event.id}">
            ${isRegistered ? "Salir de evento" : "Registrarse"}
        </button>
        `;

            const button = li.querySelector("button");
            button.addEventListener("click", async () => {
                const updatedEvent = { ...event };

                if (!updatedEvent.usersRegistered) updatedEvent.usersRegistered = [];

                if (isRegistered) {
                    // Desregistrar
                    updatedEvent.usersRegistered = updatedEvent.usersRegistered.filter(id => id !== user.id);
                    alertSucces('Te has dado de baja en el evento')
                } else {
                    // Registrar
                    updatedEvent.usersRegistered.push(user.id);
                    alertSucces('Te has registrado exitosamente!')
                }

                await axios.put(`${endpointEvent}/${event.id}`, updatedEvent);
                loadEvents(); // Recargar la lista
            });

            list.appendChild(li);
        });
    }

    loadEvents();
}
