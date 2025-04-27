// React Native Imports
import {
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";

// Firebase Imports
import { auth } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Custom Component Imports
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedCard from "../../components/ThemedCard";

// Register Page
const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signs the user up with email and password
  // If successful, redirects to the /lots page
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        router.replace("/lots");
      }
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText
          title={true}
          style={[styles.title, { fontSize: 30, fontWeight: "bold" }]}>
          Register your account
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

        <ThemedButton onPress={signUp}>
          <Text style={{ color: "#f2f2f2", textAlign: "center" }}>Submit</Text>
        </ThemedButton>

        <Spacer height={100} />
        <Link href="/login">
          <ThemedText style={{ textAlign: "center" }}>
            Login instead?
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
