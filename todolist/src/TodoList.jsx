import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const save = localStorage.getItem('tasks');
    if (save) {
      setTasks(JSON.parse(save));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };
  
// Xu li them Task
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
  }

// Xu li xoa Task
  const handleDeleteTask = (taskId) => {
    const updateTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updateTasks);
  };

// Đánh dấu công việc đã hoàn thành
  const handleToggleTask = (taskId) => {
    const updateTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updateTasks);
  }

  return (
    <div className="container">
      <h1 className="text-center p-5">TODO LIST</h1>

      <div className="input-group mb-3">
        <input
          type=""
          className="form-control"
          placeholder="Nhập công việc..."
          value={inputValue}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
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

      <p>{tasks.filter((task) => !task.completed).length} việc cần làm</p>
    </div>
  );
};

export default TodoList;