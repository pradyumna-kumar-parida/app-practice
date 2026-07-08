import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          position: "absolute",

          left: 20,
          right: 20,
          bottom: 10,

          height: 68,

          backgroundColor: "#FFF",

          borderRadius: 50,

          borderTopWidth: 0,

          paddingTop: 8,

          elevation: 10, // Android
          marginHorizontal: 30,
          marginBottom: 20,
          shadowColor: "#000", // iOS
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.12,
          shadowRadius: 10,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },

        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo size={26} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={26} name="car-alt" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Reward",
          tabBarIcon: ({ color }) => (
            <Feather size={24} name="gift" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather size={24} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
