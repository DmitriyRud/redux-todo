import {
  updateTask
} from "../actions/taskAction";

export const checkHandlerAC = (e) => {
  return async (dispatch) => {
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
  }
}
