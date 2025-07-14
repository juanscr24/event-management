import axios from 'axios';
import { logout } from './auth.js';
import { endpointEvent } from './main.js';

const app = document.getElementById("app");

export function renderDashboard() {
    app.innerHTML = `
    <div class="container-dashboard">
        <nav>
            <h2>Administrador</h2>
            <button id="logoutBtn">Cerrar sesión</button>
        </nav>
        <h3>Crear evento</h3>
        <form id="eventForm">
            <input type="text" name="name" placeholder="Nombre del evento" required />
            <input type="date" name="date" placeholder="Fecha" required />
            <button type="submit">Crear Evento</button>
        </form>
        <h3 class="created-event">Eventos creados</h3>

        <div id="editSection" style="display: none;">
            <h3>Editar evento</h3>
                <form id="editForm">
                    <input type="text" name="name" placeholder="Nuevo nombre" required />
                    <input type="date" name="date" placeholder="Nueva fecha" required />
                    <button type="submit">Guardar cambios</button>
                    <button type="button" id="cancelEdit">Cancelar</button>
                </form>
        </div>

        <ul id="eventList"></ul>
    </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", logout);

    const eventForm = document.getElementById("eventForm");
    const editSection = document.getElementById("editSection");
    const editForm = document.getElementById("editForm");
    const cancelEdit = document.getElementById("cancelEdit");

    let editingId = null; // Guardamos el ID del evento que se está editando

    eventForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const { name, date } = e.target;
        await axios.post(endpointEvent, {
            name: name.value,
            date: date.value,
            usersRegistered: []
        });
        eventForm.reset();
        loadEvents();
    });

    cancelEdit.addEventListener("click", () => {
        editSection.style.display = "none";
        editingId = null;
        editForm.reset();
    });

    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const { name, date } = e.target;

        const { data: oldEvent } = await axios.get(`${endpointEvent}/${editingId}`);

        await axios.put(`${endpointEvent}/${editingId}`, {
            ...oldEvent,
            name: name.value,
            date: date.value
        });

        editingId = null;
        editSection.style.display = "none";
        editForm.reset();
        loadEvents();
    });

    async function loadEvents() {
        const { data } = await axios.get(endpointEvent);
        const list = document.getElementById("eventList");
        list.innerHTML = "";

        data.forEach(ev => {
            const li = document.createElement("li");
            li.innerHTML = `
        ${ev.name} - ${ev.date}
        <div class="container-button">
        <button class="deleteBtn" data-id="${ev.id}">Eliminar</button>
        <button class="editBtn" data-id="${ev.id}">Editar</button>
        </div>
        `;
            list.appendChild(li);
        });

        document.querySelectorAll(".editBtn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                const event = (await axios.get(`${endpointEvent}/${id}`)).data;
                editingId = id;
                editForm.name.value = event.name;
                editForm.date.value = event.date;
                editSection.style.display = "block";
            });
        });

        document.querySelectorAll(".deleteBtn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                await axios.delete(`${endpointEvent}/${id}`);
                loadEvents();
            });
        });
    }

    loadEvents();
}
