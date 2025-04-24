import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook

const Exam = () => {
  const [activeTab, setActiveTab] = useState(false);
  const navigation = useNavigation(); // Initialize the navigation hook

  const onPress = useCallback(() => {
    navigation.navigate("Làm câu hỏi", { id: "1" }); // Navigate to Detail screen
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2a3164",padding:16 }}>
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
            source={{
              uri: "https://topviecit.vn/blog/wp-content/uploads/2021/11/thumb-5.jpg",
            }}
            style={{ width: "100%", height: 224, borderRadius: 16 }}
            resizeMode="cover"
          />
        </View>

        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
          What is HTML, CSS?
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
            onPress={onPress} // Navigate to the Detail screen
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
          >
            <Text style={{ color: "black", fontWeight: "600" }}>Lưu</Text>
          </TouchableOpacity>
        </View>

        {/* Thông tin tác giả */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>Nguyễn Văn B</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              Đại học điện lực
            </Text>
          </View>
        </View>

        {/* Tabs */}
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
              fon: "bold",
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
              fontWeight: "bold",
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

        {/* Hiển thị nội dung theo tab */}
        <View style={{ padding: 16 }}>
          {activeTab === false ? (
            <Text style={{ color: "#4B4B4B" }}>Nội dung bài kiểm tra...</Text>
          ) : (
            <Text style={{ color: "#4B4B4B" }}>Kết quả bài kiểm tra...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Exam;
