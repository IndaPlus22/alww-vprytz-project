import { Tabs } from "expo-router";

import { COLORS } from "../../lib/constants";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.tertiary,
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Network test",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="details/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
