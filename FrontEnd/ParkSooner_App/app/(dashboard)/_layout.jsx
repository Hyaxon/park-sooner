// React Native Imports
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Firebase Context Imports
// Stores the parking lot data and drop off data in the root layout of the dashboard, so each page does not have to fetch it every time
import { ParkingLotsProvider } from "../../context/ParkingLotsContext";
import { DropoffSpotsProvider } from "../../context/ParkingLotsContext";

// Layout for the dashboard pages
const DashboardLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <ParkingLotsProvider>
      <DropoffSpotsProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            animation: "none",
            tabBarStyle: {
              backgroundColor: theme.navBackground,
              paddingTop: 10,
              height: 90,
            },
            tabBarActiveTintColor: theme.iconColorFocused,
            tabBarInactiveTintColor: theme.iconColor,
          }}>
          <Tabs.Screen
            name="lots"
            options={{
              title: "Lots",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "car" : "car-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="map"
            options={{
              title: "Map",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "map" : "map-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              title: "Chat",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "chatbox" : "chatbox-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "settings" : "settings-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
        </Tabs>
      </DropoffSpotsProvider>
    </ParkingLotsProvider>
  );
};

export default DashboardLayout;
