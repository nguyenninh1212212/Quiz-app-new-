import "react-native-gesture-handler"; // PHẢI nằm ở dòng đầu tiên
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigator/rootstack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "react-native";
import { NavigationProvider } from "./context/NavigatorContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <NavigationProvider>
            <AuthProvider>
              <RootStack />
            </AuthProvider>
          </NavigationProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
