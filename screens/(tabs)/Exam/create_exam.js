import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default function CreateExamScreen() {
  const navigation = useNavigation();

  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState(null);
  const [docxFile, setDocxFile] = useState(null); // file docx đã chọn
  console.log("🚀 ~ CreateExamScreen ~ docxFile:", docxFile);

  const fieldsOptions = {
    school: ["Trường A", "Trường B"],
    subject: ["Toán", "Lý", "Hóa"],
  };

  const openModal = (field) => {
    setCurrentField(field);
    setOptions(fieldsOptions[field]);
    setIsModalVisible(true);
  };

  const selectOption = (option) => {
    if (currentField === "school") setSchool(option);
    if (currentField === "subject") setSubject(option);
    setIsModalVisible(false);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Bạn cần cấp quyền truy cập ảnh để chọn ảnh.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const pickDocx = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    console.log("Kết quả trả về từ DocumentPicker:", result);

    // Kiểm tra kỹ hơn về kết quả trả về
    const file = result.assets[0]; // Lấy file từ mảng assets

    // Kiểm tra mimeType của file
    setDocxFile(file); // Lưu thông tin file vào state
  };

  const handleCancelDocx = () => {
    setDocxFile(null); // Đặt lại state docxFile về null khi người dùng hủy
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2a3164" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 64 }}>

          {/* Ảnh minh họa */}
          <View style={{ backgroundColor: "#D1D1D1", borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
            {image ? (
              <Image source={{ uri: image.uri }} style={{ width: "100%", height: 200, borderRadius: 8 }} />
            ) : (
              <Feather name="image" size={200} color="gray" />
            )}
          </View>

          <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 8 }} onPress={pickImage}>
            <Text style={{ color: "#4A90E2" }}>Thêm từ máy ?</Text>
          </TouchableOpacity>

          {/* Trường học */}
          <View style={{ backgroundColor: "white", padding: 16, borderRadius: 16, marginTop: 16 }}>
            <Text style={{ color: "#4A4A4A" }}>Trường học</Text>
            <TouchableOpacity
              onPress={() => openModal("school")}
              style={{ borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 8, padding: 8, marginTop: 8 }}
            >
              <Text style={{ color: "#4A4A4A" }}>{school || "--Chọn trường--"}</Text>
            </TouchableOpacity>
          </View>

          {/* Môn học */}
          <View style={{ backgroundColor: "white", padding: 16, borderRadius: 16, marginTop: 16 }}>
            <Text style={{ color: "#4A4A4A" }}>Môn học</Text>
            <TouchableOpacity
              onPress={() => openModal("subject")}
              style={{ borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 8, padding: 8, marginTop: 8 }}
            >
              <Text style={{ color: "#4A4A4A" }}>{subject || "--Môn học--"}</Text>
            </TouchableOpacity>
          </View>

          {/* Nút chọn file docx */}
          <TouchableOpacity
            onPress={pickDocx}
            style={{
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 16,
              marginTop: 16,
              borderWidth: 1,
              borderColor: "#D1D1D1",
            }}
          >
            <Text style={{ color: "#4A4A4A" }}>{docxFile ? `📄 ${docxFile.name}` : "Chọn file .docx để tải lên (tuỳ chọn)"}</Text>
          </TouchableOpacity>

          {docxFile && (
            <TouchableOpacity
              onPress={handleCancelDocx}
              style={{
                backgroundColor: "#FF6347",
                padding: 12,
                borderRadius: 8,
                marginTop: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Hủy file đã chọn</Text>
            </TouchableOpacity>
          )}

          {/* Nội dung */}
          {!docxFile && (
            <View style={{ backgroundColor: "white", padding: 16, borderRadius: 16, marginTop: 16 }}>
              <Text style={{ color: "#4A4A4A" }}>Nội dung</Text>
              <TextInput
                multiline
                numberOfLines={20}
                placeholder="Viết câu hỏi và câu trả lời, câu trả lời đúng sẽ được đánh dấu bằng dấu * vào đây"
                style={{
                  borderWidth: 1,
                  borderColor: "#D1D1D1",
                  borderRadius: 8,
                  marginTop: 8,
                  padding: 8,
                  color: "#4A4A4A",
                  minHeight: 150,
                }}
                value={content}
                onChangeText={setContent}
              />
            </View>
          )}

          {/* Nút Xác nhận */}
          <TouchableOpacity
            onPress={() => {
              // Xử lý dữ liệu gửi API tại đây:
              const formData = {
                school,
                subject,
                content: docxFile ? null : content,
                image: image ? image.uri : null,
                docxFileUri: docxFile?.uri || null,
              };
              console.log("Dữ liệu gửi:", formData);

              // Ví dụ: navigation.navigate("NextScreen", { data: formData });
            }}
            style={{ backgroundColor: "#FFD700", paddingVertical: 12, borderRadius: 8, marginTop: 24 }}
          >
            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 }}>
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal lựa chọn */}
        <Modal transparent={true} visible={isModalVisible} animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <View style={{ backgroundColor: "white", padding: 24, borderRadius: 8, width: "80%" }}>
              <FlatList
                data={options}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => selectOption(item)}
                    style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: "#D1D1D1" }}
                  >
                    <Text style={{ color: "#4A4A4A" }}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
