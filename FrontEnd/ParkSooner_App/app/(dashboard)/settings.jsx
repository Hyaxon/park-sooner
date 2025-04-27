import { StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import Spacer from "../../components/Spacer";
import ThemedPageView from "../../components/ThemedPageView";
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
    <ThemedPageView style={styles.container} safe={true} title="Settings">
      <View style={{ marginLeft: 25, marginRight: 25 }}>
        <ThemedText style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
          User Settings
        </ThemedText>
        <Link href="/settings" style={styles.settingsLink}>
          <ThemedText>Edit Profile</ThemedText>
        </Link>
        <Link href="/settings" style={styles.settingsLink}>
          <ThemedText>Edit My Passes</ThemedText>
        </Link>

        <ThemedText style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
          Communication
        </ThemedText>
        <Link href="/settings" style={styles.settingsLink}>
          <ThemedText>Campus Announcements</ThemedText>
        </Link>

        <ThemedText style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
          Help
        </ThemedText>
        <Link href="/settings" style={styles.settingsLink}>
          <ThemedText>Privacy</ThemedText>
        </Link>
        <Link href="/settings" style={styles.settingsLink}>
          <ThemedText>Report Issue</ThemedText>
        </Link>

        <Spacer height={175} />
        <ThemedButton style={styles.button} onPress={() => auth.signOut()}>
          <Text>Sign Out</Text>
        </ThemedButton>

        <ThemedButton style={styles.button} onPress={() => auth.signOut()}>
          <Text>Delete Account</Text>
        </ThemedButton>
      </View>
      <Spacer height={100} />
    </ThemedPageView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginTop: 25,
    backgroundColor: "#FF0000",
    padding: 15,
    marginHorizontal: 40,
    borderRadius: 5,
  },
  settingsLink: {
    marginTop: 2,
    marginBottom: 5,
    fontSize: 20,
    textDecorationLine: "underline",
  },
});
