import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FolderCard from "../../../components/Card/FolderCard";
import { getFolder, createFolder } from "../../../api/folder";
import Popup from "../../../components/popup/Popup";
import Paginator from "../../../components/Paginator";

const FolderScreen = () => {
  const [page, setPage] = useState(0);
  const size = 5;
  const [allFolders, setAllFolders] = useState([]);
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: folders = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["folders", page],
    queryFn: () => getFolder(page, size),
    keepPreviousData: true,
  });

  const hasMore = folders.length === size;

  useEffect(() => {
    if (page === 0) {
      setAllFolders(folders); // reset nếu quay lại trang đầu
    } else {
      setAllFolders((prev) => [...prev, ...folders]);
    }
  }, [folders, page]);

  const mutation = useMutation({
    mutationFn: (name) => createFolder(name),
    mutationKey: ["create-folder"],
    onSuccess: () => {
      Alert.alert("Thông báo", "Tạo thư mục thành công", [
        {
          text: "OK",
          onPress: () => {
            setIsCreating(false);
            setFolderName("");
            setOpen(false);
            setAllFolders([]); // reset dữ liệu
            setPage(0); // gọi lại trang đầu
            queryClient.invalidateQueries({ queryKey: ["folders"] });
          },
        },
      ]);
    },
    onError: () => {
      Alert.alert("Thông báo", "Tạo thư mục thất bại", [
        { text: "OK", onPress: () => setIsCreating(false) },
      ]);
    },
  });

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      setIsCreating(true);
      mutation.mutate(folderName);
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập tên thư mục");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Thư mục của bạn</Text>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.topButton}
        >
          <Text style={styles.topButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Paginator
        data={allFolders}
        page={page}
        setPage={setPage}
        renderItem={({ item }) => <FolderCard folder={item} />}
        loading={isLoading}
        loadingMore={isFetching && page > 0}
        hasMore={hasMore}
      />

      <Popup visible={open} onClose={() => setOpen(false)}>
        <Text style={styles.popupTitle}>Tạo thư mục mới</Text>
        <TextInput
          style={styles.input}
          value={folderName}
          onChangeText={setFolderName}
          placeholder="Nhập tên thư mục"
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity
          onPress={handleCreateFolder}
          style={[
            styles.createButton,
            isCreating && { backgroundColor: "#f235c3" },
          ]}
          disabled={isCreating}
        >
          <Text style={styles.createButtonText}>
            {isCreating ? "Đang tạo..." : "Tạo thư mục"}
          </Text>
        </TouchableOpacity>
      </Popup>
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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  topButton: {
    backgroundColor: "#f235c3",
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderBottomColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    color: "black",
  },
  createButton: {
    backgroundColor: "#f235c3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default FolderScreen;
