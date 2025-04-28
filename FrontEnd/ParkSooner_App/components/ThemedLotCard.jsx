// React Native Imports
import { StyleSheet, View, useColorScheme } from "react-native";

// Custom Imports
import { Colors } from "../constants/Colors";

// Custom Components Imports
import ThemedText from "./ThemedText";

// Themed Lot Card Component
// A reusable rounded card for the lots page that displays relevant information from props, including:
// - Lot name
// - Lot address
// - Number of spots available
// - Percent full by hour represented as a bar graph
const ThemedLotCard = ({
  style,
  lotName,
  lotAddress,
  spotsAvailable,
  percentFullByHour,
  ...props
}) => {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Define the maximum height of a bar for the bar graph
  const maxBarHeight = 100;
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <View style={{ flexDirection: "column" }}>
        {/* Card Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
              {lotName}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 16,
                maxWidth: 200,
                color: theme.subtitle,
              }}>
              {lotAddress}
            </ThemedText>
          </View>
          <View>
            <ThemedText
              style={{
                fontSize: 16,
                fontWeight: "bold",
                maxWidth: 100,
                textAlign: "center",
              }}>
              {spotsAvailable}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 16,
                maxWidth: 100,
                textAlign: "center",
                color: theme.subtitle,
              }}>
              Spots Available
            </ThemedText>
          </View>
        </View>

        {/* Divider */}
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: theme.subtitle,
            marginVertical: 10,
          }}
        />

        {/* Bar Graph */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 10,
          }}>
          {
            // Map through the percentFullByHour array and create a bar for each hour
            percentFullByHour.map((percent, index) => (
              <View key={index}>
                <View
                  style={{
                    width: 20,
                    height: ((percent ?? 10) / 100) * maxBarHeight,

                    backgroundColor: theme.primary,
                    marginHorizontal: 2,
                  }}
                />
                <ThemedText
                  style={{ textAlign: "center", color: theme.subtitle }}>
                  {
                    // Calculate the hour based on the index
                    index + 7 > 12 ? `${index - 5}` : `${index + 7}`
                  }
                </ThemedText>
              </View>
            ))
          }
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 60,
            marginRight: 60,
            marginBottom: -5,
          }}>
          <ThemedText style={{ color: theme.subtitle }}>AM</ThemedText>
          <ThemedText style={{ color: theme.subtitle }}>PM</ThemedText>
        </View>
      </View>
    </View>
  );
};

export default ThemedLotCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 20,
    overflow: "hidden",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 0,
  },
});
