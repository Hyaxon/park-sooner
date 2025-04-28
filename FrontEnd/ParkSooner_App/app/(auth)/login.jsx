//React Native Imports
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  CheckBox,
  Image,
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

      // if sign-in was sucessful, redirect page to lots page.
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
        <Image source={require("../../assets/img/ParkSoonerLogoSmall.png")} style={{ width: 100, height: 100 }} />
        <Spacer />

        <ThemedText
          title={true}
          style={[styles.title, { fontSize: 30, fontWeight: "bold" }]}>
          Sign In
        </ThemedText>

        <Spacer height={10} />

        <ThemedCard>
          {/* <ThemedText>Email:</ThemedText> */}
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail} 
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </ThemedCard>
        <Spacer height={20} />
        <ThemedCard>
          <TextInput
            placeholder= "Enter your password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            />
        </ThemedCard>
        <Spacer height={20} />

        <ThemedButton onPress = {signIn}>
          <Text style ={{color: "#f2f2f2", textAlign: "center"}}>Submit</Text>
        </ThemedButton>

        {/* <ThemedCard>
          <ThemedText>Email</ThemedText>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </ThemedCard>
        <Spacer height={20} />
        <ThemedCard>
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
        </ThemedButton> */}

        <Spacer height={50} />
        <ThemedText style={{ textAlign: "center" }}>
          Don't have an account?
        </ThemedText>

        <Spacer height={10} />
        <Link href="/register">
          <ThemedText style={{ textAlign: "left", color: "#0a74d3"}}>
            Register
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
