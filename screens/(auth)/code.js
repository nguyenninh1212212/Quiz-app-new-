import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CodeScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(600); // 600 giây = 10 phút
  const inputsRef = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (timeLeft === 0) {
      Alert.alert(
        "Hết hạn",
        "Mã xác minh đã hết hạn. Vui lòng yêu cầu mã mới."
      );
      // Tự động quay lại màn trước (hoặc bạn có thể reset code)
      navigation.goBack();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, navigation]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else if (text === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerifyCode = () => {
    if (timeLeft === 0) {
      Alert.alert("Lỗi", "Mã đã hết hạn, vui lòng lấy mã mới.");
      return;
    }
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ 6 chữ số.");
      return;
    }
    if (fullCode === "123456") {
      Alert.alert("Thành công", "Mã xác nhận đúng!");
      navigation.navigate("ResetPassword");
    } else {
      Alert.alert("Sai mã", "Mã xác nhận không chính xác.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Xác minh mã</Text>
      <Text style={styles.labelText}>
        Nhập mã xác minh gồm 6 chữ số đã gửi đến email
      </Text>

      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            ref={(ref) => (inputsRef.current[index] = ref)}
            autoFocus={index === 0}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <Text style={styles.timerText}>
        Thời gian hiệu lực: {formatTime(timeLeft)}
      </Text>

      <TouchableOpacity
        style={[
          styles.verifyButton,
          timeLeft === 0 && { backgroundColor: "#999" },
        ]}
        onPress={handleVerifyCode}
        disabled={timeLeft === 0}
      >
        <Text style={styles.verifyButtonText}>Xác minh</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Quay lại</Text>
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
    textAlign: "center",
    color: "#ffd800",
    marginBottom: 24,
  },
  labelText: {
    color: "#ffd800",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  codeInput: {
    width: 48,
    height: 58,
    borderRadius: 10,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  timerText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  verifyButton: {
    backgroundColor: "#ffd800",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 16,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  backText: {
    color: "#ffd800",
    textAlign: "center",
    fontSize: 14,
  },
});
