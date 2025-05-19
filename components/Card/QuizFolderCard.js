import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Avatar } from "react-native-paper";

const QuizCardFolder = ({ data, onDelete }) => {
  const { id, title, subject, cover, auth, school, avatar } = data;
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("Đề thi", { id });
  };

  const handleProfilePress = useCallback(() => {
    navigation.navigate("Channel");
  }, [navigation]);

  // Khi giữ lâu: hỏi xác nhận xóa và gọi onDelete truyền từ cha
  const handleLongPress = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc muốn xóa đề thi này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            if (onDelete) {
              onDelete(id);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        marginVertical: 12,
        height: 100,
        overflow: "hidden",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }}
      onPress={handleCardPress}
      onLongPress={handleLongPress} // Gọi khi giữ lâu
    >
      <View style={{ width: 120, height: "100%" }}>
        <Image
          source={{ uri: cover }}
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{ flex: 1, padding: 12, justifyContent: "space-evenly", gap: 2 }}
      >
        <Text
          style={{ fontSize: 12, fontWeight: "bold", color: "#1a202c" }}
          numberOfLines={1}
        >
          {title}
        </Text>

        <View
          style={{
            backgroundColor: "#fbbf24",
            borderRadius: 9999,
            paddingVertical: 2,
            paddingHorizontal: 6,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ fontSize: 8, fontWeight: "bold", color: "#2d3748" }}>
            {subject}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Avatar.Image source={{ uri: avatar }} size={30} />
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 10, fontWeight: "600", color: "#2d3748" }}>
              {auth}
            </Text>
            <Text style={{ fontSize: 10, color: "#718096" }}>{school}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuizCardFolder;
  