import React, { useState } from "react";
import { Marker } from "react-native-maps";
import MapViewCluster from "react-native-map-clustering";
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

const Map = () => {
  const { parkingLots, loading } = useParkingLots();

  const [showParkingLots, setShowParkingLots] = useState(true);

  const [showFilters, setShowFilters] = useState(false);

  const otherLots = [
    {
      id: "1",
      lotName: "Test Lot",
      coordinates: { lat: 35.208, long: -97.446 },
      lotCapacity: 50,
    },
  ];

  const dataToDisplay = showParkingLots ? parkingLots : otherLots;

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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}>
          <ThemedText style={{ color: "white", fontWeight: "bold" }}>
            {showParkingLots ? "Open Filters" : "Close Filters"}
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
    bottom: 20,
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
});
