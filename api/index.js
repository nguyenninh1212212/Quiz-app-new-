// src/api/axiosInstance.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const api = axios.create({
  baseURL: "http://192.168.50.254:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem("token");

      const navigation = useNavigation();
      navigation.navigate("login"); // Điều hướng về màn hình đăng nhập
    }
    return Promise.reject(error);
  }
);

export default api;
