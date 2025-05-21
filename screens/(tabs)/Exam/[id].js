import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getDetailExam } from "../../../api/exam";
import Popup from "../../../components/popup/Popup";
import AddToFolder from "../Library/AddToFolder";

const modes = ["exam", "practice"];

const Exam = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [mode, setMode] = useState(modes[0]);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["exam", id],
    queryFn: () => getDetailExam(id),
  });

  const examDetail = data?.data;

  const { title, cover, school, subject, auth, avatar } = examDetail || {};

  const quest = examDetail?.quest;

  const onPress = useCallback(() => {
    navigation.navigate("Làm câu hỏi", { id, mode });
  }, [navigation, id, mode]);

  const onOpenListFolder = () => {
    setOpen(!open);
  };

  if (isLoading) {
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
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Đã xảy ra lỗi khi tải dữ liệu.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2a3164", padding: 16 }}>
      <ScrollView
        style={{
          backgroundColor: "#f4f4f4",
          flex: 1,
          padding: 16,
          borderRadius: 24,
        }}
      >
        <View style={{ backgroundColor: "#e1e1e1", borderRadius: 16 }}>
          <Image
            source={{ uri: cover }}
            style={{ width: "100%", height: 224, borderRadius: 16 }}
            resizeMode="cover"
          />
        </View>

        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
          {title}
        </Text>

        <Text
          style={{
            backgroundColor: "#fbbf24",
            borderRadius: 9999,
            paddingVertical: 2,
            paddingHorizontal: 6,
            alignSelf: "flex-start",
            marginTop: 10,
          }}
        >
          {subject}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 8,
          }}
        >
          <Ionicons name="eye" size={16} color="gray" />
          <Text style={{ color: "gray" }}>100</Text>
          <Ionicons name="people" size={16} color="gray" />
          <Text style={{ color: "gray" }}>100</Text>
          <Ionicons name="bookmark" size={16} color="gray" />
          <Text style={{ color: "gray" }}>100</Text>
        </View>

        {/* Mode Selector */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 16,
            backgroundColor: "#ffffff",
            padding: 8,
            borderRadius: 12,
          }}
        >
          {modes.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setMode(item)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 9999,
                backgroundColor: mode === item ? "#1E90FF" : "#dcdcdc",
              }}
            >
              <Text style={{ color: mode === item ? "white" : "black" }}>
                {item === "exam" ? "Thi thử" : "Luyện tập"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buttons Bắt đầu và Lưu */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#FFD700",
              paddingVertical: 12,
              width: "48%",
              borderRadius: 12,
              alignItems: "center",
            }}
            onPress={onPress}
          >
            <Text style={{ color: "black", fontWeight: "600" }}>Bắt đầu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingVertical: 12,
              alignItems: "center",
              borderRadius: 12,
              width: "48%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}
            onPress={onOpenListFolder}
          >
            <Text style={{ color: "black", fontWeight: "600" }}>Lưu</Text>
          </TouchableOpacity>
        </View>

        {/* Thông tin tác giả */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Image
            source={{ uri: avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>{auth}</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>{school}</Text>
          </View>
        </View>

        {/* Tabs Nội dung và Kết quả */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#dcdcdc",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 8,
              borderBottomWidth: activeTab === false ? 2 : 0,
              borderBottomColor: "#1E90FF",
            }}
            onPress={() => setActiveTab(false)}
          >
            <Text style={{ color: activeTab === false ? "black" : "#A9A9A9" }}>
              Nội dung
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 8,
              borderBottomWidth: activeTab === true ? 2 : 0,
              borderBottomColor: "#1E90FF",
            }}
            onPress={() => setActiveTab(true)}
          >
            <Text style={{ color: activeTab === true ? "black" : "#A9A9A9" }}>
              Kết quả
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nội dung theo tab */}
        <View style={{ padding: 16 }}>
          {activeTab === false ? (
            <View>
              {quest?.slice(0, 4).map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 16,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.question}
                  </Text>
                  <View style={{ marginTop: 8 }}>
                    {item.answer.map((a, i) => (
                      <Text key={i} style={{ fontSize: 16 }}>
                        {a}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}

              <Text
                style={{
                  fontSize: 14,
                  margin: 16,
                  textAlign: "center",
                  color: "#1E90FF",
                }}
                onPress={onPress}
              >
                Vào làm bài kiểm tra để xem nội dung câu hỏi
              </Text>
            </View>
          ) : (
            <Text style={{ color: "#4B4B4B" }}>Kết quả bài kiểm tra...</Text>
          )}
        </View>
      </ScrollView>

      <Popup
        children={<AddToFolder idExam={id} />}
        onClose={() => setOpen(!open)}
        visible={open}
      />
    </SafeAreaView>
  );
};

export default Exam;
