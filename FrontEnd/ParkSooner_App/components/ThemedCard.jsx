// React Native Imports
import { StyleSheet, View, useColorScheme } from "react-native";

// Custom Imports
import { Colors } from "../constants/Colors";

// Themed Card Component
// A reusable rounded card component that applies a theme
const ThemedCard = ({ style, ...props }) => {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[{ backgroundColor: theme.cardBackground }, styles.card, style]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    width: "90%",
    padding: 20,
    overflow: "hidden",
  },

  // login_page: {
  //   padding: 18,
  //   borderRadius: 6,
  //   marginVertical: 10,
  // }
});
