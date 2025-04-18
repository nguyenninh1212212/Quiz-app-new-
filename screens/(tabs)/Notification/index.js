import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

const notifications = [
  {
    id: 1,
    type: "comment",
    user: "Nguyễn Văn B",
    time: "10:00 pm",
    message: "Đã trả lời bạn: đề này lấy dữ...",
    icon: require("../../../assets/images/avatar-tiktok-dep-001.webp"),
  },
  {
    id: 2,
    type: "system",
    title: "Thông báo từ hệ thống",
    message: "Hệ thống bảo trì từ...",
    time: "10:00 pm",
  },
  {
    id: 3,
    type: "exam",
    title: "Đề thi: What is HTML/CSS?",
    user: "Nguyễn Văn B",
    message: "bình luận trong đề thi của bạn...",
    time: "10:00 pm",
    icon: require("../../../assets/images/avatar-tiktok-dep-001.webp"),
  },
];

const NotificationScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#2D3250", paddingTop: 40 }}>
      {/* Header */}
      <View style={{ alignItems: "center", paddingBottom: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>Thông báo</Text>
      </View>

      {/* Search & Filter */}
      <View style={{ flexDirection: "row", paddingHorizontal: 16, marginBottom: 10 }}>
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#4F537B", borderRadius: 8, alignItems: "center", paddingHorizontal: 10 }}>
          <Ionicons name="search" size={20} color="white" />
          <TextInput placeholder="Tìm kiếm" placeholderTextColor="#ccc" style={{ flex: 1, paddingVertical: 8, color: "white" }} />
        </View>
        <TouchableOpacity style={{ marginLeft: 10, backgroundColor: "#A8AFCF", padding: 8, borderRadius: 8 }}>
          <FontAwesome5 name="sort-amount-down" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, paddingHorizontal: 10 }}>
        {["Tất cả", "Hệ thống", "Bình luận", "Đề thi"].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: index === 0 ? "#FFCC00" : "transparent",
              paddingHorizontal: 10, // Giảm padding ngang
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#FFCC00",
              marginHorizontal: 2, // Giảm khoảng cách giữa các tab
            }}
          >
            <Text style={{ color: index === 0 ? "black" : "#FFCC00", fontSize: 14 }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Notification List Container */}
      <View style={{ backgroundColor: "#3B3F5C", borderRadius: 10, padding: 10, marginHorizontal: 16, flex: 1 }}>
        <ScrollView>
          {notifications.map((item) => (
            <View key={item.id} style={{ backgroundColor: "#4F537B", padding: 10, marginBottom: 10, borderRadius: 8 }}>
              {item.type === "system" ? (
                <>
                  <Text style={{ fontWeight: "bold", color: "#FFCC00" }}>{item.title}</Text>
                  <Text style={{ color: "#ddd", marginTop: 5 }}>{item.message}</Text>
                </>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={item.icon} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>{item.title}</Text>
                    <Text style={{ color: "#ccc" }}>
                      <Text style={{ fontWeight: "bold", color: "white" }}>{item.user}</Text> {item.message}
                    </Text>
                  </View>
                </View>
              )}
              <Text style={{ textAlign: "right", fontSize: 12, color: "gray" }}>{item.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>


    </View>
  );
};

export default NotificationScreen;
