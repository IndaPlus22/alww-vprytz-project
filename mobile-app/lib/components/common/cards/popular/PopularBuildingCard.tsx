import { View, Text, TouchableOpacity, Image } from "react-native";

import {
  styles,
  container,
  imgContainer,
  info,
} from "./popularBuildingCard.style";
import { checkImage } from "../../../../utils";
import { iBuilding } from "../../../../../API/fetch";
import { icons } from "../../../../constants";

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
      style={container(selectedBuilding, building.name)}
      onPress={() => handleCardPress(building)}
    >
      <TouchableOpacity
        onPress={() => handleCardPress(building)}
        style={imgContainer(selectedBuilding, building.name)}
      >
        <Image
          source={icons.default_logo}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.name} numberOfLines={1}>
        XYZ: {building.lat} {building.lon} {building.floor}
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
