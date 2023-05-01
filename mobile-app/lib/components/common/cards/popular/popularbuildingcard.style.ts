import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

export const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: "70%",
  },
  buildingName: {
    fontSize: SIZES.medium,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  location: {
    fontSize: SIZES.medium - 2,
    color: "#B3AEC6",
  },
});

export const container = (selectedBuilding: string, item_name: string) => ({
  width: 250,
  padding: SIZES.xLarge,
  backgroundColor: selectedBuilding === item_name ? COLORS.primary : "#FFF",
  borderRadius: SIZES.medium,
  justifyContent: "space-between",
  ...SHADOWS.medium,
  shadowColor: COLORS.white,
});

export const logoContainer = (selectedBuilding: string, item_name: string) => ({
  width: 50,
  height: 50,
  backgroundColor: selectedBuilding === item_name ? "#FFF" : COLORS.white,
  borderRadius: SIZES.medium,
  justifyContent: "center",
  alignItems: "center",
});

export const jobName = (selectedBuilding: string, item_name: string) => ({
  fontSize: SIZES.large,
  color: selectedBuilding === item_name ? COLORS.white : COLORS.primary,
});


