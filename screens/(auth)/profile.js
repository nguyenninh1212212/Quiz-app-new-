import React from "react";
import { View, Text, TextInput } from "react-native";

const ProfileForm = ({ formData, handleChange, errors, ErrorText }) => {
  return (
    <View>
      {/* Fullname */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: "#ffd800", marginBottom: 4 }}>Họ và tên</Text>
        <TextInput
          style={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 25,
          }}
          placeholder="Nhập họ tên..."
          placeholderTextColor="#BDBDBD"
          value={formData.fullname}
          onChangeText={(text) => handleChange("fullname", text)}
        />
        <ErrorText message={errors.fullname} />
      </View>

      {/* Email */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: "#ffd800", marginBottom: 4 }}>Email</Text>
        <TextInput
          style={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 25,
          }}
          placeholder="Nhập email..."
          placeholderTextColor="#BDBDBD"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <ErrorText message={errors.email} />
      </View>

      {/* Age & Phone */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <View style={{ flex: 1, marginRight: 6 }}>
          <Text style={{ color: "#ffd800", marginBottom: 4 }}>Tuổi</Text>
          <TextInput
            style={{
              backgroundColor: "white",
              color: "black",
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 25,
            }}
            placeholder="Tuổi..."
            placeholderTextColor="#BDBDBD"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => handleChange("age", text)}
          />
          <ErrorText message={errors.age} />
        </View>

        <View style={{ flex: 1, marginLeft: 6 }}>
          <Text style={{ color: "#ffd800", marginBottom: 4 }}>
            Số điện thoại
          </Text>
          <TextInput
            style={{
              backgroundColor: "white",
              color: "black",
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 25,
            }}
            placeholder="Số điện thoại..."
            placeholderTextColor="#BDBDBD"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
          />
          <ErrorText message={errors.phoneNumber} />
        </View>
      </View>
    </View>
  );
};

export default ProfileForm;
