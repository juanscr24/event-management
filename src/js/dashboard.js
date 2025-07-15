import axios from 'axios';
import { getUser, logout } from './auth.js';
import { app, endpointEvent } from './main.js';

// The HTML of the panel was rendered
export function renderDashboard() {
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
        <h3>Crear evento</h3>
        <form id="eventForm">
            <input type="text" name="name" placeholder="Nombre del evento" required />
            <input type="date" name="date" placeholder="Fecha" required />
            <button type="submit">Crear Evento</button>
        </form>
        
        <div id="editSection" style="display: none;">
        <h3>Editar evento</h3>
        <form id="editForm">
        <input type="text" name="name" placeholder="Nuevo nombre" required />
        <input type="date" name="date" placeholder="Nueva fecha" required />
        <button type="submit">Guardar cambios</button>
        <button type="button" id="cancelEdit">Cancelar</button>
        </form>
        </div>
        
        <h3 class="created-event">Eventos creados</h3>
        <ul id="eventList"></ul>
    </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", logout);

    // Declare the HTML variables
    const eventForm = document.getElementById("eventForm");
    const editSection = document.getElementById("editSection");
    const editForm = document.getElementById("editForm");
    const cancelEdit = document.getElementById("cancelEdit");

    let editingId = null; // Save the ID of the event we are editing.

    //An event is given to the form
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

    // If you no want to delete or edit anything, it is cancelled.
    cancelEdit.addEventListener("click", () => {
        editSection.style.display = "none";
        editingId = null;
        editForm.reset();
    });

    // The form is edited
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

    // The event loads and creates a list, with the event and the date
    async function loadEvents() {
        const { data } = await axios.get(endpointEvent);
        const list = document.getElementById("eventList");
        list.innerHTML = "";

        data.forEach(ev => {
            const li = document.createElement("li");
            li.innerHTML = `
        ${ev.name} - ${ev.date}
        <div class="container-button">
        <button class="editBtn" data-id="${ev.id}">Editar</button>
        <button class="deleteBtn" data-id="${ev.id}">Eliminar</button>
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
