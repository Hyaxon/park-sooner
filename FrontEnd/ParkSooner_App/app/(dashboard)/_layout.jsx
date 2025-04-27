import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ParkingLotsProvider } from "../../context/ParkingLotsContext";

const DashboardLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <ParkingLotsProvider>
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
    </ParkingLotsProvider>
  );
};

export default DashboardLayout;
