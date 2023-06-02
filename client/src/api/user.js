import http from '../http';
import { getHeader, getUserId, url } from './config';

const getUser = () => http.get(`${url()}/api/v1/users/${getUserId()}`, getHeader());

const updateUser = (data) => http.post(`${url()}/api/v1/users/${getUserId()}`, data, getHeader());

export { getUser, updateUser }
