import { View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedCard = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[{ backgroundColor: theme.background }, styles.card, style]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
  },
});
