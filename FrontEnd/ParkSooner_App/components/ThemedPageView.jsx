import { View, useColorScheme, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const ThemedPageView = ({ style, safe = false, title, children }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const insets = useSafeAreaInsets();

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
        {children}
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
