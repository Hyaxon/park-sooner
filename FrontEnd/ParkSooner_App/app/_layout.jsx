import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";
const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.navBackground,
        },
        headerTintColor: theme.title,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="lotsmap" options={{ title: "Campus Map" }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
