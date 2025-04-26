//React
import { StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

//Firebase
import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

//Components
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import Spacer from "../../components/Spacer";
import ThemedCard from "../../components/ThemedCard";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        router.replace("/lots");
      }
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} styles={styles.title}>
        Login to your account
      </ThemedText>

      <ThemedCard>
        <ThemedText>Username</ThemedText>
        <TextInput
          placeholder="Enter your username"
          value={email}
          onChangeText={setEmail}
        />
        <Spacer />
        <ThemedText>Password</ThemedText>
        <TextInput
          placeholder="Enter your password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </ThemedCard>
      <ThemedButton onPress={signIn}>
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
