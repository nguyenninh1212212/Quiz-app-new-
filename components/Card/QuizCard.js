import React, { useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const QuizCard = ({ data }) => {
  const navigation = useNavigation();  // Lấy navigation bằng hook

  const handleCardPress = () => {
    navigation.navigate("Đề thi", { id: "456" });
  }

  const handleProfilePress = useCallback(() => {
    navigation.navigate("Channel");
  }, [navigation]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        paddingVertical: 4,
        marginVertical: 12,
        paddingHorizontal: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }}
      onPress={handleCardPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Hình ảnh logo bên trái */}
        <Image
          source={{
            uri: "https://cdn.iconscout.com/icon/free/png-256/html5-40-1175193.png",
          }}
          style={{ width: 64, height: 64 }}
          resizeMode="contain"
        />

        {/* Nội dung chính */}
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={{ fontSize: 14, lineHeight: 18, fontWeight: "bold", color: "#1a202c" }}>
            What is HTML, CSS?
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
            {/* Make the avatar clickable */}
            <TouchableOpacity onPress={handleProfilePress}>
              <Avatar.Image
                source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
                size={30}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#2d3748" }}>
                Nguyễn Văn B
              </Text>
              <Text style={{ fontSize: 12, color: "#718096" }}>Đại học điện lực</Text>
            </View>
          </View>
        </View>

        {/* Điểm số */}
        <View
          style={{
            backgroundColor: "#fbbf24", // Tương đương với bg-yellow-400
            borderRadius: 9999,
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2d3748" }}>
            26/30
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuizCard;
