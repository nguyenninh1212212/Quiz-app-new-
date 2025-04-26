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
import { useMutation } from "@tanstack/react-query";
import { createExam } from "../../../api/exam"; 
import { useQuery } from "@tanstack/react-query";
import { getEleExam } from "../../../api/exam"; 

export default function CreateExamScreen() {
  const navigation = useNavigation();

  const [school, setSchool] = useState({id:"", name:""});
  const [subject, setSubject] = useState({id:"", name:""});
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState(null);
  const [docxFile, setDocxFile] = useState(null);
  
  const {data:ele,isLoading: eload} = useQuery({
    queryKey:["eleExam"],
    queryFn:()=> getEleExam()
  });
  console.log("🚀 ~ CreateExamScreen ~ ele:", ele?.data.schools)

  if (eload) return <Text>Loading...</Text>;

  const mutation=useMutation({
    mutationFn: (formData) => createExam(formData),
    onSuccess: () => {
      Alert.alert("Tạo đề thi thành công!");
      navigation.navigate("ExamList");
    },
    onError: (error) => {
      console.error("Lỗi khi tạo đề thi:", error);
      Alert.alert("Lỗi", "Không thể tạo đề thi. Vui lòng thử lại.");
    },
  });

  const fieldsOptions = {
    school: ele?.data.schools,
    subject: ele?.data.subjects,
  };

  const openModal = (field) => {
    setCurrentField(field);
    setOptions(fieldsOptions[field]);
    setIsModalVisible(true);
  };

  const selectOption = (id, name) => {
    if (currentField === "school") {
      setSchool({ id, name });
    }
    if (currentField === "subject") {
      setSubject({id,name});
    }
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

    const file = result.assets[0];
    setDocxFile(file);
  };

  const handleCancelDocx = () => {
    setDocxFile(null);
  };

  const handleSubmit = () => {
    const formData = new FormData();
  
    if (image) {
      formData.append("cover", {
        uri: image.uri,
        name: image.fileName,
        type: "image/jpeg",
      });
    }
  
    if (docxFile) {
      formData.append("docx", {
        uri: docxFile.uri,
        name: docxFile.name,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
    }
  
    const examData = {
      title: title,
      subject: subject.id,
      school: school.id,
    };
  
    formData.append("examData", JSON.stringify(examData));
  
    mutation.mutate(formData);
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

          <View style={{ backgroundColor: "white", borderRadius: 16, padding: 16, marginTop: 16 }}>

            {/* Tiêu đề */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "#4A4A4A", fontWeight: "600" }}>🪧Tiêu đề</Text>
              <TextInput
                placeholder="Nhập tiêu đề đề thi"
                value={title}
                onChangeText={setTitle}
                style={{
                  borderWidth: 1,
                  borderColor: "#D1D1D1",
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 8,
                  color: "#4A4A4A",
                }}
              />
            </View>

            {/* Trường học */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "#4A4A4A", fontWeight: "600" }}>🏫Trường học</Text>
              <TouchableOpacity
                onPress={() => openModal("school")}
                style={{
                  borderWidth: 1,
                  borderColor: "#D1D1D1",
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: "#4A4A4A" }}>{school.name || "--Chọn trường--"}</Text>
              </TouchableOpacity>
            </View>

            {/* Môn học */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "#4A4A4A", fontWeight: "600" }}>📚Môn học</Text>
              <TouchableOpacity
                onPress={() => openModal("subject")}
                style={{
                  borderWidth: 1,
                  borderColor: "#D1D1D1",
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: "#4A4A4A" }}>{subject.name || "--Môn học--"}</Text>
              </TouchableOpacity>
            </View>

            {/* Chọn file .docx */}
            <Text style={{ color: "#4A4A4A", fontWeight: "600" }}>📄Chọn file</Text>

            <TouchableOpacity
              onPress={pickDocx}
              style={{
                backgroundColor: "#fff",
                padding: 16,
                borderRadius: 8,
                marginTop: 16,
                borderWidth: 1,
                borderColor: "#D1D1D1",
              }}
            >
              <Text style={{ color: "#4A4A4A" }}>{docxFile ? `📄 ${docxFile.name}` : "Chọn file .docx để tải lên (tuỳ chọn)"}</Text>
            </TouchableOpacity>

            {/* Xóa file .docx đã chọn */}
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
              <View style={{ marginTop: 16 }}>
                <Text style={{ color: "#4A4A4A", fontWeight: "600" }}>📖Nội dung</Text>
                <TextInput
                  multiline
                  placeholder="Viết câu hỏi và câu trả lời, câu trả lời đúng sẽ được đánh dấu bằng dấu * vào đây"
                  style={{
                    borderWidth: 1,
                    borderColor: "#D1D1D1",
                    borderRadius: 8,
                    marginTop: 8,
                    padding: 12,
                    color: "#4A4A4A",
                    minHeight: 150,
                    maxHeight: 400,
                    textAlignVertical: "top",
                  }}
                  value={content}
                  onChangeText={setContent}
                />
              </View>
            )}
          </View>

          {/* Nút xác nhận */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#FFD700",
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 24,
            }}
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
                    onPress={() => selectOption(item?.id, item?.name)}
                    style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: "#D1D1D1" }}
                  >
                    <Text style={{ color: "#4A4A4A" }}>{item?.name}</Text>
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
