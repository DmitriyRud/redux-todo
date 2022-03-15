import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  addTask
} from '../redux/actions/taskAction.js';

const useFetch = () => {
  const ownFetch = async (path, method = 'GET', headers = {}, body = null ) => {
    const response = await fetch(path, {method, headers, body});
    if (response.ok) {
      const result = await response.json();

      return result;
    }
  }
  return ownFetch;
}
export default useFetch;
