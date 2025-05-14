import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";
const SocialButton = ({ title, color, textColor, onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: color,
      padding: 12,
      borderRadius: 999,
      width: "100%",
    }}
    onPress={onPress}
  >
    <Text style={{ color: textColor, textAlign: "center" }}>{title}</Text>
  </TouchableOpacity>
);

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation(); // Use useNavigation for navigation

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: async (data) => {
      Alert.alert("Đăng ký thành công");
      navigation.navigate("login"); // Điều hướng đến màn hình đăng nhập
    },
    onError: (error) => {
      console.log("🚀 ~ Login ~ error:", error);
      Alert.alert("Lỗi Đăng ký", "Thông tin đăng ký không đúng.");
    },
  });

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu và mật khẩu xác nhận không khớp!");
      return;
    }
    mutation.mutate(formData); // Không cần await
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#383e6e",
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 24,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "#ffd800", // yellow-400
            marginBottom: 16,
          }}
        >
          Đăng ký
        </Text>

        {/* Username */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: "#ffd800", marginBottom: 4 }}>
            Nhập tên tài khoản
          </Text>
          <TextInput
            style={{
              width: "100%",
              backgroundColor: "white", // Màu nền trắng
              color: "black", // Màu chữ đen
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 25, // Updated borderRadius for consistency
            }}
            placeholder="Nhập tài khoản..."
            placeholderTextColor="#BDBDBD"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
          />
        </View>

        {/* Email */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: "#ffd800", marginBottom: 4 }}>Email</Text>
          <TextInput
            style={{
              width: "100%",
              backgroundColor: "white", // Màu nền trắng
              color: "black", // Màu chữ đen
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 25, // Updated borderRadius for consistency
            }}
            placeholder="Nhập email..."
            placeholderTextColor="#BDBDBD"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        {/* Age & Phone Number - same row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          {/* Age */}
          <View style={{ flex: 1, marginRight: 6 }}>
            <Text style={{ color: "#ffd800", marginBottom: 4 }}>Tuổi</Text>
            <TextInput
              style={{
                backgroundColor: "white",
                color: "black",
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 25,
              }}
              placeholder="Tuổi..."
              placeholderTextColor="#BDBDBD"
              keyboardType="numeric"
              value={formData.age}
              onChangeText={(text) => handleChange("age", text)}
            />
          </View>

          {/* Phone Number */}
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text style={{ color: "#ffd800", marginBottom: 4 }}>
              Số điện thoại
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                color: "black",
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 25,
              }}
              placeholder="Số điện thoại..."
              placeholderTextColor="#BDBDBD"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(text) => handleChange("phoneNumber", text)}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: "#ffd800", marginBottom: 4 }}>Mật khẩu</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white", // Màu nền trắng
              borderRadius: 25,
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}
          >
            <TextInput
              style={{ flex: 1, color: "black", paddingVertical: 8 }} // Màu chữ đen
              placeholder="Nhập mật khẩu..."
              placeholderTextColor="#BDBDBD"
              secureTextEntry={secureText}
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <MaterialIcons
                name={secureText ? "visibility-off" : "visibility"}
                size={24}
                color="black" // Màu icon đen
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: "#ffd800", marginBottom: 4 }}>
            Nhập lại mật khẩu
          </Text>
          <TextInput
            style={{
              width: "100%",
              backgroundColor: "white", // Màu nền trắng
              color: "black", // Màu chữ đen
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 25, // Updated borderRadius for consistency
            }}
            placeholder="Nhập lại mật khẩu..."
            placeholderTextColor="#BDBDBD"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#ffd800", // yellow-400
            paddingVertical: 12,
            borderRadius: 25, // Updated borderRadius for consistency
            alignItems: "center",
            marginTop: 16,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#111827", fontWeight: "bold", fontSize: 18 }}>
            Đăng ký
          </Text>
        </TouchableOpacity>

        {/* Link to login */}
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text
            style={{
              color: "#ffd800", // yellow-400
              textAlign: "center",
              marginTop: 16,
            }}
          >
            Đã có tài khoản?
          </Text>
        </TouchableOpacity>

        {/* Social buttons */}
        <Text
          style={{
            textAlign: "center",
            color: "#D1D5DB",
            marginVertical: 12,
          }}
        >
          hoặc đăng ký với
        </Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <SocialButton
            title="Google"
            color="white"
            textColor="black"
            onPress={() => {}}
          />
          <SocialButton
            title="Facebook"
            color="#3B82F6"
            textColor="white"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
