import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";
import ProfileForm from "./profile";

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

  const [next, setNext] = useState(false);

  const [errors, setErrors] = useState({});
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const mutation = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: () => {
      Alert.alert("Đăng ký thành công");
      navigation.navigate("login");
    },
    onError: (error) => {
      console.log("🚀 ~ Login ~ error:", error);
      Alert.alert("Lỗi Đăng ký", "Thông tin đăng ký không đúng.");
    },
  });

  const validateStepOne = () => {
    const newErrors = {};
    const { username, password, confirmPassword } = formData;

    if (!username.trim()) newErrors.username = "Vui lòng nhập tên tài khoản.";
    else if (username.length < 6)
      newErrors.username = "Tên tài khoản phải có ít nhất 6 ký tự.";

    if (!password) newErrors.password = "Vui lòng nhập mật khẩu.";
    else if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    )
      newErrors.password =
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa và số.";

    if (!confirmPassword)
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Mật khẩu và xác nhận không khớp.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    const { fullname, age, email, phoneNumber } = formData;

    if (!fullname.trim()) newErrors.fullname = "Vui lòng nhập họ tên.";
    if (!age.trim()) newErrors.age = "Vui lòng nhập tuổi.";
    else {
      const ageNumber = parseInt(age);
      if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber > 100)
        newErrors.age = "Tuổi phải là số từ 1 đến 100.";
    }

    if (!email.trim()) newErrors.email = "Vui lòng nhập email.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Email không hợp lệ.";
    }

    if (!phoneNumber.trim())
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại.";
    else if (!/^\d{11}$/.test(phoneNumber))
      newErrors.phoneNumber = "Số điện thoại phải gồm đúng 11 chữ số.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStepOne()) {
      setNext(true);
    }
  };

  const handleFinalSubmit = () => {
    if (validateStepTwo()) {
      mutation.mutate(formData);
    }
  };

  const ErrorText = ({ message }) =>
    message ? (
      <Text style={{ color: "red", marginTop: 4, marginLeft: 12 }}>
        {message}
      </Text>
    ) : null;

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#383e6e",
        flexDirection: "column",
        justifyContent: "center",
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexDirection: "column",

          alignItems: "center",
          paddingVertical: 40,
          paddingHorizontal: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            width: "100%",
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
              color: "#ffd800",
              marginTop: 100,
            }}
          >
            Đăng ký
          </Text>

          {/* Fullname */}

          {!next ? (
            <View>
              {/* Username */}
              <View style={{ marginBottom: 12 }}>
                <Text style={{ color: "#ffd800", marginBottom: 4 }}>
                  Nhập tên tài khoản
                </Text>
                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 25,
                  }}
                  placeholder="Nhập tài khoản..."
                  placeholderTextColor="#BDBDBD"
                  value={formData.username}
                  onChangeText={(text) => handleChange("username", text)}
                />
                <ErrorText message={errors.username} />
              </View>

              {/* Password */}
              <View style={{ marginBottom: 12 }}>
                <Text style={{ color: "#ffd800", marginBottom: 4 }}>
                  Mật khẩu
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 25,
                    paddingHorizontal: 16,
                  }}
                >
                  <TextInput
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      color: "black",
                    }}
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
                      color="grey"
                    />
                  </TouchableOpacity>
                </View>
                <ErrorText message={errors.password} />
              </View>

              {/* Confirm Password */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: "#ffd800", marginBottom: 4 }}>
                  Xác nhận mật khẩu
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 25,
                    paddingHorizontal: 16,
                  }}
                >
                  <TextInput
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      color: "black",
                    }}
                    placeholder="Nhập lại mật khẩu..."
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={secureText}
                    value={formData.confirmPassword}
                    onChangeText={(text) =>
                      handleChange("confirmPassword", text)
                    }
                  />
                  <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <MaterialIcons
                      name={secureText ? "visibility-off" : "visibility"}
                      size={24}
                      color="grey"
                    />
                  </TouchableOpacity>
                </View>
                <ErrorText message={errors.confirmPassword} />
              </View>
            </View>
          ) : (
            <ProfileForm
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              ErrorText={ErrorText}
            />
          )}
          <TouchableOpacity
            onPress={next ? handleFinalSubmit : handleSubmit}
            style={{
              backgroundColor: "#ffd800",
              padding: 12,
              borderRadius: 999,
              width: "100%",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "#383e6e",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {next ? "Hoàn tất đăng ký" : "Tiếp tục"}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 32,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "white" }}>Đã có tài khoản ?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={{ color: "#ffd800" }}>Đăng nhập ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
