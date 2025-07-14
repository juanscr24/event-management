# Event Management - with JavaScript

**Author:** Juan Sebastián Cardona Rengifo  
**Clan:** Ciénaga

---

## Project Description

This repository contains a series of exercises and a complete CRUD project that implements advanced data structures in JavaScript, such as objects, arrays, maps, and sets.

The project simulates an event management system, where you can add or remove events using a fake REST API provided by JSON Server, allowing persistent CRUD operations during development.

The platform is built as a event center page, where registered users can manage event and schedule stays for them.

---

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Vite** 
- **Axios** 
- **JSON Server** 

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** v14 or higher
- **npm** (Node package manager)
- **Visual Studio Code** or another modern text editor
- **Updated web browser** (Chrome, Firefox, Edge, etc.)

---

## Installing and Running the Project

### 1. Clone the repository

`bash`
git clone https://github.com/juanscr24/event-management
cd event-management`

### 2. Install dependencies
`npm install`

### 3. Start the development server with Vite
`npm run dev`

This will generate a local URL, usually http://localhost:5173, which you can open in your browser.

### 4. Run JSON Server to simulate the API
`npx json-server src/data/db.json --watch`

This will open a server at http://localhost:3000 where you can access the pets, stays, and users endpoints.

## Features

### Authentication
- Registration and login using `localStorage`.
- Persistent authentication to prevent unauthorized access to the dashboard.

### Event Management
- Create new events associated with a user.
- Delete events.

### Data Structures Used
- Arrays to store lists of events and date.
- Objects to model entities (`users`, `events`).
