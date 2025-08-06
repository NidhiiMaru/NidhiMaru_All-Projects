# Workspace Overview

This workspace contains multiple projects showcasing various applications built using JavaScript, React, Node.js, and MongoDB. Below is a detailed explanation of each project:

---

## 1. Currency Converter

### Description
The Currency Converter application allows users to convert currencies between different countries. It fetches real-time exchange rates using an external API and displays the conversion results.

### Features
- Dropdown menus to select source and target currencies.
- Real-time exchange rate updates.
- Displays country flags based on selected currencies.

### Key Files
- [`codes.js`](CurrencyConverter/NidhiMaru_currencyConvertor/codes.js): Contains a mapping of currency codes to country codes.
- [`first.js`](CurrencyConverter/NidhiMaru_currencyConvertor/first.js): Implements the logic for fetching exchange rates and updating the UI.
- [`index.html`](CurrencyConverter/NidhiMaru_currencyConvertor/index.html): The main HTML file for the application.
- [`style.css`](CurrencyConverter/NidhiMaru_currencyConvertor/style.css): Styles for the application.

---

## 2. NewsMonkey - News App

### Description
NewsMonkey is a React-based news application that fetches and displays top headlines from various categories using the News API.

### Features
- Navigation bar for category selection (e.g., Business, Entertainment, Technology).
- Pagination for browsing through news articles.
- Displays article titles, descriptions, images, and links to full articles.

### Key Files
- [`App.js`](NewsMonkey-News App/NewsMonkey-news-app/src/App.js): Main application file that sets up routing and renders components.
- [`News.js`](NewsMonkey-News App/NewsMonkey-news-app/src/components/News.js): Fetches and displays news articles.
- [`NewsItem.js`](NewsMonkey-News App/NewsMonkey-news-app/src/components/NewsItem.js): Represents individual news articles.
- [`NavBar.js`](NewsMonkey-News App/NewsMonkey-news-app/src/components/NavBar.js): Navigation bar for category selection.

---

## 3. Todolist - Task Tracker App

### Description
The Todolist application is a React-based task tracker that allows users to add, delete, and mark tasks as completed.

### Features
- Add new tasks with a title and description.
- Delete tasks.
- Mark tasks as completed using a checkbox.

### Key Files
- [`App.js`](Todolist-Task Tracker App/NidhiMaru_react-todolist/src/App.js): Main application file that sets up routing and renders components.
- [`AddTodo.js`](Todolist-Task Tracker App/NidhiMaru_react-todolist/src/MyComponents/AddTodo.js): Component for adding new tasks.
- [`Todos.js`](Todolist-Task Tracker App/NidhiMaru_react-todolist/src/MyComponents/Todos.js): Displays the list of tasks.
- [`Todoitem.js`](Todolist-Task Tracker App/NidhiMaru_react-todolist/src/MyComponents/Todoitem.js): Represents individual tasks.

---

## 4. iNotebook - Cloud-Based Notebook

### Description
iNotebook is a full-stack application that allows users to securely manage their notes in the cloud. It includes authentication and CRUD operations for notes.

### Features
- User authentication (signup, login, logout).
- Add, edit, delete, and view notes.
- Notes are stored in a MongoDB database.

### Backend
- [`index.js`](inotebook1/backend/index.js): Entry point for the backend server.
- [`auth.js`](inotebook1/backend/routes/auth.js): Handles user authentication.
- [`notes.js`](inotebook1/backend/routes/notes.js): Handles CRUD operations for notes.
- [`User.js`](inotebook1/backend/models/User.js): Mongoose schema for user data.
- [`Note.js`](inotebook1/backend/models/Note.js): Mongoose schema for notes.

### Frontend
- [`App.js`](inotebook1/src/App.js): Main application file that sets up routing and renders components.
- [`AddNote.js`](inotebook1/src/components/AddNote.js): Component for adding new notes.
- [`Notes.js`](inotebook1/src/components/Notes.js): Displays the list of notes.
- [`Login.js`](inotebook1/src/components/Login.js): Handles user login.
- [`Signup.js`](inotebook1/src/components/Signup.js): Handles user registration.

---

## How to Run

### Currency Converter
1. Open `index.html` in a browser.

### NewsMonkey
1. Navigate to the `NewsMonkey-News App/NewsMonkey-news-app` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.

### Todolist
1. Navigate to the `Todolist-Task Tracker App/NidhiMaru_react-todolist` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.

### iNotebook
1. Navigate to the `inotebook1/backend` directory.
2. Run `npm install` to install backend dependencies.
3. Start the backend server using `nodemon index.js`.
4. Navigate to the `inotebook1` directory.
5. Run `npm install` to install frontend dependencies.
6. Start the frontend server using `npm start`.

---

## Technologies Used
- **Frontend:** React, Bootstrap, CSS
- **Backend:** Node.js, Express, MongoDB
- **APIs:** News API, Currency API

---

## Author
Nidhi Maru

---