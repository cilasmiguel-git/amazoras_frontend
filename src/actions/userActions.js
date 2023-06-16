import axios from 'axios';
import Cookies from 'js-cookie';

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: 'USER_SIGNIN_REQUEST', payload: { email, password } });

  try {
    const { data } = await axios.post('/api/users/signin', { email, password });

    // Converter o objeto userInfo em uma string JSON
    const userInfo = JSON.stringify(data);

    // Armazenar o userInfo como um cookie
    Cookies.set('userInfo', userInfo, { path: '/' });

    dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'USER_SIGNIN_FAILURE', payload: error.message });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: 'USER_REGISTER_REQUEST', payload: { name, email, password } });

  try {
    const { data } = await axios.post('/api/users/register', { name, email, password });

    // Converter o objeto userInfo em uma string JSON
    const userInfo = JSON.stringify(data);

    // Armazenar o userInfo como um cookie
    Cookies.set('userInfo', userInfo, { path: '/' });

    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'USER_REGISTER_FAILURE', payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  // Limpar o cookie do userInfo
  Cookies.remove('userInfo');

  // Despachar a ação de logout
  dispatch({ type: 'USER_LOGOUT' });
};
