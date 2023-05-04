import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyBuildings.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyBuildingCard from "../../common/cards/nearby/NearbyBuildingCard";
import { iBuilding, useFetchSpeeds } from "../../../../API/fetch";

const NearbyBuildings = () => {
  const router = useRouter();

  const { buildings, error, loading } = useFetchSpeeds(""); //WIP change to variable, not hard coded

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Buildings</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Error</Text>
        ) : (
          buildings?.map((item) => (
            <NearbyBuildingCard
              building={item}
              key={item.id}
              handleNavigate={() => router.push(`/building-details/${item.id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyBuildings;
