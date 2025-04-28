import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useParkingLots } from "../../context/ParkingLotsContext";

import ThemedPageView from "../../components/ThemedPageView";
import ThemedLotCard from "../../components/ThemedLotCard";
import Spacer from "../../components/Spacer";

const HOURS = [
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
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

  console.log("Parking Lots:", parkingLots);

  return (
    <ThemedPageView safe={true} title="Parking Lots">
      <ScrollView style={styles.scrollview}>
        {parkingLots.map((lot) => {
          const percentFullByHour = lot.averageLotCapacities
            ? HOURS.map((hour) => lot.averageLotCapacities?.[hour] ?? 0)
            : [1, 10, 20, 30, 40, 50, 60, 70, 80, 90]; // Default fallback if no data
          console.log(percentFullByHour);
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
