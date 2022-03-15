import Task from './Task.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch.js';
import { allTasks } from '../redux/actions/taskAction.js';


const List = () => {
  const ownFetch = useFetch();
  const dispatch = useDispatch();
  let tasks;
  useEffect(() => {
    ownFetch('/tasks').then((data) => dispatch(allTasks(data.tasks)));
  }, []);
  tasks = useSelector((store) => store.tasks);

 
  return (
    <div className="display">
      <div className="header">
        <p>Todo list</p>
      </div>
      <div className="list">
        <ul className="list-group">
          {tasks.map((el) => {
            if (el.completed) {
              return (
                <Task key={el.id} taskId={el['id']} task={el.title} crossed='task-name crossed' checked={true} />
              )
            } else {
              return (
                <Task key={el.id} taskId={el['id']} task={el.title} crossed='task-name' checked={false}/>
              )
            }
          }
          )}
        </ul>
      </div>
    </div>
  );
}

export default List;

