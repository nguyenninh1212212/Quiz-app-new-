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
import Channel from '../screens/(tabs)/Channel/ChannelScreen';
import Login from '../screens/(auth)/login';
import Register from '../screens/(auth)/register';


const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
    initialRouteName="login" 
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
      <Stack.Screen name="Đề thi của tôi" component={Channel} />
        {/* Trang đăng nhập và đăng ký */}
        <Stack.Screen 
        name="login" 
        component={Login} 
        options={{ headerShown: false }} // Hiển thị header cho trang login
      />
      <Stack.Screen 
        name="register" 
        component={Register} 
        options={{ headerShown:false }} // Hiển thị header cho trang register
      />
    </Stack.Navigator>
  );
}
