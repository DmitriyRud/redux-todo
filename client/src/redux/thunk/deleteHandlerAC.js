import {
  deleteTask
} from "../actions/taskAction";

export const deleteHandlerAC = (e) => {
  return async (dispatch) => {
    const response = await fetch(`/tasks/${e.target.id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      dispatch(deleteTask(e.target.id));
    }
  }
}
