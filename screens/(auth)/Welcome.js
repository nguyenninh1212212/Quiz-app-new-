import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn đến với</Text>
      <Text style={styles.appName}>QuizzApp 🎉</Text>

      <Text style={styles.description}>
        Kiến thức là sức mạnh, nhưng chơi quiz thì còn vui nữa! ✨
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={handleNext}>
        <Text style={styles.startButtonText}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383e6e",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: "#ffd800",
    marginBottom: 8,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffd800",
    marginBottom: 32,
  },
  image: {
    width: width * 0.7,
    height: 200,
    marginBottom: 24,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  startButton: {
    backgroundColor: "#ffd800",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
