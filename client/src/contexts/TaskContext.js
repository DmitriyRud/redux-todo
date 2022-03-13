import { createContext, useState } from 'react';

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
const [tasks, setTasks] = useState([]);
const [input, setInput] = useState('');
const [taskId, setTaskId] = useState(0);

const inputHandler = (e) => {
  setInput(e.target.value);
  
};


 const submitHandler = (e) => {
    e.preventDefault();
    if (input !== '') {
      let obj = {};
      obj['task'] = input;
      obj['completed'] = false;
      setTaskId((prev)=>prev + 1);
      obj['id'] = taskId;
      setTasks((prev)=>[...prev, obj]);
      document.getElementById('taskTitle').value = '';
    }
  };

   const deleteHandler = (e) => {
    e.preventDefault();
    let tasks2 = tasks;
    tasks2 = tasks2.filter(el=>+el.id !== +e.target.id);
    setTasks(tasks2);
 
  };

  const checkHandler = (e) => {
    let checkId = e.target.id;
    checkId = checkId.split('-')[1];
    const taskName = document.getElementById('title-' + checkId);
    taskName.classList.toggle('crossed');

    const tasks2 = tasks;
    for (let i = 0; i < tasks2.length; i++){
      if(tasks2[i].id === checkId) {
        tasks2[i].completed = !tasks[i].completed;
      }
    }
    setTasks(tasks2);
  };

  const editHandler = (e) => {
    const editId = e.target.id.split('-')[1];
    const tasks2 = JSON.parse(JSON.stringify(tasks));
    for (let i = 0; i < tasks2.length; i++){
      if(+tasks2[i].id === +editId) {
        tasks2[i].task = e.target.value;
      }
    }
    setTasks(tasks2);
  };

  return (
    <TaskContext.Provider
      value={{
        submitHandler,
        inputHandler,
        deleteHandler,
        checkHandler,
        editHandler,
        tasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
