// React Native Imports
import { Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { StatusBar } from "react-native";

// Custom Components
import { Colors } from "../constants/Colors";

// Defines the layout for the root pages of the app
const RootLayout = () => {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <>
      <StatusBar value="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />

        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Home" }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
