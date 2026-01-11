import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import UserManagement from './components/UserManagement';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'projects':
        return <ProjectList />;
      case 'tasks':
        return <TaskList />;
      case 'users':
        return <UserManagement />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>📋 Task Management System</h1>
        <div className="nav-links">
          <button
            className={currentView === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={currentView === 'projects' ? 'active' : ''}
            onClick={() => setCurrentView('projects')}
          >
            Projects
          </button>
          <button
            className={currentView === 'tasks' ? 'active' : ''}
            onClick={() => setCurrentView('tasks')}
          >
            Tasks
          </button>
          <button
            className={currentView === 'users' ? 'active' : ''}
            onClick={() => setCurrentView('users')}
          >
            Users
          </button>
        </div>
      </nav>
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
