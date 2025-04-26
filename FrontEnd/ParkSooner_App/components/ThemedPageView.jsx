import { View, useColorScheme, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import Spacer from "./Spacer";

const ThemedPageView = ({ style, safe = false, children }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const insets = useSafeAreaInsets();

  const Container = safe ? View : View;

  return (
    <Container
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: safe ? insets.top : 0,
          flex: 1,
        },
        style,
      ]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <ThemedText title={true}>Campus Map</ThemedText>
      </View>

      <View style={{ flex: 1 }}>{children}</View>
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
