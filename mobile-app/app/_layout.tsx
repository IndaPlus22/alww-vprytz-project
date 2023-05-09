import { useState } from "react";
import { View, Text } from "react-native";

import { Stack, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";

import { images, icons, COLORS, SIZES, SHADOWS } from "../lib/constants";
import { ScreenHeaderBtn } from "../lib/components";
import { auth } from "../API/fetch";

export default function RootLayout() {
  const router = useRouter();
  const handleLogin = auth();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                paddingVertical: SIZES.small / 2,
              }}
            >
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                onPress={() => router.back()}
              />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingVertical: SIZES.small / 2,
              }}
            >
              <ScreenHeaderBtn
                iconUrl={images.profile}
                dimension="100%"
                onPress={handleLogin}
              />
            </View>
          ),
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
