import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getClients = () => api.get('/clients');
export const createClient = (payload) => api.post('/clients', payload);
export const getAccounts = () => api.get('/accounts');
export const createAccount = (payload) => api.post('/accounts', payload);
export const getRecentTransactions = () => api.get('/transactions/recent');
export const createTransfer = (payload) => api.post('/transfers', payload);
export const login = (payload) => api.post('/auth/login', payload);
export const register = (payload) => api.post('/auth/register', payload);
export const logout = () => api.post('/auth/logout');
