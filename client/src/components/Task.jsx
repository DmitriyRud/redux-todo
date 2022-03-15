import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, editTask, updateTask } from '../redux/actions/taskAction';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.js';

const Task = ({ task, taskId, checked, crossed }) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.tasks)
  const [title, setTitle] = useState(task);
  const ownFetch = useFetch();
  
  useEffect(() => {
    const result = ownFetch(`/tasks/${taskId}/rename`, 'PATCH', {'Content-type': 'application/json'}, JSON.stringify({ title }));
      dispatch(editTask(result.id, result.title));

  }, [title]);

  const deleteHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`/tasks/${e.target.id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      dispatch(deleteTask(e.target.id));
    }
  };

  const checkHandler = async (e) => {
    let checkId = e.target.id;
    checkId = checkId.split('-')[1];
    const taskName = document.getElementById('title-' + checkId);
    taskName.classList.toggle('crossed');
    const response = await fetch(`/tasks/${checkId}`, {
      method: 'PATCH'
    });
    if (response.ok) {
      dispatch(updateTask(checkId));
    }
  };

  const editHandler = async (e) => {
    setTitle(e.target.value);
  };


  return (
    <li id={"task" + taskId} className="list-item">
      <input type="checkbox" className="check" id={"chk-" + taskId} defaultChecked={checked} />
      <label onClick={checkHandler} id={"check-" + taskId} htmlFor={"chk-" + taskId}></label>
      <input type="text" onChange={(e) => editHandler(e)} id={"title-" + taskId} className={crossed} value={title} autoComplete="off" />
      <button id={taskId} onClick={deleteHandler} type="button" className="btn btn-outline-secondary">🗑️</button></li>
  );
}

export default Task;
