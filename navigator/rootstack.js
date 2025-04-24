// src/navigation/RootStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './bottomTap';
import ExamCreate from '../screens/(tabs)/Exam/create_exam';
import ProfileDetail from '../screens/(tabs)/Profile/profile';
import Result from "../screens/(tabs)/detail/result"
import Exam from '../screens/(tabs)/Exam/[id]';
import ExamDetail from '../screens/(tabs)/detail/[id]';
import Search from '../screens/(tabs)/Home/_search'


const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      
      headerStyle: {
        backgroundColor: '#2a3164', // 👉 Màu nền Header
      },
      headerTintColor: '#fff', // 👉 Màu chữ/icon trong Header
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      {/* TabNavigator là màn hình chính */}
      <Stack.Screen name="Quay lại" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Tạo đề thi" component={ExamCreate} />
      <Stack.Screen name="Profile" component={ProfileDetail} />
      <Stack.Screen name="Kết quả" component={Result} />
      <Stack.Screen name="Làm câu hỏi" component={ExamDetail} />
      <Stack.Screen name="Đề thi" component={Exam} />
      <Stack.Screen name="Tìm kiếm" component={Search} />
    </Stack.Navigator>
  );
}
