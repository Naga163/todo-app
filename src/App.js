import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch('/tasks.json')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = (newTask) => {
    const updatedTask = { ...newTask, id: Date.now(), completed: false, timestamp: new Date().toISOString() };
    setTasks([...tasks, updatedTask]);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed, timestamp: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TaskForm onAdd={addTask} onUpdate={updateTask} taskToEdit={editingTask} />
      <TaskList tasks={tasks} onToggleComplete={toggleComplete} onEdit={setEditingTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;
