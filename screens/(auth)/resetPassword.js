// src/screens/Auth/ResetPassword.js
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const navigation = useNavigation();

  const handleReset = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ mật khẩu mới và xác nhận.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
      return;
    }

    // TODO: Gọi API đặt lại mật khẩu ở đây (nếu có)
    Alert.alert("Thành công", "Đặt lại mật khẩu thành công!");
    navigation.navigate("Sucess");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Đặt lại mật khẩu mới</Text>

      <Text style={styles.labelText}>Mật khẩu mới</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor="#bbb"
          secureTextEntry={secureNew}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setSecureNew(!secureNew)}>
          <MaterialIcons
            name={secureNew ? "visibility-off" : "visibility"}
            size={24}
            color="#383e6e"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.labelText}>Xác nhận mật khẩu mới</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#bbb"
          secureTextEntry={secureConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
          <MaterialIcons
            name={secureConfirm ? "visibility-off" : "visibility"}
            size={24}
            color="#383e6e"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Đặt lại mật khẩu</Text>
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
    backgroundColor: "#383e6e",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffd800",
    textAlign: "center",
    marginBottom: 32,
  },
  labelText: {
    color: "#ffd800",
    marginBottom: 8,
  },
  passwordInputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 25,
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    color: "black",
  },
  toggleText: {
    color: "#383e6e",
    fontWeight: "bold",
    paddingHorizontal: 12,
  },
  resetButton: {
    backgroundColor: "#ffd800",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  resetButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  backText: {
    color: "#ffd800",
    textAlign: "center",
    fontSize: 14,
  },
});
