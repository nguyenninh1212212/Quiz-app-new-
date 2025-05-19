import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { getFolderDetail } from "../../../api/folder";
import QuizCardFolder from "../../../components/Card/QuizFolderCard";

const FolderScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const {
    data: folderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["folder detail", id],
    queryFn: () => getFolderDetail(id),
  });

  const [exams, setExams] = useState([]);

  // Khi folderData thay đổi, cập nhật lại exams state
  useEffect(() => {
    if (folderData?.data?.exams) {
      setExams(folderData.data.exams);
    }
  }, [folderData]);

  // Hàm xóa bài thi khỏi state và cập nhật UI
  const handleDelete = (deleteId) => {
    setExams((prevExams) => prevExams.filter((item) => item.id !== deleteId));
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.message}>Đang tải dữ liệu...</Text>
      ) : isError ? (
        <Text style={styles.message}>Lỗi khi tải dữ liệu!</Text>
      ) : exams.length === 0 ? (
        <Text style={styles.message}>
          Không có bài thi nào trong thư mục này.
        </Text>
      ) : (
        <FlatList
          data={exams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <QuizCardFolder
              data={item}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a3164",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  message: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default FolderScreen;
