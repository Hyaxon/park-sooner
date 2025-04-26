import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useParkingLots } from "../../context/ParkingLotsContext";

import ThemedPageView from "../../components/ThemedPageView";
import ThemedLotCard from "../../components/ThemedLotCard";
import Spacer from "../../components/Spacer";

const HOURS = [
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
];

const Lots = () => {
  const { parkingLots, loading } = useParkingLots();

  if (loading) {
    return (
      <ThemedPageView safe={true} title="Campus Map">
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedPageView>
    );
  }

  return (
    <ThemedPageView safe={true} title="Parking Lots">
      <ScrollView style={styles.scrollview}>
        {parkingLots.map((lot) => {
          const percentFullByHour = lot.averageLotCapacities
            ? HOURS.map((hour) => lot.averageLotCapacities?.[hour] ?? 0)
            : [1, 10, 20, 30, 40, 50, 60, 70, 80, 90]; // Default fallback if no data

          return (
            <ThemedLotCard
              key={lot.id}
              lotName={lot.lotName ?? "Unknown Lot"}
              lotAddress={lot.lotAddress ?? "Unknown Address"}
              spotsAvailable={lot.lotCapacity ?? 0}
              percentFullByHour={percentFullByHour}
            />
          );
        })}
      </ScrollView>
    </ThemedPageView>
  );
};

export default Lots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
});
