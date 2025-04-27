// React Native Imports
import { View, useColorScheme, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Custom Imports
import { Colors } from "../constants/Colors";

// Custom Component Imports
import ThemedText from "./ThemedText";

// Themed Page View Component
// A page view for the dashboard pages that has a top bar and applies the current theme
const ThemedPageView = ({ style, safe = false, title, children }) => {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Get the safe area insets for top padding
  const insets = useSafeAreaInsets();

  // Determine if the container should be a SafeAreaView or a regular View
  const Container = safe ? View : View;

  return (
    <Container
      style={[
        {
          backgroundColor: theme.primary,
          paddingTop: safe ? insets.top : 0,
          flex: 1,
        },
        style,
      ]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <ThemedText
          title={true}
          style={{ color: Colors["dark"].title, fontSize: 24 }}>
          {title}
        </ThemedText>
      </View>

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {
          // Render the children components
          children
        }
      </View>
    </Container>
  );
};

export default ThemedPageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
