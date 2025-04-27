import React, { useState } from "react";
import { Marker } from "react-native-maps";
import MapViewCluster from "react-native-map-clustering";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from "react-native";

import ThemedText from "../../components/ThemedText";
import ThemedPageView from "../../components/ThemedPageView";
import ThemedCard from "../../components/ThemedCard";

import { useParkingLots } from "../../context/ParkingLotsContext";
import Spacer from "../../components/Spacer";

const FILTERS = ["housing", "faculty", "commuter", "paid", "free", "dropoff"];

const Map = () => {
  const { parkingLots, loading } = useParkingLots();

  const [showParkingLots, setShowParkingLots] = useState(true);

  const [showFilters, setShowFilters] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState(["commuter"]);

  const otherLots = [
    {
      id: "1",
      lotName: "Test Lot",
      coordinates: { lat: 35.208, long: -97.446 },
      lotCapacity: 50,
    },
  ];

  const lotDataMap = {
    commuter: parkingLots.filter((lot) => lot.passTypes === "commuter"),
    housing: parkingLots.filter((lot) => lot.type === "housing"),
    faculty: parkingLots.filter((lot) => lot.type === "faculty"),
    paid: parkingLots.filter((lot) => lot.isPaid),
    free: parkingLots.filter((lot) => lot.isFree),
    dropoff: parkingLots.filter((lot) => lot.isDropoff),
  };

  const dataToDisplay = parkingLots.filter((lot) => {
    // Check if the lot matches ANY selected filter
    return selectedFilters.some((filter) => lot.passTypes?.[filter] === true);
  });

  if (loading) {
    return (
      <ThemedPageView safe={true} title="Campus Map">
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedPageView>
    );
  }

  return (
    <ThemedPageView safe={true} title="Campus Map">
      <View style={styles.container}>
        <MapViewCluster
          style={styles.map}
          initialRegion={{
            latitude: 35.2075,
            longitude: -97.4456,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsCompass={true}
          pitchEnabled={false}>
          {dataToDisplay.map((lot) => {
            return (
              <Marker
                key={lot.id}
                coordinate={{
                  latitude: lot.coordinates.lat ?? 35.2075,
                  longitude: lot.coordinates.long ?? -97.4456,
                }}
                title={lot.lotName}>
                <ThemedCard style={{ backgroundColor: "white", padding: 5 }}>
                  {/*<ThemedText>{lot.lotName}</ThemedText>*/}
                  <ThemedText>{lot.lotCapacity} spots available</ThemedText>
                </ThemedCard>
              </Marker>
            );
          })}
        </MapViewCluster>
        {showFilters && (
          <View style={styles.filterView}>
            <ThemedText style={{ color: "black", fontWeight: "bold" }}>
              Filters
            </ThemedText>
            <Spacer height={10} />
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 10,
              }}>
              <BouncyCheckbox
                onPress={(isChecked) => {
                  setSelectedFilters((prev) =>
                    isChecked
                      ? [...prev, "commuter"]
                      : prev.filter((item) => item !== "commuter")
                  );
                }}
              />
              <ThemedText
                style={{
                  marginTop: 5,
                  marginLeft: -5,
                  color: "black",
                  fontWeight: "bold",
                }}>
                Commuter Lots
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 10,
              }}>
              <BouncyCheckbox
                onPress={(isChecked) => {
                  setSelectedFilters((prev) =>
                    isChecked
                      ? [...prev, "housing"]
                      : prev.filter((item) => item !== "housing")
                  );
                }}
              />
              <ThemedText
                style={{
                  marginTop: 5,
                  marginLeft: -5,
                  color: "black",
                  fontWeight: "bold",
                }}>
                Housing Lots
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 10,
              }}>
              <BouncyCheckbox
                onPress={(isChecked) => {
                  setSelectedFilters((prev) =>
                    isChecked
                      ? [...prev, "faculty"]
                      : prev.filter((item) => item !== "faculty")
                  );
                }}
              />
              <ThemedText
                style={{
                  marginTop: 5,
                  marginLeft: -5,
                  color: "black",
                  fontWeight: "bold",
                }}>
                Faculty Lots
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 10,
              }}>
              <BouncyCheckbox
                onPress={(isChecked) => {
                  setSelectedFilters((prev) =>
                    isChecked
                      ? [...prev, "paid"]
                      : prev.filter((item) => item !== "paid")
                  );
                }}
              />
              <ThemedText
                style={{
                  marginTop: 5,
                  marginLeft: -5,
                  color: "black",
                  fontWeight: "bold",
                }}>
                Paid Lots
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 10,
              }}>
              <BouncyCheckbox
                onPress={(isChecked) => {
                  setSelectedFilters((prev) =>
                    isChecked
                      ? [...prev, "free"]
                      : prev.filter((item) => item !== "free")
                  );
                }}
              />
              <ThemedText
                style={{
                  marginTop: 5,
                  marginLeft: -5,
                  color: "black",
                  fontWeight: "bold",
                }}>
                Free Lots
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 10,
              }}>
              <BouncyCheckbox onPress={(isChecked) => {}} />
              <ThemedText
                style={{
                  marginTop: 5,
                  marginLeft: -5,
                  color: "black",
                  fontWeight: "bold",
                }}>
                Drop-off Locations
              </ThemedText>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}>
          <ThemedText style={{ color: "white", fontWeight: "bold" }}>
            {showFilters ? "Close Filters" : "Open Filters"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedPageView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  filterButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#003B67",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  filterView: {
    position: "absolute",
    bottom: 80,
    left: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
