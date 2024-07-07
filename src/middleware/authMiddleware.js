// authMiddleware.js
import axios from 'axios';
import { authActions } from '../store/index.jsx';
import { Backend } from '../components/config/config.js';

axios.defaults.withCredentials = true;
export const checkAuthStatus = () => async (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(`${Backend}/api/v1/users/auth-status`,
{accessToken});
    console.log(response);
    dispatch(authActions.login(response.data.data));
  } catch (error) {
    dispatch(authActions.logout());
  }
};

export const refreshTokens = () => async (dispatch) => {
  const refreshToken = localStorage.getItem('refreshToken')
  try {
    const response = await axios.post(`${Backend}/api/v1/users/refresh-token`,{refreshToken});
    // console.log(response);
    dispatch(authActions.login(response.data.data));
  } catch (error) {
    dispatch(authActions.logout());
  }
};
