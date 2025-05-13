import React, { useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const QuizCard = ({ data ,navigation}) => {
    const { createdAt,auth,subject,school,cover,title ,avatar,id} = data;

  const handleCardPress = () => {
    navigation.navigate("Đề thi", { id: id });
  }

  const handleProfilePress = useCallback(() => {
    navigation.navigate("Channel");
  }, [navigation]);

  return (
<TouchableOpacity
  style={{
    backgroundColor: "white",
    borderRadius: 16,
    marginVertical: 12,
    padding: 0,
    height: 100,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }}
  onPress={handleCardPress}
>
  {/* Ảnh bên trái */}
  <View style={{ width: 120, height: "100%" }}>
    <Image
      source={{ uri: cover || "https://tesolcourse.edu.vn/wp-content/uploads/2022/02/2-2.jpg" }}
      style={{
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
      }}
      resizeMode="cover"
    />
  </View>

  {/* Nội dung bên phải */}
  <View style={{ flex: 1, padding: 12, justifyContent: "space-evenly" ,gap: 2 }}>
    <Text style={{ fontSize: 12, lineHeight: 18, fontWeight: "bold", color: "#1a202c" }}
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

    <View style={{ flexDirection: "row", alignItems: "center"}}>
      <TouchableOpacity onPress={handleProfilePress}>
        <Avatar.Image
          source={{ uri:avatar || "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"  }}
          size={30}
        />
      </TouchableOpacity>
      <View style={{ marginLeft: 12 }}>
        <Text style={{ fontSize: 10, fontWeight: "600", color: "#2d3748" }}>{auth}</Text>
        <Text style={{ fontSize: 10, color: "#718096" }}>{school}</Text>
      </View>
    </View>
  </View>
</TouchableOpacity>

  );
};

export default QuizCard;
