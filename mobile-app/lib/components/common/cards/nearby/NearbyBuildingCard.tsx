import { View, Text, TouchableOpacity, Image } from "react-native";

import { styles } from "./nearbyBuildingCard.style";
import { checkImage } from "../../../../utils";
import { iBuilding } from "../../../../../API/fetch";
import { icons } from "../../../../constants";

interface NearbyBuildingCardProps {
  building: iBuilding;
  handleNavigate: (building: iBuilding) => void;
}

const NearbyBuildingCard: React.FC<NearbyBuildingCardProps> = ({
  building,
  handleNavigate,
}) => {
  // const main = async () => {
  //   try {
  //     building.image = await checkImage(building.image);
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // };

  // main();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigate(building)}
    >
      <TouchableOpacity
        onPress={() => handleNavigate(building)}
        style={styles.logoContainer}
      >
        <Image
          source={icons.default_logo}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.name} numberOfLines={1}>
            XY: {building.lat} {building.lon}
          </Text>
          <Text style={styles.details} numberOfLines={1}>
            floor {building.floor}
          </Text>
        </View>

        <View style={styles.infoColumn}>
          <Text style={styles.details} numberOfLines={1}>
            <Text>Download speed: </Text>
            {building.speed} MB/S
          </Text>

          <Text style={styles.details} numberOfLines={1}>
            <Text>Latency: </Text>
            {building.latency} ms
          </Text>
        </View>

        <Text style={styles.additional_info} numberOfLines={1}>
          Last updated: {building.updated_at}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyBuildingCard;
