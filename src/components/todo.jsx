import '../components/todo.css'
import { useState } from 'react'

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if(newTask.trim()){
      setTasks([{id: Date.now(), text: newTask, completed: false, editing: false}, ...tasks]);
      setNewTask('');
    }
  };

  const handleCheckBox = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, editing: true } : { ...task, editing: false }
    ));
  };

  const handleEditChange = (e, id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: e.target.value } : task
    );
    setTasks(updatedTasks);
  };

  const handleSave = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, editing: false } : task
    ));
  };

  return (
    <div className='main_container'>
      <div id="container">
        <h1>Todo List</h1>
        <input
          id="input_task"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button id="add_task_btn" onClick={addTask}>
          Add Task
        </button>
        <ul className="list-container">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              {task.editing ? (
                <div>
                  <textarea
                    value={task.text}
                    onChange={(e) => handleEditChange(e, task.id)}
                  />
                  <button id="save" onClick={() => handleSave(task.id)}>
                    Save
                  </button>
                </div>
              ) : (
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckBox(task.id)}
                  />
                  {task.text}
                </label>
              )}
              {task.editing ? null : (
                <button id="edit" onClick={() => handleEdit(task.id)}>
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button id="delete_complete_btn" onClick={handleDeleteCompleted}>
        Delete Completed Task
      </button>
    </div>
  );
}

export default Todo;