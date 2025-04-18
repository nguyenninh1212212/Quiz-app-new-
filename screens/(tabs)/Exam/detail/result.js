import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation từ react-navigation

const ResultScreen = ({ route }) => {
  const navigation = useNavigation(); // Hook navigation

  const numScore = Number(route.params.score || "0");  // Lấy params từ route
  const numCorrect = Number(route.params.correctAnswers || "0");
  const numTotal = Number(route.params.totalQuestions || "0");

  // Tính toán tỷ lệ hoàn thành
  const completionPercentage = Math.round((numCorrect / numTotal) * 100) || 0;
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1440" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        <Text style={{ color: "white", fontSize: 32, fontWeight: "bold", marginBottom: 32 }}>Kết quả</Text>
        
        {/* Vòng tròn hiển thị điểm */}
        <View style={{ backgroundColor: "#FBBF24", width: 160, height: 160, borderRadius: 80, justifyContent: "center", alignItems: "center", marginBottom: 32 }}>
          <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>{(numScore / 10).toFixed(2)}</Text>
        </View>
        
        <Text style={{ color: "white", fontSize: 24, fontWeight: "600", marginBottom: 24 }}>Điểm</Text>
        
        {/* Container thống kê */}
        <View style={{ backgroundColor: "white", borderRadius: 16, padding: 24, width: "100%", marginBottom: 32 }}>
          {/* Hoàn thành */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "#F472B6", marginRight: 12 }} />
              <Text style={{ fontWeight: "600", fontSize: 16 }}>Hoàn thành</Text>
            </View>
            <Text style={{ color: "#F472B6", fontWeight: "600", fontSize: 18 }}>{completionPercentage}%</Text>
          </View>
          
          {/* Tổng số câu hỏi */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "#3B82F6", marginRight: 12 }} />
              <Text style={{ fontWeight: "600", fontSize: 16 }}>Câu hỏi</Text>
            </View>
            <Text style={{ color: "#3B82F6", fontWeight: "600", fontSize: 18 }}>{numTotal}</Text>
          </View>
          
          {/* Câu đúng */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "#22C55E", marginRight: 12 }} />
              <Text style={{ fontWeight: "600", fontSize: 16 }}>Câu đúng</Text>
            </View>
            <Text style={{ color: "#22C55E", fontWeight: "600", fontSize: 18 }}>{numCorrect}</Text>
          </View>
          
          {/* Câu sai */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "#F87171", marginRight: 12 }} />
              <Text style={{ fontWeight: "600", fontSize: 16 }}>Câu sai</Text>
            </View>
            <Text style={{ color: "#F87171", fontWeight: "600", fontSize: 18 }}>
              {numTotal - numCorrect}
            </Text>
          </View>
        </View>
        
        {/* Các nút hành động */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 32 }}>
          <TouchableOpacity style={{ backgroundColor: "#2563EB", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="save-outline" size={30} color="white" />
            <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>Lưu</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ backgroundColor: "#4F46E5", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="thumbs-up-outline" size={30} color="white" />
            <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>Like</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ backgroundColor: "#F472B6", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={30} color="white" />
            <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>
        
        {/* Nút xác nhận */}
        <TouchableOpacity 
          style={{ backgroundColor: "#FBBF24", width: "100%", paddingVertical: 16, borderRadius: 16, alignItems: "center" }}
          onPress={() => navigation.navigate("Exam")} // Sử dụng navigation.navigate thay vì router.push
        >
          <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;
