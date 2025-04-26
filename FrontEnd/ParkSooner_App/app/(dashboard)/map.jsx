import MapView, { Marker } from "react-native-maps";
import MapViewCluster from "react-native-map-clustering";

import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../../FirebaseConfig";

import { StyleSheet, View, ActivityIndicator } from "react-native";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedPageView from "../../components/ThemedPageView";

const Map = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parkingLotsRef = ref(database, "parkingData");

    const unsubscribe = onValue(parkingLotsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedLocations = Object.keys(data).map((key) => {
          const lot = {
            id: key,
            ...data[key],
          };
          return lot;
        });

        setParkingLots(parsedLocations);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ThemedPageView style={styles.container} safe={true}>
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
        {parkingLots.map((lot) => {
          return (
            <Marker
              key={lot.id}
              coordinate={{
                latitude: lot.coordinates.lat ?? 35.2075,
                longitude: lot.coordinates.long ?? -97.4456,
              }}
              title={lot.lotName}>
              <View style={{ backgroundColor: "white", padding: 5 }}>
                <ThemedText>{lot.lotName}</ThemedText>
                <ThemedText>{lot.lotCapacity} spots available</ThemedText>
              </View>
            </Marker>
          );
        })}
      </MapViewCluster>
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
});
