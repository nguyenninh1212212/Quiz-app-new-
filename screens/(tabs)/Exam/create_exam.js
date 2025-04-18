import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function CreateExamScreen() {
  const navigation = useNavigation(); // Sử dụng navigation thay cho expo-router

  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#6C63FF", paddingHorizontal: 24, paddingVertical: 16, marginBottom: 64 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>
          Tạo đề thi
        </Text>

        <View style={{ backgroundColor: "#D1D1D1", borderRadius: 16, alignItems: "center", justifyContent: "center", padding: 24 }}>
          <Feather name="image" size={100} color="gray" />
        </View>
        <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 8 }}>
          <Text style={{ color: "#4A90E2" }}>Thêm từ máy ?</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "white", padding: 16, borderRadius: 16, marginTop: 16 }}>
          <Text style={{ color: "#4A4A4A" }}>Trường học</Text>
          <View style={{ borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 8, marginTop: 8 }}>
            <Picker selectedValue={school} onValueChange={(item) => setSchool(item)}>
              <Picker.Item label="--Chọn trường--" value="" />
              <Picker.Item label="Trường A" value="A" />
              <Picker.Item label="Trường B" value="B" />
            </Picker>
          </View>

          <Text style={{ color: "#4A4A4A", marginTop: 16 }}>Trình độ</Text>
          <View style={{ borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 8, marginTop: 8 }}>
            <Picker selectedValue={level} onValueChange={(item) => setLevel(item)}>
              <Picker.Item label="--Trình độ--" value="" />
              <Picker.Item label="Cấp 1" value="1" />
              <Picker.Item label="Cấp 2" value="2" />
              <Picker.Item label="Cấp 3" value="3" />
              <Picker.Item label="Đại học/Cao đẳng" value="4" />
            </Picker>
          </View>

          <Text style={{ color: "#4A4A4A", marginTop: 16 }}>Môn học</Text>
          <View style={{ borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 8, marginTop: 8 }}>
            <Picker selectedValue={subject} onValueChange={(item) => setSubject(item)}>
              <Picker.Item label="--Môn học--" value="" />
              <Picker.Item label="Toán" value="math" />
              <Picker.Item label="Lý" value="physics" />
              <Picker.Item label="Hóa" value="chemistry" />
            </Picker>
          </View>
        </View>

        <View style={{ backgroundColor: "white", padding: 16, borderRadius: 16, marginTop: 16 }}>
          <Text style={{ color: "#4A4A4A" }}>Nội dung</Text>
          <TextInput
            multiline
            numberOfLines={20}
            placeholder="Viết câu hỏi và câu trả lời, câu trả lời đúng sẽ được đánh dấu bằng dấu * vào đây"
            style={{ borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 8, marginTop: 8, padding: 8, color: "#4A4A4A", minHeight: 150 }}
            value={content}
            onChangeText={setContent}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            // xử lý lưu bài hoặc điều hướng tùy ý ở đây
            // navigation.navigate("SomeScreen");
          }}
          style={{ backgroundColor: "#FFD700", paddingVertical: 12, borderRadius: 8, marginTop: 24 }}
        >
          <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 }}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
