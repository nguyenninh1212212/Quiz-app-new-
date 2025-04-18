import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const SocialButton = ({ title, color, textColor, onPress }) => (
  <TouchableOpacity
    className={`bg-${color} p-3 rounded-full w-full`}
    onPress={onPress}
  >
    <Text className={`text-${textColor} self-center`}>{title}</Text>
  </TouchableOpacity>
);

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [secureText, setSecureText] = useState(true);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Kiểm tra mật khẩu và mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu và mật khẩu xác nhận không khớp!");
      return;
    }

    console.log("Register Data:", formData);
    // Thực hiện đăng ký ở đây, ví dụ gọi API
  };

  return (
    <View className="flex-1 bg-primary_100 justify-center items-center px-5">
      <View className="w-full max-w-md p-6 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center text-yellow-400 mb-4">
          Đăng ký
        </Text>

        {/* Username */}
        <View className="mb-3">
          <Text className="text-gray-300 mb-1">Nhập tên tài khoản</Text>
          <TextInput
            className="w-full bg-primary_250 text-white px-3 py-3 rounded-full"
            placeholder="Nhập tài khoản..."
            placeholderTextColor="#bbb"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
          />
        </View>

        {/* Email */}
        <View className="mb-3">
          <Text className="text-gray-300 mb-1">Email</Text>
          <TextInput
            className="w-full bg-primary_250 text-white px-3 py-3 rounded-full"
            placeholder="Nhập email..."
            placeholderTextColor="#bbb"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        {/* Password */}
        <View className="mb-3">
          <Text className="text-gray-300 mb-1">Mật khẩu</Text>
          <View className="flex-row items-center bg-primary_250 rounded-full px-3 py-2">
            <TextInput
              className="flex-1 text-white py-2"
              placeholder="Nhập mật khẩu..."
              placeholderTextColor="#bbb"
              secureTextEntry={secureText}
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <MaterialIcons
                name={secureText ? "visibility-off" : "visibility"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View className="mb-3">
          <Text className="text-gray-300 mb-1">Nhập lại mật khẩu</Text>
          <TextInput
            className="w-full bg-primary_250 text-white px-3 py-3 rounded-full"
            placeholder="Nhập lại mật khẩu..."
            placeholderTextColor="#bbb"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="w-full bg-yellow-400 py-2 rounded-full items-center mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-gray-900 font-bold text-lg">Đăng ký</Text>
        </TouchableOpacity>

        {/* Link to login */}
        <Link href="/(auth)/login" className="text-yellow-400 self-center mt-4">
          Đã có tài khoản?
        </Link>

        {/* Social buttons */}
        <Text className="text-center text-gray-300 my-2">hoặc đăng ký với</Text>
        <View className="flex-col justify-center space-x-5 gap-3">
          <SocialButton title="Google" color="white" textColor="black" onPress={() => {}} />
          <SocialButton title="Facebook" color="blue-600" textColor="white" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
