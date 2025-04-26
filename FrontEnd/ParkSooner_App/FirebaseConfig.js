import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA4N_DAGtM30GJSidXRO395K4SB_cNj90I",
  authDomain: "parksooner-firebase.firebaseapp.com",
  databaseURL: "https://parksooner-firebase-default-rtdb.firebaseio.com",
  projectId: "parksooner-firebase",
  storageBucket: "parksooner-firebase.firebasestorage.app",
  messagingSenderId: "705232430691",
  appId: "1:705232430691:web:f5ce1a5be255d4d6fa3a56",
  measurementId: "G-NXN9Y7CVRC",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
