# Duenza - Student Assignment Deadline Manager

A responsive React web app MVP for managing student assignment deadlines.

## Features

- **Login Page**: Simple user authentication with name input
- **Onboarding Page**: Welcome screen with app introduction
- **Dashboard Page**: View all tasks sorted by deadline with filters
- **Add Task Page**: Form to add new assignments with name, subject, deadline, and priority
- **Confirmation Page**: Success message after adding a task
- **Reminders Page**: View urgent and overdue tasks

## Key Functionality

- Add tasks with task name, subject, deadline, and priority (low/medium/high)
- Save tasks to localStorage for persistence
- Display tasks on dashboard sorted by nearest deadline
- Highlight urgent tasks due within 2 days (yellow border)
- Highlight overdue tasks (red border)
- Delete task option
- Filter tasks by: All, Due Soon, Overdue
- Responsive design for mobile and desktop

## Prerequisites

Before running this application, you need to have **Node.js** and **npm** installed on your system.

### Installing Node.js

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS (Long Term Support) version for your operating system
3. Run the installer and follow the installation wizard
4. Verify installation by opening a terminal/command prompt and running:
   ```bash
   node --version
   npm --version
   ```

## Installation

1. Navigate to the project directory:
   ```bash
   cd duenza
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
duenza/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── TaskCard.jsx
    │   └── TaskCard.css
    ├── pages/
    │   ├── Login.jsx
    │   ├── Login.css
    │   ├── Onboarding.jsx
    │   ├── Onboarding.css
    │   ├── Dashboard.jsx
    │   ├── Dashboard.css
    │   ├── AddTask.jsx
    │   ├── AddTask.css
    │   ├── Confirmation.jsx
    │   ├── Confirmation.css
    │   ├── Reminders.jsx
    │   └── Reminders.css
    └── utils/
        └── storage.js
```

## Technologies Used

- **React 18**: UI library with functional components and hooks
- **React Router DOM**: Client-side routing
- **Vite**: Fast build tool and development server
- **CSS3**: Responsive styling with modern features
- **localStorage**: Client-side data persistence

## Browser Support

This application works in all modern browsers including:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is for educational purposes.