//import { useContext } from 'react';
//import { TaskContext } from '../contexts/TaskContext.js';
import Task from './Task.jsx';
//import { allTasks } from '../redux/actions/taskAction';
import { useSelector } from 'react-redux';


const List = () => {
// const { tasks } = useContext(TaskContext);
//  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);

  return (
    <div className="display">
      <div className="header">
        <p>Todo list</p>
      </div>
      <div className="list">
        <ul className="list-group">
          {tasks.map((el)=>(
            <Task key={el.id} taskId={"" + el['id']} task={el.task}/>
          )
          )}
        </ul>
      </div>
    </div>
  );
}

export default List;

