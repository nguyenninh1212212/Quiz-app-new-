// src/screens/Auth/ForgotPassword.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSendResetEmail = () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email của bạn.");
      return;
    }

    // Giả lập gửi email (không gọi API)
    Alert.alert(
      "Yêu cầu thành công",
      `Email đặt lại mật khẩu đã được gửi đến ${email}`
    );
    navigation.navigate("code");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quên mật khẩu</Text>

      <Text style={styles.labelText}>Nhập email tài khoản của bạn</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        placeholderTextColor="#bbb"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleSendResetEmail}
      >
        <Text style={styles.resetButtonText}>Gửi yêu cầu đặt lại mật khẩu</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#383e6e",
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffd800",
    marginBottom: 24,
  },
  labelText: {
    color: "#ffd800",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: "#ffd800",
    alignItems: "center",
    borderRadius: 25,
    paddingVertical: 16,
    marginBottom: 16,
  },
  resetButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  backText: {
    color: "#ffd800",
    textAlign: "center",
    fontSize: 14,
  },
});
