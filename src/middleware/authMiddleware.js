// authMiddleware.js
import axios from 'axios';
import { authActions } from '../store/index.jsx';
import { Backend } from '../components/config/config.js';

axios.defaults.withCredentials = true;
export const checkAuthStatus = () => async (dispatch) => {
  try {
    const response = await axios.get(`${Backend}/api/v1/users/auth-status`);
    console.log(response);
    dispatch(authActions.login(response.data.data));
  } catch (error) {
    dispatch(authActions.logout());
  }
};

export const refreshTokens = () => async (dispatch) => {
  try {
    const response = await axios.post(`${Backend}/api/v1/users/refresh-token`);
    // console.log(response);
    dispatch(authActions.login(response.data.data));
  } catch (error) {
    dispatch(authActions.logout());
  }
};
