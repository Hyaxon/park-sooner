// React Native Imports
import React, { createContext, useState, useEffect, useContext } from "react";

// Firebase Imports
import { database, ref, onValue } from "../FirebaseConfig";

// Create contexts for parking lots and drop-off spots
const ParkingLotsContext = createContext();
const DropOffsContext = createContext();

// Function to check if a parking lot is valid
const isValidLot = (lot) => {
  return (
    lot.lotName &&
    lot.lotAddress &&
    lot.coordinates &&
    lot.passTypes &&
    lot.lotCapacity
  );
};

export const ParkingLotsProvider = ({ children }) => {
  // State to hold parking lots and loading status
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to fetch parking lots from Firebase
  useEffect(() => {
    // Reference to the parking data in Firebase
    const parkingLotsRef = ref(database, "parkingData");

    // Subscribe to changes in the parking data
    const unsubscribe = onValue(parkingLotsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedLocations = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // Filter out any lots that are missing required data
        const validLots = parsedLocations.filter((lot) => isValidLot(lot));

        // Update the state with the valid parking lots
        setParkingLots(validLots);
      }
      // Set loading to false after fetching data
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ParkingLotsContext.Provider value={{ parkingLots, loading }}>
      {children}
    </ParkingLotsContext.Provider>
  );
};

// Custom hook
export const useParkingLots = () => useContext(ParkingLotsContext);

export const DropoffSpotsProvider = ({ children }) => {
  // State to hold drop-off spots and loading status
  const [dropoffSpots, setDropoffSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to fetch drop-off spots from Firebase
  useEffect(() => {
    // Reference to the drop-off data in Firebase
    const dropoffsRef = ref(database, "dropOffData");

    // Subscribe to changes in the drop-off data
    const unsubscribe = onValue(dropoffsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedLocations = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        //const validLots = parsedLocations.filter((lot) => isValidLot(lot));

        // Update the state with the valid drop-off spots
        setDropoffSpots(parsedLocations);
      }
      // Set loading to false after fetching data
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DropOffsContext.Provider value={{ dropoffSpots, loading }}>
      {children}
    </DropOffsContext.Provider>
  );
};

// Custom hook
export const useDropoffSpots = () => useContext(DropOffsContext);
