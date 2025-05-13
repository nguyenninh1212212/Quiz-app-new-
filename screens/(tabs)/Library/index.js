import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SaveTab from "./save"; // ⬅ import tab đã tách
import FolderTap from "./folder";
const LibraryScreen = () => {
  const [activeTab, setActiveTab] = useState("saved");

  const renderTabContent = () => {
    switch (activeTab) {
      case "saved":
        return <SaveTab />;
      case "categories":
        return <FolderTap />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thư viện</Text>
      </View>

      <View style={styles.tabContainer}>
        {["saved", "categories"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === "saved" ? "Đề đã lưu" : "Mục"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>{renderTabContent()}</View>
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
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#3d4480",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#f5c542",
  },
  tabText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#f5c542",
  },
});

export default LibraryScreen;
