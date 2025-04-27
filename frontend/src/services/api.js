import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

export const createTodo = async (text, token) => {
  const response = await axios.post(
    `${API_URL}/todos`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getMyTodos = async (token) => {
  const response = await axios.get(`${API_URL}/todos/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllTodosAdmin = async (token, page = 1) => {
  const response = await axios.get(`${API_URL}/todos/all?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
