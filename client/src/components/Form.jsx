import { useDispatch } from 'react-redux';
//import { addTask } from '../redux/actions/taskAction';
import { addTaskAC } from '../redux/thunk/addTaskAC';
import { useState } from 'react';

const Form = () => {
const [input, setInput] = useState('');
const [taskId, setTaskId] = useState(0);
const dispatch = useDispatch();


const inputHandler = (e) => {
  setInput(e.target.value);
};
 
const submitHandler = (e) => {
    e.preventDefault();
    if (input !== '') {
      setTaskId((prev) => prev + 1);
      dispatch(addTaskAC(input, taskId));
      document.getElementById('taskTitle').value = '';
    }
  };

  return (
    <form onSubmit={submitHandler} className="form-inline" id="mainForm">
      <input type="text" onChange={inputHandler} name="taskName" className="form-control mb-2" id="taskTitle" placeholder="What needs to be done?" />

        <button type="submit" id="addButton" className="btn btn-primary mb-2">Add</button>
    </form>
  );
}

export default Form;
