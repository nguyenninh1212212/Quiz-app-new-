// src/components/CardCategory.js
import React from "react";
import { View, Text, Image } from "react-native";
import { Link } from "expo-router";

const CardCategory = ({ img, title, path }) => {
  return (
    <Link href={path}>
      <View
        style={{
          height: 80,
          width: '100%',
          backgroundColor: '#D6A0FF', // Tương đương màu bg-purple-300
          borderRadius: 16,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: img }}
          style={{
            width: '100%',
            height: 60,
            resizeMode: 'cover',
          }}
        />
        <Text style={{ color: 'black' }}>{title}</Text>
      </View>
    </Link>
  );
};

export default CardCategory;
