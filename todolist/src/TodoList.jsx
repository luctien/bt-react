import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: new Date().getTime(),
        title: inputValue,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1 class="text-center p-5">TODO LIST</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between ${
              task.completed ? 'list-group-item-success' : ''
            }`}
          >
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.title}
            </span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteTask(task.id)}
            >Delete</button>
          </li>
        ))}
      </ul>

      <p>{tasks.filter((task) => !task.completed).length} tasks</p>
    </div>
  );
};

export default TodoList;