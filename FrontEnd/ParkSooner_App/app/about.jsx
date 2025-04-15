import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Page</Text>
      <Link href="/">Home Page</Link>
    </View>
  );
};

export default About;

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
    marginVertical: 20,
    width: 100,
    height: 100,
  },
  card: {
    backgroundColor: "#EEE",
    padding: 20,
    borderRadius: 10,
    boxShadow: "4px 4px rgba(0,0,0,0.1)",
  },
});
