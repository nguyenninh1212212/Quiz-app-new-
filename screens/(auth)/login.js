import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();

  const handleLogin = () => {
    // Logic to handle login (e.g., API call, validation) can go here
    router.push("/Home"); // Navigates to the Home screen on successful login
  };

  return (
    <View className="flex-1 justify-center bg-primary_100 px-6">
      <Text className="text-3xl font-bold text-center text-yellow-400 mb-6">
        Quizz App
      </Text>

      {/* Email Input */}
      <Text className="text-yellow-400 mb-2">Tài khoản</Text>
      <TextInput
        className="bg-primary_250 text-white p-3 rounded-full mb-4 py-5"
        placeholder="Nhập tài khoản"
        placeholderTextColor="#bbb"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text className="text-yellow-400 mb-2">Mật khẩu</Text>
      <View className="flex-row items-center bg-primary_250 px-3 rounded-full">
        <TextInput
          className="flex-1 text-white py-5"
          placeholder="Nhập mật khẩu"
          placeholderTextColor="#bbb"
          secureTextEntry={secureText}
          textContentType="password"
          returnKeyType="done"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <MaterialIcons
            name={secureText ? "visibility-off" : "visibility"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Link
          className="text-yellow-400 text-right my-4"
          href="/(auth)/register"
        >
          Quên mật khẩu?
        </Link>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-yellow-400 items-center rounded-full py-2"
        onPress={handleLogin}
      >
        <Text className="text-black font-bold text-lg">Đăng nhập</Text>
      </TouchableOpacity>

      {/* Register link */}
      <Text className="self-center my-3 text-white">
        <Text>Chưa có tài khoản?</Text>
        <Link className="text-yellow-400 ml-2" href="/(auth)/register">
          Đăng ký ngay
        </Link>
      </Text>

      {/* Divider */}
      <View className="h-[1px] bg-yellow-400 my-3" />

      {/* Login with Google & Facebook */}
      <Text className="text-center text-gray-300 my-2">hoặc đăng nhập với</Text>
      <View className="flex-col space-y-3">
        <TouchableOpacity className="bg-white py-3 rounded-full items-center">
          <Text className="text-black">Google</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 py-3 rounded-full items-center">
          <Text className="text-white">Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
