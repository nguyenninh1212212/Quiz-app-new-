// src/navigation/RootStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './bottomTap';
import ExamCreate from '../screens/(tabs)/Exam/create_exam';
import ProfileDetail from '../screens/(tabs)/Profile/profile';
import Result from "../screens/(tabs)/Exam/detail/result"

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      {/* TabNavigator là màn hình chính */}
      <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ExamCreate" component={ExamCreate} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
      <Stack.Screen name="result" component={Result} />
      <Stack.Screen name="Exam" component={Result} />
    </Stack.Navigator>
  );
}
