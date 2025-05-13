// src/screens/Library/tabs/SaveTab.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import QuizCard from "../../../components/Card/QuizCard";
import { fakeQuizData } from "../../../fakedata";

const SaveTab = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredData = fakeQuizData.filter((item) => {
    const matchesSubject =
      selectedFilter === "All" || item.subject === selectedFilter;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const filters = ["All", "Vật lý", "Toán", "Lịch sử"];

  return (
    <FlatList
      data={filteredData}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <QuizCard data={item} />
        </View>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={() => (
        <View style={styles.filterSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="#8b9cb5"
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.filterContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: "#3d4480",
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    color: "white",
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
    padding: 10,
    justifyContent: "space-around",
    alignContent: "center",
  },
  cardContainer: {
    paddingHorizontal: 8,
  },
});

export default SaveTab;
