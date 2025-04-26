import React, { createContext, useState, useEffect, useContext } from "react";
import { database, ref, onValue } from "../FirebaseConfig";

const ParkingLotsContext = createContext();

const isValidLot = (lot) => {
  return lot.lotName && /*lot.lotAddress &&*/ lot.coordinates;
};

export const ParkingLotsProvider = ({ children }) => {
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parkingLotsRef = ref(database, "parkingData");

    const unsubscribe = onValue(parkingLotsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedLocations = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        const validLots = parsedLocations.filter((lot) => isValidLot(lot));

        setParkingLots(validLots);
      }
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

// Custom hook for easier usage
export const useParkingLots = () => useContext(ParkingLotsContext);
