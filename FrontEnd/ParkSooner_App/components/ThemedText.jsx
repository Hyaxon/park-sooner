// React Native Imports
import { Text, useColorScheme } from "react-native";

// Custom Imports
import { Colors } from "../constants/Colors";

// Themed Text Component
// A reusable text component that applies the theme to the text color
const ThemedText = ({ style, title = false, ...props }) => {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Determine the text color based on the title prop
  const textColor = title ? theme.title : theme.text;
  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;
