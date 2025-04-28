// React Native Imports
import { Pressable, StyleSheet, useColorScheme } from "react-native";

// Custom Imports
import { Colors } from "../constants/Colors";

// ThemedButton Component
// A reusable button component that applies a theme and handles press events
const ThemedButton = ({ syle, ...props }) => {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: theme.secondary },
        pressed && styles.pressed,
        syle,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 18,
    borderRadius: 6,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default ThemedButton;
