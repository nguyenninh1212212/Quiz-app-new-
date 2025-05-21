import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext"; // Đường dẫn đến AuthContext
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../../api/auth";
export default function ProfileScreen() {
  const { logout: logout } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
  console.log("🚀 ~ ProfileScreen ~ data:", data);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      logout();
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        {/* Avatar */}
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        {/* Thông tin bên phải */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{data?.data}</Text>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        </View>
        {/* Edit Icon */}
        <TouchableOpacity style={styles.editIcon}>
          <Feather name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Info Section */}
        <View style={styles.infoSection}>
          <ProfileInfo label="Đang theo học tại:" value="Đại học điện lực" />
          <ProfileInfo label="Cấp:" value="Đại học" />
          <ProfileInfo label="Trình độ học vấn:" value="Sinh viên năm 3" />
          <ProfileInfo label="Chuyên ngành:" value="Công nghệ phần mềm" />
          <ProfileInfo label="Email:" value="Abc@gmail.com" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const ProfileInfo = ({ label, value }) => (
  <View style={styles.profileInfoContainer}>
    <Text style={styles.profileLabel}>{label}</Text>
    <Text style={styles.profileValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#002060",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#383e6e",
  },
  header: {
    backgroundColor: "#002060",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  infoContainer: {
    marginLeft: 16,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  premiumBadge: {
    marginTop: 4,
    backgroundColor: "#F1C40F",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  premiumText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  editIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  infoSection: {
    backgroundColor: "#2D3250",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  logoutButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  profileInfoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#4A4A4A",
    paddingVertical: 8,
  },
  profileLabel: {
    color: "white",
    fontWeight: "bold",
  },
  profileValue: {
    color: "#B3B3B3",
  },
});
