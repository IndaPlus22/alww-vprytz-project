import { View, Text, TouchableOpacity, Image } from "react-native";

import {
  styles,
  container,
  imgContainer,
  info,
} from "./popularBuildingCard.style";
import { checkImage } from "../../../../utils";
import { iBuilding } from "../../../../../API/fetch";

interface PopularBuildingCardProps {
  building: iBuilding;
  selectedBuilding: string;
  handleCardPress: (building: iBuilding) => void;
}

const PopularBuildingCard: React.FC<PopularBuildingCardProps> = ({
  building,
  selectedBuilding,
  handleCardPress,
}) => {
  return (
    <TouchableOpacity
      style={container(selectedBuilding, building.name)}
      onPress={() => handleCardPress(building)}
    >
      <TouchableOpacity style={imgContainer(selectedBuilding, building.name)}>
        <Image
          source={{ uri: checkImage(building.image) }}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.name} numberOfLines={1}>
        {building.name}, floor {building.floor}
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text>Download speed: </Text>
            <Text
              style={info(selectedBuilding, building.name)}
              numberOfLines={1}
            >
              {building.speed} MB/S
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text>Latency: </Text>
            <Text
              style={info(selectedBuilding, building.name)}
              numberOfLines={1}
            >
              {building.latency} ms
            </Text>
          </View>
        </View>
        <Text style={styles.additional_info} numberOfLines={1}>
          Last updated: {building.updated_at}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularBuildingCard;
