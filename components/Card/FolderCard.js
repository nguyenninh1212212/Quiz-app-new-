import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { deleteFolder } from "../../api/folder";
const FolderCard = ({ folder, onPress }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete folder"],
    mutationFn: (id) => deleteFolder(id),
    onSuccess: () => {
      Alert.alert("Thông báo", "xóa thành công");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: () => Alert.alert("Thông báo", "xóa thất bại"),
  });
  console.log("🚀 ~ FolderCard ~ folder.id:", folder);
  const onDelete = (id) => {
    mutation.mutate(id);
  };

  const handleLongPress = () => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc chắn muốn xóa thư mục "${folder.name}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            if (onDelete) {
              onDelete(folder.id);
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={handleLongPress}
      delayLongPress={300}
    >
      <Text style={styles.title}>{folder.name}</Text>
      <Text style={styles.subtitle}>{folder.examCount} đề đã lưu</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
});

export default FolderCard;
