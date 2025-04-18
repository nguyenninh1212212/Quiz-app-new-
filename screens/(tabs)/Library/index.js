import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import QuizCard from "../../../components/Card/QuizCard";
import { fakeQuizData } from "../../../fakedata";

const LibraryScreen = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const renderTabContent = () => (
    <>
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === "All" && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter("All")}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === "All" && styles.filterTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#8b9cb5"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={fakeQuizData}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <QuizCard data={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );

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
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab === "saved" ? "Đề đã lưu" : "Mục"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderTabContent()}
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
  searchContainer: {
    margin: 16,
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: "#3d4480",
    borderRadius: 8,
    padding: 10,
    color: "white",
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#3d4480",
  },
  filterButtonActive: {
    backgroundColor: "#f5c542",
  },
  filterText: {
    color: "white",
  },
  filterTextActive: {
    color: "#2a3164",
    fontWeight: "bold",
  },
  listContainer: {
    flexDirection: "column",
    paddingBottom: 16,
    justifyContent: "space-around",
    alignContent: "center",
    marginRight: 16,
  },
  cardContainer: {
    paddingHorizontal: 8,
  },
});

export default LibraryScreen;
