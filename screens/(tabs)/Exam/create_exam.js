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
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExam } from "../../../api/exam"; 
import { useQuery } from "@tanstack/react-query";
import { getEleExam } from "../../../api/exam"; 

export default function CreateExamScreen() {
  // All useState hooks must be called unconditionally at the top
  const [school, setSchool] = useState({id:"", name:""});
  const [subject, setSubject] = useState({id:"", name:""});
  const [level, setLevel] = useState({id:"", name:""});
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState(null);
  const [docxFile, setDocxFile] = useState(null);
  const [isMutation, setIsMutation] = useState(false);

  // Data fetching - this hook must be called on every render
  const { data: ele, isLoading: eload } = useQuery({
    queryKey: ["eleExam"],
    queryFn: () => getEleExam(),
  });

  // Setup mutation - this hook must also be called on every render
  const mutation = useMutation({
    mutationFn: (formData) => createExam(formData),
    onSuccess: () => {
      Alert.alert("Tạo đề thi thành công!");
      setTitle("");
      setSchool({id:"", name:""});
      setSubject({id:"", name:""});
      setContent("");
      setImage(null);
      setDocxFile(null);
      setIsMutation(false);
    },
    onError: (error) => {
      Alert.alert("Lỗi", "Không thể tạo đề thi." + error.message);
      setIsMutation(false);
    },
  });

  // Process data safely - no early returns before this point
  // Use default values when data is still loading
  const data = ele?.data || { schools: [], subjects: [], level: [] };
  const schools = data.schools || [];
  const subjects = school.id ? (data.subjects || []).filter(f => f.school_id === school.id) : [];
  const levels = subject.id ? (data.level || []).filter(f => f.id_subject === subject.id) : [];

  const fieldsOptions = {
    school: schools,
    subject: subjects,
    level: levels
  };

  const openModal = (field) => {
    setCurrentField(field);
    setOptions(fieldsOptions[field]);
    setIsModalVisible(true);
  };

  const handleField = [
    { currentField: "school", state: setSchool },
    { currentField: "subject", state: setSubject },
    { currentField: "level", state: setLevel }
  ];
  
  const selectOption = (id, name) => {
    const field = handleField.find(e => e.currentField === currentField);
    
    if (field) {
      if (field.currentField === "school") {
        setSubject({ id: "", name: "" });
        setLevel({ id: "", name: "" });
      }
  
      field.state({ id, name });
    }
    // Đóng modal
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
  
    // Thêm ảnh nếu có
    if (image) {
      formData.append("cover", {
        uri: image.uri,
        name: image.fileName,
        type: "image/jpeg",
      });
    }
  
    // Thêm file docx nếu có
    if (docxFile) {
      formData.append("docx", {
        uri: docxFile.uri,
        name: docxFile.name,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
    }
  
    // Thêm thông tin examData dưới dạng các trường riêng biệt
    formData.append("examData.title", title);
    formData.append("examData.subject", subject.id);
    formData.append("examData.school", school.id);
    formData.append("examData.level", level.id);
    setIsMutation(true);
    mutation.mutate(formData);
  };

  // Render loading state as part of the component's JSX
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2a3164" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16, marginBottom: 64 }}>
          {eload ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#FFD700" />
              <Text style={{ color: "white", marginTop: 16 }}>Loading...</Text>
            </View>
          ) : (
            <>
              {/* Ảnh minh họa */}
              <View style={{ backgroundColor: "#D1D1D1", borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
                <Image source={{ uri: image?.uri  || "https://tesolcourse.edu.vn/wp-content/uploads/2022/02/2-2.jpg"  }} style={{ width: "100%", height: 200, borderRadius: 8 }} />
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
                    disabled={!school.id}
                  >
                    <Text style={{ color: "#4A4A4A" }}>{school.id ? (subject.name || "--Môn học--") : "Hãy chọn trường trươc"}</Text>
                  </TouchableOpacity>
                </View>

                {/* Lớp học */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ color: "#4A4A4A", fontWeight: "600" }}>📟Lớp</Text>
                  <TouchableOpacity
                    onPress={() => openModal("level")}
                    style={{
                      borderWidth: 1,
                      borderColor: "#D1D1D1",
                      borderRadius: 8,
                      padding: 12,
                      marginTop: 8,
                    }}
                    disabled={!subject.id}
                  >
                    <Text style={{ color: "#4A4A4A" }}>{subject.id ? (level.name || "--Lớp học--") : "Hãy chọn môn trươc"}</Text>
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
                onPress={() => {
                  if (!school.id || !subject.id) {
                    Alert.alert("Thông báo", "Bạn chưa chọn trường học hoặc môn học!");
                    return; 
                  }

                  if (!title) {
                    Alert.alert("Thông báo", "Bạn chưa nhập tiêu đề đề thi!");
                    return;
                  }

                  if (!image && !docxFile) {
                    Alert.alert("Thông báo", "Bạn chưa chọn file ảnh hoặc file .docx!");
                    return; 
                  }

                  handleSubmit();
                }}
                style={{
                  backgroundColor: isMutation ? "gray" : "#FFD700",
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginTop: 24,
                }}
                disabled={isMutation}
              > 
                {isMutation ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 }}>
                    Xác nhận
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}
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