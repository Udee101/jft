import http from '../http';
import { url } from './config';

const login = (data) => http.post(`${url()}/api/v1/login`, data)

const logout = async () => {
  localStorage.removeItem('jft_jwt');
  localStorage.removeItem('jft_user');
}

const register = (data) => http.post(`${url()}/api/v1/register`, data)

export { login, register , logout}
