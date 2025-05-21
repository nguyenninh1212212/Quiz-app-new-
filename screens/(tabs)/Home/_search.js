import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Popup from "./../../../components/popup/Popup";
import { useQuery } from "@tanstack/react-query";
import { getAllExams } from "../../../api/exam";
import QuizCard from "../../../components/Card/QuizCard";
import { useNavigation } from "@react-navigation/native";
// import Paginator from "../../../components/Paginator";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState(""); // Tìm kiếm text
  const [showPopup, setShowPopup] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigation = useNavigation();
  // Dữ liệu từ API
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["exams", page],
    queryFn: () => getAllExams(page),
  });

  const [filteredData, setFilteredData] = useState([]);

  const filterData = () => {
    if (!data) return; // Nếu dữ liệu chưa có, không lọc

    let filtered = data;

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedSchool) {
      filtered = filtered.filter((item) => item.school === selectedSchool);
    }

    if (selectedSubject) {
      filtered = filtered.filter((item) => item.subject === selectedSubject);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    if (data) {
      filterData();
    }
  }, [data, searchText, selectedSchool, selectedSubject]);

  const schools = [
    "Truong Quoc te Viet My",
    "Truong THPT Le Quy Don",
    "Truong THCS Hoa Sen",
    "Truong THPT Nguyen Du",
  ];
  const subjects = [
    "Tin hoc",
    "Tieng Anh",
    "Ngu van",
    "Am nhac",
    "Lich su",
    "Sinh hoc",
    "Hoa hoc",
    "Vat ly",
    "Mon nhac",
    "GDCD",
    "Toan hoc",
  ];

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#2a3164",
        padding: 16,
        paddingTop: 80,
      }}
    >
      {/* Thanh tìm kiếm */}
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              flex: 1,
              padding: 12,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <TextInput
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              style={{
                flex: 1,
                color: "black",
              }}
            />
            <TouchableOpacity onPress={filterData}>
              <Ionicons name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Bộ lọc */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FBBF24",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 12,
              marginBottom: 16,
            }}
            onPress={() => setShowPopup(true)} // Hiển thị popup khi bấm nút lọc
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>Lọc</Text>
          </TouchableOpacity>
        </View>

        {/* Kết quả tìm kiếm */}
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 12,
          }}
        >
          Kết quả
        </Text>

        {/* {filteredData.length > 0 ? (
          <Paginator
            data={filteredData}
            page={page}
            setPage={setPage}
            renderItem={(item) => (
              <QuizCard key={item.id} data={item} navigation={navigation} />
            )}
            loading={isLoading}
            loadingMore={isFetching && page > 0}
            hasMore={filteredData.length === 5}
          />
        ) : (
          <Text>Chưa có</Text>
        )} */}

        {filteredData.map((item) => (
          <QuizCard key={item.id} data={item} navigation={navigation} />
        ))}
      </View>

      {/* Popup lọc */}
      <Popup visible={showPopup} onClose={() => setShowPopup(false)}>
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
          style={{ maxHeight: 400 }}
        >
          {/* Các bộ lọc môn học */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Chọn môn học
          </Text>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor:
                  selectedSubject === subject ? "#3E4D8E" : "#ddd",
                marginBottom: 8,
                borderRadius: 8,
              }}
              onPress={() => {
                if (selectedSubject === subject) {
                  setSelectedSubject("");
                } else {
                  setSelectedSubject(subject);
                }
              }}
            >
              <Text
                style={{
                  color: selectedSubject === subject ? "white" : "black",
                }}
              >
                {subject}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Các bộ lọc trường học */}
          <Text
            style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}
          >
            Chọn trường học
          </Text>
          {schools.map((school) => (
            <TouchableOpacity
              key={school}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: selectedSchool === school ? "#3E4D8E" : "#ddd",
                marginBottom: 8,
                borderRadius: 8,
              }}
              onPress={() => {
                if (selectedSchool === school) {
                  setSelectedSchool("");
                } else {
                  setSelectedSchool(school);
                }
              }}
            >
              <Text
                style={{
                  color: selectedSchool === school ? "white" : "black",
                }}
              >
                {school}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Áp dụng bộ lọc */}
          <TouchableOpacity
            style={{
              backgroundColor: "#3E4D8E",
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={() => {
              filterData();
              setShowPopup(false);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Áp dụng bộ lọc
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Popup>
    </SafeAreaView>
  );
};

export default SearchScreen;
