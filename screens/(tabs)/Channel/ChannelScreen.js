import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo/vector-icons
import { fakeQuizData } from "../../../fakedata"; // Import fake data or real data from your API
import QuizCard from "../../../components/Card/QuizCard"; // Adjust the import path as needed

const ChannelScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back using react-navigation
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Avatar.Image
            size={100}
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Trần Thị A</Text>
        </View>
      </View>

      {/* Content section */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Đề thi</Text>
        <FlatList
          data={fakeQuizData} // Replace with actual data
          renderItem={({ item }) => <QuizCard data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383e6e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 40, // Adjust to balance the back button
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: "#e0e0e0",
    marginBottom: 12,
  },
  userName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
    color: "#ffff",
  },
});

export default ChannelScreen;
