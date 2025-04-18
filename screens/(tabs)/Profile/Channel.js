import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import QuizCard from "@/components/Card/QuizCard";
import { fakeQuizData } from "@/fakedata";

const Channel = () => {
  return (
    <FlatList
      data={fakeQuizData}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <QuizCard data={item} />
        </View>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "center",
  },
  cardContainer: {
    paddingHorizontal: 8,
  },
});

export default Channel;
