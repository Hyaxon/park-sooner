// React Native Imports
import { StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

// Custom Component Imports
import Spacer from "../../components/Spacer";
import ThemedPageView from "../../components/ThemedPageView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";

// Firebase Imports
import { auth } from "../../FirebaseConfig";
import { getAuth, deleteUser } from "firebase/auth";

// Page for displaying user settings
const Settings = () => {
  const router = useRouter();

  // If the user is not authenticated, redirect to the login page
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace("/login");
  });

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "No user is currently signed in.");
      return;
    }

    try {
      await deleteUser(user);
      Alert.alert(
        "Account Deleted",
        "Your account has been successfully deleted."
      );
      router.replace("/login");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Re-authentication Required",
          "Please log in again to delete your account."
        );
        router.replace("/login");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };
  // Temporarily redirect users back to the settings page for each submenu until implemention is ready
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
        <ThemedButton style={styles.button} onPress={handleDeleteAccount}>
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
