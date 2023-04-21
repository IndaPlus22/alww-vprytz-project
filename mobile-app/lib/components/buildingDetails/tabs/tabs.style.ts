import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
  },
});

export const btn = (name, activeTab) => ({
  paddingVertical: SIZES.medium,
  paddingHorizontal: SIZES.xLarge,
  backgroundColor: name === activeTab ? COLORS.primary : "#F3F4F8",
  borderRadius: SIZES.medium,
  marginLeft: 2,
  ...SHADOWS.medium,
  shadowColor: COLORS.white,
});

export const btnText = (name, activeTab) => ({
  fontSize: SIZES.small,
  color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
});