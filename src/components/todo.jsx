import '../components/todo.css'
import { useState } from 'react'

  function todo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
   
    //function for adding task to the list
    const addTask = () => {
      if(newTask.trim()){ //trim function will remove the unnessary spaces from the newTask
        setTasks([...tasks, {id: Date.now(), text: newTask, completed: false}]);
        setNewTask('');
      }
  };

  //handle list check box
    const handleCheckBox = (id) => {
      setTasks(tasks.map (task =>
        task.id === id ? {...task, completed: !task.completed } :task

      ));
    };

    //function to delete the checked task
    const handleDeleteCompleted = () => {
      setTasks(tasks.filter(task => !task.completed));
    };

     const handleEdit = (id) => {
       setTasks(tasks.map(task =>
        task.id === id ? { ...task, editing: true } : { ...task, editing: false }
      ));
    };

    //handle edit change
  const handleEditChange = (e, id) => {
    //list which is updated by edit button
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: e.target.value } : task
    );
    setTasks(updatedTasks);
  };

  //even listenr for the save button
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
          <li key={task.id} className={task.completed ? "completed" : ""} style={{wordBreak: "break-word"}}>
            {task.editing ? (
              <div>
                <input
                  type="text"
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

export default todo;

