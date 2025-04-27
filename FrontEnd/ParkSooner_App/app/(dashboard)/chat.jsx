// React Native Imports
import { StyleSheet, ScrollView } from "react-native";

// Custom Component Imports
import Spacer from "../../components/Spacer";
import ThemedPageView from "../../components/ThemedPageView";
import ChatBubble from "../../components/ChatBubble";
import ThemedCard from "../../components/ThemedCard";
import ThemedText from "../../components/ThemedText";

// ChatBot AI Communication Page
const Chat = () => {
  return (
    <ThemedPageView safe={true} title="Parker Chat">
      <ScrollView>
        <Spacer height={20} />
        <ChatBubble
          sender="Parker"
          message="Hey, I'm Parker! How can I help you with parking today?"
        />
        <ChatBubble
          sender="You"
          message="I need to be at class at Dale Hall by 9am. I have a commuter pass. Where do you suggest I park and what time should I arrive?"
        />
      </ScrollView>
      <ChatBubble sender="Parker" message="Idonno." />

      <ThemedCard>
        <ThemedText>Hello</ThemedText>
      </ThemedCard>
    </ThemedPageView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
