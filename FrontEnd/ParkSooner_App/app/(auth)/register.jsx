import { StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";

const Register = () => {
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} styles={styles.title}>
        Register your account
      </ThemedText>
      <Spacer height={100} />

      <Link href="login">
        <ThemedText style={{ textAlign: "center" }}>Login instead?</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
  },
});
