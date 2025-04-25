import { StyleSheet } from "react-native";

import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const Chat = () => {
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true}>Chat</ThemedText>
      <Spacer height={100} />
    </ThemedView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
