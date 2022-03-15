import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../redux/actions/taskAction';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.js';
import { checkHandlerAC } from '../redux/thunk/checkHandlerAC';
import { deleteHandlerAC } from '../redux/thunk/deleteHandlerAC';

const Task = ({ task, taskId, checked, crossed }) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.tasks)
  const [title, setTitle] = useState(task);
  const ownFetch = useFetch();
  
  useEffect(() => {
    const result = ownFetch(`/tasks/${taskId}/rename`, 'PATCH', {'Content-type': 'application/json'}, JSON.stringify({ title }));
      dispatch(editTask(result.id, result.title));
  }, [title, dispatch]);

  const deleteHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteHandlerAC(e));
  };

  const checkHandler = (e) => {
    dispatch(checkHandlerAC(e));
  };

  const editHandler = (e) => {
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
