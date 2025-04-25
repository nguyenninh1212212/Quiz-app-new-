import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigator/rootstack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <RootStack />
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
