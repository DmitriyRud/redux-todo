// import { useContext } from 'react';
// import { TaskContext } from '../contexts/TaskContext.js';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, updateTask } from '../redux/actions/taskAction';

const Task = ({task, taskId}) => {
  // const { deleteHandler, checkHandler, editHandler } = useContext(TaskContext);
const dispatch = useDispatch();
  
   const deleteHandler = (e) => {
    e.preventDefault();
    // let tasks = JSON.parse(JSON.stringify(tasks));
    // tasks2 = tasks2.filter(el=>+el.id !== +e.target.id);
    // setTasks(tasks2);
    dispatch(deleteTask(e.target.id));
  };

  const checkHandler = (e) => {
    let checkId = e.target.id;
    checkId = checkId.split('-')[1];
    const taskName = document.getElementById('title-' + checkId);
    taskName.classList.toggle('crossed');

    // const tasks2 = tasks;
    // for (let i = 0; i < tasks2.length; i++){
    //   if(tasks2[i].id === checkId) {
    //     tasks2[i].completed = !tasks[i].completed;
    //   }
    // }
    // setTasks(tasks2);
    dispatch(updateTask(checkId));
  };

  const editHandler = (e) => {
    const editId = e.target.id.split('-')[1];
    // const tasks2 = JSON.parse(JSON.stringify(tasks));
    // for (let i = 0; i < tasks2.length; i++){
    //   if(+tasks2[i].id === +editId) {
    //     tasks2[i].task = e.target.value;
    //   }
    // }
    // setTasks(tasks2);
    dispatch(editTask(editId, e.target.value));
  };


  return (
    <li id={"task" + taskId} className="list-item">
      <input type="checkbox" className="check" id={"chk-" + taskId}/>
      <label onClick={checkHandler} id={"check-" + taskId} htmlFor={"chk-" + taskId}></label>
      <input type="text" onChange={editHandler} id={"title-" + taskId} className="task-name" value={task} autoComplete="off" />
      <button id={taskId} onClick={deleteHandler} type="button" className="btn btn-outline-secondary">🗑️</button></li>
  );
}

export default Task;
