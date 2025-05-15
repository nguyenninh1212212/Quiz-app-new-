import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./bottomTap"; // Assuming this is your bottom tabs screen
import ExamCreate from "../screens/(tabs)/Exam/create_exam";
import ProfileDetail from "../screens/(tabs)/Profile/profile";
import Result from "../screens/(tabs)/detail/result";
import Exam from "../screens/(tabs)/Exam/[id]";
import ExamDetail from "../screens/(tabs)/detail/[id]";
import Search from "../screens/(tabs)/Home/_search";
import Channel from "../screens/(tabs)/Channel/ChannelScreen";
import Login from "../screens/(auth)/login";
import Register from "../screens/(auth)/register";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext to manage authentication state
import { Feather } from "@expo/vector-icons";
import Folder from "../screens/(tabs)/Library/[id]";
const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { isAuthenticated } = useContext(AuthContext); // 👈 lấy từ context

  if (isAuthenticated === null) return null; // chờ load token

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0C1D57" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Trang chủ"
            component={BottomTabs}
            options={{ headerShown: false, unmountOnBlur: false }}
          />
          <Stack.Screen
            name="Tạo đề thi"
            component={ExamCreate}
            options={{ presentation: "modal" }} // 👈 quan trọng!
          />
          <Stack.Screen name="Profile" component={ProfileDetail} />
          <Stack.Screen
            name="Kết quả"
            component={Result}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen name="Làm câu hỏi" component={ExamDetail} />

          <Stack.Screen
            name="Đề thi"
            component={Exam}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Trang chủ")}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Feather name="chevron-left" size={28} color="#fff" />
                  <Text style={{ color: "#fff", marginLeft: 6 }}>Home</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Mục"
            component={Folder}
            options={({ navigation }) => ({
              presentation: "modal",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Feather name="chevron-left" size={28} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name="Tìm kiếm"
            component={Search}
            options={{ presentation: "modal" }} // 👈 quan trọng!
          />
          <Stack.Screen name="Kênh" component={Channel} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
