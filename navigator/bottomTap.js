// src/navigation/BottomTabs.js
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Platform } from 'react-native';
import Home from '../screens/(tabs)/Home/index';
import Library from '../screens/(tabs)/Library/index';
import Exam from '../screens/(tabs)/detail/[id]';
import Notification from '../screens/(tabs)/Notification/index';
import Profile from '../screens/(tabs)/Profile/profile';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const [activeTab, setActiveTab] = useState('Home');
  const navigation = useNavigation();

  const change = (focus) => (focus ? '#ffd800' : 'white');

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          default: styles,
        }),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={30} color={change(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="folder-sharp" size={30} color={change(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Exam"
        component={Exam}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Tạo đề thi')}>
              <View style={styles.centerButton}>
                <View style={styles.centerCircle}>
                  <Ionicons name="add" size={50} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="notifications" size={30} color={change(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
              <Ionicons name="person-sharp" size={30} color={change(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopWidth: 0,
  shadowColor: '#000',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  backgroundColor: '#454e91',
  height: 80,
};

styles.centerButton = {
  backgroundColor: '#454e91',
  height: 80,
  width: 80,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 40,
  marginBottom: 30,
};

styles.centerCircle = {
  height: 64,
  width: 64,
  backgroundColor: '#ffd800',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 32,
};
