// React Native Imports
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";

// Firebase Imports
import { auth } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Custom Components
import Logo from "../assets/img/ParkSoonerLogoSmall.png";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";
import ThemedCard from "../components/ThemedCard";
import ThemedButton from "../components/ThemedButton";

// This is the main entry point for the app
const Home = () => {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if the user is authenticated to automatically redirect them to the /lots page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to /lots
        router.replace("/lots");
      } else {
        // No user signed in
        setCheckingAuth(false);
      }
    });

    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Image source={Logo} style={styles.img} />
      <Spacer />
      <ThemedText style={{ marginTop: 10 }}> University of Oklahoma</ThemedText>
      <ThemedText style={styles.title} title={true}>
        ParkSooner
      </ThemedText>
      <Spacer height={30} />
      {/* <ThemedButton onPress={() => router.push("/login")} style={styles.btn}>
        <ThemedText style={{ color: "black" }} title={true}>
          Login
        </ThemedText>
      </ThemedButton> */}

      <ThemedCard style= {styles.login_btn}>
        <Link href="/login">Login</Link>
      </ThemedCard>

      {/*<Link href="/lots">Lots Page</Link>]*/}
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    width: 100,
    height: 100,
  },

  login_btn: {
    width: "25%",
    alignItems: "center",
    padding: 18,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: "Black",
    borderWidth: 0,
  }
});
