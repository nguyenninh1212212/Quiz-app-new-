// src/context/NavigationContext.js
import React, { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const navigation = useNavigation();

  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => useContext(NavigationContext);
