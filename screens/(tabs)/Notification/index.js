import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, StyleSheet } from "react-native";

const notificationsData = [
  {
    id: 1,
    type: "comment",
    user: "Nguyễn Văn B",
    message: "Đã trả lời bạn: đề này lấy dữ...",
    icon: require("../../../assets/images/avatar-tiktok-dep-001.webp"),
    date: "2025-04-28T10:00:00",  // Thêm trường date
  },
  {
    id: 2,
    type: "system",
    title: "Thông báo từ hệ thống",
    message: "Hệ thống bảo trì từ...",
    date: "2025-04-27T10:00:00",  // Thêm trường date
  },
  {
    id: 3,
    type: "exam",
    title: "Đề thi: What is HTML/CSS?",
    user: "Nguyễn Văn B",
    message: "bình luận trong đề thi của bạn...",
    date: "2025-04-29T10:00:00",  // Thêm trường date
    icon: require("../../../assets/images/avatar-tiktok-dep-001.webp"),
  },
];

const NotificationScreen = () => {
  // Sắp xếp theo thời gian (mới nhất trước)
  const sortedNotifications = [...notificationsData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>

      {/* Notification List Container */}
      <View style={styles.listContainer}>
        <ScrollView>
          {sortedNotifications.map((item) => (
            <View key={item.id} style={styles.cardContainer}>
              {item.type === "system" ? (
                <>
                  <Text style={styles.systemTitle}>{item.title}</Text>
                  <Text style={styles.systemMessage}>{item.message}</Text>
                </>
              ) : (
                <View style={styles.notificationRow}>
                  <Image source={item.icon} style={styles.icon} />
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationMessage}>
                      <Text style={styles.notificationUser}>{item.user}</Text> {item.message}
                    </Text>
                  </View>
                </View>
              )}
              <Text style={styles.time}>{new Date(item.date).toLocaleTimeString()}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a3164",
    justifyContent: "center",
    padding: 10,
  },
  header: {
    padding: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  listContainer: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 16,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "#4F537B",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  systemTitle: {
    fontWeight: "bold",
    color: "#FFCC00",
  },
  systemMessage: {
    color: "#ddd",
    marginTop: 5,
  },
  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: "bold",
    color: "white",
  },
  notificationMessage: {
    color: "#ccc",
  },
  notificationUser: {
    fontWeight: "bold",
    color: "white",
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    color: "gray",
  },
});

export default NotificationScreen;
