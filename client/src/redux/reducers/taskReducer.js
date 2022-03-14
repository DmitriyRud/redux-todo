const taskReducer = (state = [], action) => {
  const {
    type,
    payload
  } = action;
  switch (type) {
    case 'ALL TASKS':
      return payload;
    case 'ADD TASK':
      return [...state, payload];
    case 'UPDATE TASK':
      let tasks2 = [...state];
      for (let i = 0; i < tasks2.length; i++) {
        if (+tasks2[i].id === +payload) {
          tasks2[i].completed = !tasks2[i].completed;
        }
      }
      return tasks2;
    case 'EDIT TASK':
      let tasks3 = JSON.parse(JSON.stringify(state));
      for (let i = 0; i < tasks3.length; i++) {
        if (+tasks3[i].id === +payload.task) {
          tasks3[i].task = payload.title;
        }
      }
      return tasks3;
    case 'DELETE TASK':
      return state.filter((el) => +el.id !== +payload);
    default:
      return state;
  }
};

export default taskReducer;
