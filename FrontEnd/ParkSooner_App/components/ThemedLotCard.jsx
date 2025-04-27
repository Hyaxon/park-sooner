import { StyleSheet, View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import ThemedText from "./ThemedText";
import ThemedCard from "./ThemedCard";
import Spacer from "./Spacer";

const ThemedLotCard = ({
  style,
  lotName,
  lotAddress,
  spotsAvailable,
  percentFullByHour,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const maxBarHeight = 100;
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <View style={{ flexDirection: "column" }}>
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

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: theme.subtitle,
            marginVertical: 10,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 10,
          }}>
          {percentFullByHour.map((percent, index) => (
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
                {index + 7 > 12 ? `${index - 5}` : `${index + 7}`}
              </ThemedText>
            </View>
          ))}
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
