import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

export const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: "70%",
  },
  name: {
    fontSize: SIZES.small,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  additional_info: {
    marginTop: 5,
    fontSize: SIZES.medium - 2,
    color: "#B3AEC6",
  },
});

export const container = (selectedBuilding: string, item_name: string) => ({
  width: 250,
  padding: SIZES.xLarge,
  paddingBottom: SIZES.small,
  backgroundColor: selectedBuilding === item_name ? COLORS.primary : "#FFF",
  borderRadius: SIZES.medium,
  justifyContent: "space-between",
  ...SHADOWS.medium,
  shadowColor: COLORS.white,
});

export const imgContainer = (selectedBuilding: string, item_name: string) => ({
  width: 50,
  height: 50,
  backgroundColor: selectedBuilding === item_name ? "#FFF" : COLORS.white,
  borderRadius: SIZES.medium,
  justifyContent: "center",
  alignItems: "center",
});

export const info = (selectedBuilding: string, item_name: string) => ({
  fontSize: SIZES.large,
  color: selectedBuilding === item_name ? COLORS.white : COLORS.primary,
});


