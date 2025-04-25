// src/screens/Auth/Login.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth"; // Đường dẫn đến file auth.js trong api folder
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Đường dẫn đến AuthContext

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation(); // Sử dụng hook để điều hướng

  const { login: loginContext } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: async (data) => {
      const token = data.data.accessToken;
      await loginContext(token); // Gọi login từ context
      Alert.alert("Đăng nhập thành công", "Chào mừng bạn trở lại!");
    },
    onError: (error) => {
      console.log("🚀 ~ Login ~ error:", error);
      Alert.alert("Lỗi đăng nhập", "Thông tin đăng nhập không đúng.");
    },
  });
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
      return;
    }
    mutation.mutate({ username: email, password }); // Không cần await
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quizz App</Text>

      {/* Email Input */}
      <Text style={styles.labelText}>Tài khoản</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tài khoản"
        placeholderTextColor="#bbb"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.labelText}>Mật khẩu</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
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
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Register link */}
      <Text style={styles.registerText}>
        <Text>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.registerLinkText}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#383e6e", // primary_100
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#F59E0B", // yellow-400
    marginBottom: 24,
  },
  labelText: {
    color: "#F59E0B", // yellow-400
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white", // Đổi nền thành trắng
    color: "black", // Chữ màu đen
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 16,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", // Đổi nền thành trắng
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    color: "black", // Chữ màu đen
    paddingVertical: 16,
  },
  forgotPasswordText: {
    color: "#F59E0B", // yellow-400
    textAlign: "right",
    marginVertical: 16,
  },
  loginButton: {
    backgroundColor: "#F59E0B", // yellow-400
    alignItems: "center",
    borderRadius: 25,
    paddingVertical: 16,
  },
  loginButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  registerText: {
    textAlign: "center",
    color: "white",
    marginVertical: 12,
  },
  registerLinkText: {
    color: "#F59E0B", // yellow-400
    marginLeft: 8,
  },
});
