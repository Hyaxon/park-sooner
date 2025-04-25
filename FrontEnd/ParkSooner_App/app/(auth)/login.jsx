import { StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../constants/Colors";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";

import Spacer from "../../components/Spacer";

const Login = () => {
  const handleSubmit = () => {
    // Handle login logic here
    console.log("Login form submitted");
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} styles={styles.title}>
        Login to your account
      </ThemedText>

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: "#f2f2f2", textAlign: "center" }}>Submit</Text>
      </ThemedButton>

      <Spacer height={100} />
      <Link href="/register">
        <ThemedText style={{ textAlign: "center" }}>
          Register instead?
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
  },
});
