// React Native Imports
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

// Defines the layout for the authentication screens
export default function AuthLayout() {
  return (
    <>
      <StatusBar sytle="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </>
  );
}
