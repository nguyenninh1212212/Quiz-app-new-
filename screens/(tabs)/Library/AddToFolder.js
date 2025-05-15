import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToFolder, getFolder } from "../../../api/folder";

const AddToFolder = ({ idExam }) => {
  const [page, setPage] = useState(0);
  const [allFolders, setAllFolders] = useState([]); // danh sách folder đã load
  const [selectedFolderId, setSelectedFolderId] = useState(null); // id folder được chọn
  const queryClient = useQueryClient();
  const {
    data: foldersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["folders", page],
    queryFn: () => getFolder(page, 5),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: ({ folderId, idExam }) => addToFolder(folderId, idExam),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      Alert.alert("Thành công", "Đã thêm đề vào mục!");
    },
    onError: (error) => {
      Alert.alert(
        "Lỗi",
        error.status == 409
          ? "Bạn đã có đề trong mục rồi"
          : "Không thể thêm đề vào mục. Vui lòng thử lại."
      );
    },
  });

  useEffect(() => {
    if (foldersData && foldersData.length > 0) {
      setAllFolders((prev) => {
        const newFolders = foldersData.filter(
          (folder) => !prev.some((f) => f.id === folder.id)
        );
        return [...prev, ...newFolders];
      });
    }
  }, [foldersData]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSelectFolder = (id) => {
    setSelectedFolderId(id);
  };
  const handleAddToFolder = () => {
    if (!selectedFolderId) {
      Alert.alert("Thông báo", "Vui lòng chọn một mục trước khi thêm.");
      return;
    }
    console.log("🚀 ~ handleAddToFolder ~ selectedFolderId:", selectedFolderId);
    mutation.mutate({
      folderId: selectedFolderId,
      idExam: idExam,
    });
  };

  return isLoading ? (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#002060",
      }}
    >
      <ActivityIndicator size="large" color="white" />
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>Mục</Text>
      <FlatList
        data={allFolders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedFolderId;
          return (
            <TouchableOpacity
              onPress={() => handleSelectFolder(item.id)}
              style={[styles.folderItem, isSelected && styles.selectedFolder]}
            >
              <View>
                <Text
                  style={{ color: isSelected ? "white" : "black", flex: 1 }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{ color: isSelected ? "white" : "black", flex: 1 }}
                >
                  {item.examCount} đề
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity onPress={handleLoadMore}>
        <Text style={{ color: "gray", textAlign: "center", padding: 20 }}>
          Xem thêm
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddToFolder}>
        <Text
          style={{
            color: "white",
            backgroundColor: "#fbbf24",
            textAlign: "center",
            padding: 10,
            borderRadius: 10,
          }}
        >
          Thêm vào mục
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    maxHeight: 500,
  },
  folderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    border: 1,
    borderColor: "#ccc",
    margin: 2,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  selectedFolder: {
    backgroundColor: "#1E90FF",
  },
  checkmark: {
    color: "#f235c3",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  loadMoreBtn: {
    marginVertical: 12,
    backgroundColor: "#f235c3",
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default AddToFolder;
