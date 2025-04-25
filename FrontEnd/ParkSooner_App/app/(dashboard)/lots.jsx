import { StyleSheet } from "react-native";

import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const Lots = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedText title={true}>Lots</ThemedText>
      <Spacer height={100} />
    </ThemedView>
  );
};

export default Lots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
});
