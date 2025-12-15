import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true
});

//AUTH
export const login = (data) => api.post('/auth/login', data);
export const signup = (data) => api.post('/auth/signup', data);
export const logout = () => api.post('/auth/logout');
export const me = () => api.get('/auth/me');
export const getAllUsers = () => api.get('/auth/users');

//PROJECTS
export const getProjects = () => api.get('/projects');
export const getRequestableProjects = () => api.get('/projects/requestable');
export const getAllProjectsAdmin = () => api.get('/projects/all');
export const createProject = (data) => api.post('/projects/createProject', data);
export const requestAccess = (projectId) => api.post(`/projects/${projectId}/request-access`);
export const handleRequest = (projectId, data) => api.post(`/projects/${projectId}/approve-request`, data);

//REPORTS
export const connectReports = () =>
  new EventSource('http://localhost:4000/api/reports', {
    withCredentials: true
  });

export default api;
