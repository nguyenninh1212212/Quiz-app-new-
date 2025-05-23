import api from "./index";

export const register = async (data) => {
  const res = await api.post(`/auth/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post(`/auth/login`, data);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get(`/auth/profile`);
  return res.data;
};
