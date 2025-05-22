import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function AvatarSelect({handle}) {
  const [avatarUri, setAvatarUri] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Quyền truy cập bị từ chối!",
        "Bạn cần cấp quyền để chọn ảnh."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) {
      setAvatarUri(result.uri);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chọn ảnh đại diện</Text>

      <View style={styles.avatarContainer}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Chưa có ảnh</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
          <Text style={styles.selectButtonText}>Chọn ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSetAvatar()}>
          <Text style={styles.skipButtonText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383e6e",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffd800",
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#ffd800",
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#999",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#eee",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  selectButton: {
    backgroundColor: "#ffd800",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  selectButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  skipButton: {
    backgroundColor: "#555",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
  },
  skipButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
