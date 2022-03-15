import { addTask } from "../actions/taskAction";

export const addTaskAC = (input, taskId) => {
  return async (dispatch) => {
    let obj = {};
    obj['task'] = input;
    obj['completed'] = false;
    obj['id'] = taskId;

    const response = await fetch('/tasks/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    if (response.ok) {
      const result = await response.json();
      dispatch(addTask(result));
    }
  };
};
