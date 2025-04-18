// src/components/ActionComponents.js
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const ActionComponents = ({ img, title, path }) => {
  return (
    <Link href={path}>
      <View
        style={{
          height: 128,
          backgroundColor: '#f3c400', // Màu primary_250 (thay đổi theo màu của bạn)
          borderRadius: 16,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8, // Tương đương gap-y-2 trong Tailwind
          }}
        >
          <Image
            source={img}
            style={{
              height: 64,
              width: 64,
            }}
          />
          <Text style={{ color: 'white' }}>{title}</Text>
        </View>
      </View>
    </Link>
  );
};

export default ActionComponents;
