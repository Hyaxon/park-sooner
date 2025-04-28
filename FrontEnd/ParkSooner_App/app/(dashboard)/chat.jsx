// React Native Imports
import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";

// Custom Component Imports
import Spacer from "../../components/Spacer";
import ThemedPageView from "../../components/ThemedPageView";
import ChatBubble from "../../components/ChatBubble";
import ThemedCard from "../../components/ThemedCard";
import ThemedText from "../../components/ThemedText";

// ChatBot AI Communication Page
const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "Parker",
      message: "Hey, I'm Parker! How can I help you with parking today?",
    },
    {
      sender: "You",
      message:
        "I need to be at class at Dale Hall by 9am. I have a commuter pass. Where do you suggest I park and what time should I arrive?",
    },
    {
      sender: "Parker",
      message:
        "Great! I recommend you arrive at the Asp Ave. Parking Facility around 8:45 to have plenty of time to walk to class and find a spot!",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() == "") {
      return;
    }

    const newMessage = {
      sender: "You",
      message: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Temporary response from Parker until AI is implemented
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "Parker", message: "Got it! Let me find that info..." },
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ThemedPageView safe={true} title="Parker Chat">
        <ScrollView>
          <Spacer height={20} />
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              sender={message.sender}
              message={message.message}
            />
          ))}
        </ScrollView>

        <ThemedCard style={{ marginBottom: 20, marginHorizontal: 10 }}>
          <TextInput
            placeholder="Enter your username"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
        </ThemedCard>
      </ThemedPageView>
    </KeyboardAvoidingView>
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
