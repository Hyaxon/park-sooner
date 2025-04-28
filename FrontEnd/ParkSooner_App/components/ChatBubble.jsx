// React Native Imports
import { View, Text, StyleSheet } from "react-native";

// ChatBubble Component
// Takes in a sender and message as props
const ChatBubble = ({ sender, message }) => {
  // Determine if the message is sent or received
  const isSent = sender === "You";

  return (
    <View style={[styles.container, isSent ? styles.sent : styles.received]}>
      <View
        style={[
          styles.bubble,
          isSent ? styles.sentBubble : styles.receivedBubble,
        ]}>
        <Text
          style={[
            isSent ? [styles.senderMessage, { fontSize: 10 }] : styles.sender,
          ]}>
          {sender}
        </Text>
        <Text style={[isSent ? styles.senderMessage : styles.message]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  sent: {
    justifyContent: "flex-end",
  },
  received: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "70%",
    borderRadius: 15,
    padding: 10,
  },
  sentBubble: {
    backgroundColor: "#0088FF", // Light green (like WhatsApp sent)
  },
  receivedBubble: {
    backgroundColor: "#ECECEC", // Light gray
  },
  sender: {
    fontSize: 10,
    color: "#555",
    marginBottom: 3,
  },
  message: {
    fontSize: 16,
    color: "#000",
  },
  senderMessage: {
    fontSize: 16,
    color: "#FFFF",
  },
});

export default ChatBubble;
