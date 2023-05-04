import { View, Text, TouchableOpacity, Image } from "react-native";

import { styles } from "./nearbyBuildingCard.style";
import { checkImage } from "../../../../utils";
import { iBuilding } from "../../../../../API/fetch";

interface NearbyBuildingCardProps {
  building: iBuilding;
  handleNavigate: (building: iBuilding) => void;
}

const NearbyBuildingCard: React.FC<NearbyBuildingCardProps> = ({
  building,
  handleNavigate,
}) => {
  const main = async () => {
    try {
      building.image = await checkImage(building.image);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  main();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigate(building)}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: building.image }}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.name} numberOfLines={1}>
            {building.name}
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
