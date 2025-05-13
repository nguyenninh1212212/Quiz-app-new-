import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import QuizCard from "../../../components/Card/QuizCard";
import QuizCardCreate from "../../../components/Card/QuizCardCreate";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHome } from "../../../api/exam";

export default function HomeScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  // Lấy dữ liệu từ API
  const {
    data: ele,
    isLoading: eload,
    error,
  } = useQuery({
    queryKey: ["ExamList"],
    queryFn: getHome,
    refetchOnWindowFocus: false, // Đảm bảo dữ liệu được tải lại khi quay lại trang
  });

  // Memoize dữ liệu
  const exams = useMemo(() => ele?.data?.exams || [], [ele?.data?.exams]);
  const list = useMemo(() => ele?.data?.myList || [], [ele?.data?.myList]);

  // Hàm xử lý pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries(["eleExam"]); // Thực hiện gọi lại API để tải lại dữ liệu
    setRefreshing(false);
  };

  // Kiểm tra trạng thái loading và lỗi
  if (eload) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#002060",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#002060",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            padding: 20,
          }}
        >
          Đã xảy ra lỗi khi tải dữ liệu.
        </Text>
        <TouchableOpacity
          onPress={() => queryClient.invalidateQueries(["eleExam"])}
          style={{
            marginTop: 16,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#002060", fontWeight: "bold" }}>Thử lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "transparent" }}
      edges={[]}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#002060" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={{ backgroundColor: "#383e6e", marginTop: "1%" }}>
          <View
            style={{
              backgroundColor: "#002060",
              paddingHorizontal: 24,
              paddingTop: 48,
              paddingBottom: 56,
              borderBottomLeftRadius: 80,
              borderBottomRightRadius: 80,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
              Quizz App
            </Text>

            {/* Search box */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 8,
                padding: 12,
                marginTop: 12,
              }}
              onPress={() => navigation.navigate("Tìm kiếm")}
            >
              <Feather name="search" size={20} color="gray" />
              <Text style={{ marginLeft: 8, color: "#6B7280" }}>
                Tìm kiếm...
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nội dung chính */}
          <View
            style={{
              paddingHorizontal: 24,
              backgroundColor: "#383e6e",
              marginTop: 20,
            }}
          >
            {/* Đề mới */}
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Đề mới
            </Text>
            <View
              style={{
                flexDirection: "column",
                borderRadius: 16,
                padding: 4,
                minHeight: 200,
              }}
            >
              {exams.length > 0 ? (
                exams.map((_, index) => (
                  <QuizCard key={index} data={_} navigation={navigation} />
                ))
              ) : (
                <Text style={{ color: "white" }}>Chưa có đề mới</Text>
              )}
            </View>

            {/* Đề đã tạo */}
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "600",
                paddingVertical: 16,
              }}
            >
              Đề đã tạo
            </Text>
            <View style={{ paddingBottom: 160, backgroundColor: "#383e6e" }}>
              <FlatList
                data={list}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <QuizCardCreate data={item} navigation={navigation} />
                )}
                scrollEnabled={false}
                nestedScrollEnabled={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
