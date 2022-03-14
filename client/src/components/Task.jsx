import { useDispatch } from 'react-redux';
import { deleteTask, editTask, updateTask } from '../redux/actions/taskAction';

const Task = ({task, taskId}) => {
const dispatch = useDispatch();
  
   const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteTask(e.target.id));
  };

  const checkHandler = (e) => {
    let checkId = e.target.id;
    checkId = checkId.split('-')[1];
    const taskName = document.getElementById('title-' + checkId);
    taskName.classList.toggle('crossed');
    dispatch(updateTask(checkId));
  };

  const editHandler = (e) => {
    const editId = e.target.id.split('-')[1];
    const title = e.target.value;
    dispatch(editTask(editId, title));
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
