//React Native Imports
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";

//Firebase Imports
import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

//Custom Component Imports
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import Spacer from "../../components/Spacer";
import ThemedCard from "../../components/ThemedCard";

// Login Page
const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signs the user in with email and password
  // If successful, redirects to the /lots page
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText
          title={true}
          style={[styles.title, { fontSize: 30, fontWeight: "bold" }]}>
          Login to your account
        </ThemedText>

        <ThemedCard>
          <ThemedText>Email</ThemedText>
          <TextInput
            placeholder="Enter your email"
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
    </TouchableWithoutFeedback>
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
