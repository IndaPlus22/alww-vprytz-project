import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

import { images, icons, COLORS, SIZES, SHADOWS } from "../../lib/constants";
import {
  ScreenHeaderBtn,
  Welcome,
  NearbyBuildings,
  PopularBuildings,
  //   Building,
} from "../../lib/components";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View
        style={{
          paddingBottom: SIZES.small,
        }}
      ></View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome />
          <PopularBuildings />
          <NearbyBuildings />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
