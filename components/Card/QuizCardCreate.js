import React, { useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const QuizCardCreate = ({ data, navigation }) => {
  const { title, user, questions, image } = data;

  const handleCardPress = useCallback(() => {
    // Điều hướng đến màn hình "Exam" với id "1"
    navigation.navigate("Exam", { id: "1" });
  }, [navigation]);

  const handleProfilePress = useCallback(() => {
    // Điều hướng đến màn hình "Channel"
    navigation.navigate("Channel");
  }, [navigation]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        width: "48%",
        height: 240,
        margin: 4,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }}
      onPress={handleCardPress}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: 112,
        }}
      />

      {/* Nội dung Card */}
      <View style={{ padding: 8, flex: 1, justifyContent: "space-between", backgroundColor: "#f7fafc" }}>
        {/* Thông tin người tạo */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={{ uri: user.avatar }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
              }}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: 8 }}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 8 }}>
              {user.name}
            </Text>
            <Text style={{ color: "#a0aec0", fontSize: 10 }}>
              {user.university}
            </Text>
          </View>
        </View>

        {/* Nội dung đề thi */}
        <Text style={{ color: "black", fontWeight: "600", marginTop: 4, fontSize: 12, textOverflow: "ellipsis" }}>
          {title}
        </Text>

        {/* Số câu hỏi */}
        <View
          style={{
            backgroundColor: "#5A67D8", // Tương đương với bg-indigo-600
            borderRadius: 9999,
            paddingVertical: 4,
            paddingHorizontal: 12,
            alignItems: "center",
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
            {questions} câu
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuizCardCreate;
