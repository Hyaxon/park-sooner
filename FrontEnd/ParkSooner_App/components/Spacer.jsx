// React Native Imports
import { View } from "react-native";

// Spacer component to create vertical space between elements
const Spacer = ({ width = "100%", height = 0 }) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
