const taskReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ALL TASKS':
      return payload;
    case 'ADD TASK':
      return [payload, ...state];
    case 'UPDATE TASK':
      let tasks2 = [...state];
for (let i = 0; i < tasks2.length; i++){
      if(+tasks2[i].id === +payload) {
        tasks2[i].completed = !tasks2[i].completed;
      }
    }
      return tasks2;
      //return state.filter((el) => el.id !== payload);
    case 'EDIT TASK':
    tasks2 = JSON.parse(JSON.stringify(state));
    for (let i = 0; i < tasks2.length; i++){
      if(+tasks2[i].id === +payload.id) {
        tasks2[i].task = payload.title;
      }
    }
      return tasks2;
    case 'DELETE TASK':
      return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
};

export default taskReducer;
