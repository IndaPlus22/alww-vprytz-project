import { SafeAreaView, Image, View, StyleSheet, Text } from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, images, SIZES } from "../../lib/constants";

const Details = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.medium }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Text style={{ fontSize: SIZES.xLarge }}>Work in Progress</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={images.wip} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Details;
