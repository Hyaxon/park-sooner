import { StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";

import { auth } from "../../FirebaseConfig";
import { getAuth } from "firebase/auth";

const Settings = () => {
  const router = useRouter();

  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace("/login");
  });

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true}>Settings</ThemedText>

      <ThemedButton onPress={() => auth.signOut()}>
        <Text>Sign Out</Text>
      </ThemedButton>
      <Spacer height={100} />
    </ThemedView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
