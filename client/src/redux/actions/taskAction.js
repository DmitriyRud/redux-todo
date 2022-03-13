export const allTasks = (tasks) => {
  return {
    type: 'ALL TASKS',
    payload: tasks,
  };
};

export const addTask = (task) => {
  return {
    type: 'ADD TASK',
    payload: task,
  };
};

export const updateTask = (task) => {
  return {
    type: 'UPDATE TASK',
    payload: task,
  };
};

export const editTask = (task, title) => {
  return {
    type: 'EDIT TASK',
    payload: {task, title},
  };
};

export const deleteTask = (id) => {
  return {
    type: 'DELETE TASK',
    payload: id,
  };
};
