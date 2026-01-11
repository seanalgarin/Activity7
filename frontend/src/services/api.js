import axios from 'axios';

// Use environment variable with fallback for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for better error handling
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.method.toUpperCase(), response.config.url, 'Status:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      code: error.code
    });
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - please check your connection');
    } else if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network error - unable to reach the server. Ensure backend is running.');
    }
    return Promise.reject(error);
  }
);

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.patch(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  getTasks: (id) => api.get(`/projects/${id}/tasks`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.patch(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Tasks API
export const tasksAPI = {
  getAll: () => api.get('/tasks'),
  getById: (id) => api.get(`/tasks/${id}`),
  getByUser: (userId) => api.get(`/tasks?userId=${userId}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.patch(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
};

// Convenience methods for backward compatibility
api.getUsers = () => usersAPI.getAll();
api.createUser = (data) => usersAPI.create(data);
api.updateUser = (id, data) => usersAPI.update(id, data);
api.deleteUser = (id) => usersAPI.delete(id);

api.getProjects = () => projectsAPI.getAll();
api.createProject = (data) => projectsAPI.create(data);
api.updateProject = (id, data) => projectsAPI.update(id, data);
api.deleteProject = (id) => projectsAPI.delete(id);

api.getTasks = () => tasksAPI.getAll();
api.createTask = (data) => tasksAPI.create(data);
api.updateTask = (id, data) => tasksAPI.update(id, data);
api.deleteTask = (id) => tasksAPI.delete(id);

export default api;
