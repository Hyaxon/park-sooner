// React Native Imports
import { View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Custom Imports
import { Colors } from "../constants/Colors";

// Themed View Component
// A reusable view component that applies a theme and optional safe area insets without a top bar
const ThemedView = ({ style, safe = false, ...props }) => {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Determine if the container should be a SafeAreaView or a regular View
  if (!safe) {
    return (
      <View style={[{ backgroundColor: theme.background }, style]} {...props} />
    );
  }

  // Get the safe area insets for top padding
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedView;
