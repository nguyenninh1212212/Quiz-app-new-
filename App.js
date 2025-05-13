import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigator/rootstack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "react-native";
import { NavigationProvider } from "./context/NavigatorContext";

const queryClient = new QueryClient();

export default function App() {
  return (
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
  );
}
