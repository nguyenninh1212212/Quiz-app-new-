import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import QuizCard from "../../../components/Card/QuizCard";
import QuizCardCreate from "../../../components/Card/QuizCardCreate";
import { fakeQuizCreatedData } from "../../../fakedata";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#002060" }}>
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

          {/* Ô tìm kiếm */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 8,
              padding: 12,
              marginTop: 12,
            }}
            onPress={() => navigation.navigate("_search")} // thay vì dùng route.push("/Home/_search")
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
          {/* Đề đã làm */}
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Đề đã làm
          </Text>
          <View
            style={{
              flexDirection: "column",
              borderRadius: 16,
              padding: 4,
              minHeight: 200,
            }}
          >
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <QuizCard key={index} data={_} navigation={navigation}/>
              ))}
          </View>

          {/* Đề mới */}
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
          <View style={{ paddingBottom: 160 }}>
            <FlatList
              data={fakeQuizCreatedData}
              numColumns={2} // 2 phần tử trên mỗi dòng
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <QuizCardCreate data={item} />}
              scrollEnabled={false} // Tắt cuộn riêng, để ScrollView cuộn toàn bộ
              nestedScrollEnabled={true}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
