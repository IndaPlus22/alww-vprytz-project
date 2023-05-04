import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  name: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  details: {
    fontSize: SIZES.small,
    color: "#B3AEC6",
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
  additional_info: {
    marginTop: 5,
    fontSize: SIZES.small - 2,
    color: "#B3AEC6",
  },
});