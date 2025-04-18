import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QuizCard from "@/components/Card/QuizCard";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0C1D57", padding: 16, paddingTop: 80 }}>
      {/* Thanh tìm kiếm */}
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 12, borderRadius: 12, marginBottom: 12 }}>
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            style={{ flex: 1, color: "black" }}
          />
          <TouchableOpacity>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Các bộ lọc */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
          <TouchableOpacity style={{ backgroundColor: "#FBBF24", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Mới nhất</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "#6B7280", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Cơ bản</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "#3E4D8E", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Tìm nhiều nhất</Text>
          </TouchableOpacity>
        </View>

        {/* Kết quả tìm kiếm */}
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>Kết quả</Text>
        <ScrollView style={{ spaceY: 12 }}>
          {[...Array(4)].map((_, index) => (
            <QuizCard key={index} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
