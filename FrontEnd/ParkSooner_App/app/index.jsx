import { StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

import Logo from "../assets/img/ParkSoonerLogoSmall.png";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <Image source={Logo} style={styles.img} />
      <Spacer />
      <ThemedText style={{ marginTop: 10 }}> University of Oklahoma</ThemedText>
      <ThemedText style={styles.title} title={true}>
        Parking Map App
      </ThemedText>
      <Spacer />
      <Link href="/login">Login Page</Link>
      <Link href="/lots">Lots Page</Link>
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
});
