import { StyleSheet, View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedCard = ({ style, ...props }) => {
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
    padding: 20,
    overflow: "hidden",
  },
});
