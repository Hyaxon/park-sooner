// React Native Imports
import {
  StyleSheet,
  Text,
  Image,
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
import { set } from "firebase/database";

// Register Page
const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Signs the user up with email and password
  // If successful, redirects to the /lots page
  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        router.replace("/lots");
      }
      // } catch (error) {
      //   console.log(error);
      //   alert("Sign up failed: " + error.message);
      // }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use. Please try a different email.");
      }
      // else if(error.code === "auth/invalid-email") {
      //   alert("Invalid email address. Please enter a valid email.");
      // }
      else {
        alert("Sign up failed: " + error.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Image
          source={require("../../assets/img/ParkSoonerLogoSmall.png")}
          style={{ width: 100, height: 100 }}
        />
        <Spacer />
        <ThemedText
          title={true}
          style={[styles.title, { fontSize: 30, fontWeight: "bold" }]}>
          Create Account
        </ThemedText>

        <Spacer height={10} />

        <ThemedCard>
          <TextInput
            placeholder="Enter new email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </ThemedCard>
        <Spacer height={20} />
        <ThemedCard>
          <TextInput
            placeholder="Enter new password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </ThemedCard>

        <Spacer height={20} />

        <ThemedCard>
          <TextInput
            placeholder="Confirm new password"
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
          />
        </ThemedCard>
        <Spacer height={10} />

        <ThemedButton onPress={signUp}>
          <Text style={{ color: "#f2f2f2", textAlign: "center" }}>Sign Up</Text>
        </ThemedButton>

        <Spacer height={50} />
        <ThemedText style={{ textAlign: "center" }}>
          Already have an account?
        </ThemedText>
        <Spacer height={10} />

        <Link href="/login">
          <ThemedText style={{ textAlign: "center", color: "#0a74d3" }}>
            Login here
          </ThemedText>
        </Link>

        {/* <ThemedCard>
          <ThemedText>Emil</ThemedText>
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

        <ThemedButton onPress={signUp}>
          <Text style={{ color: "#f2f2f2", textAlign: "center" }}>Submit</Text>
        </ThemedButton>

        <Spacer height={100} />
        <Link href="/login">
          <ThemedText style={{ textAlign: "center" }}>
            Login instead?
          </ThemedText>
        </Link> */}
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
