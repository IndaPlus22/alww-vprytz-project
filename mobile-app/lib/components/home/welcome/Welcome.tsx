import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import { styles, tab, tabText } from "./welcome.style";
import { images, icons, COLORS, SIZES, SHADOWS } from "../../../constants";

const internetSpeeds: String[] = ["Fast", "Medium", "Slow"];

const Welcome = () => {
  const router = useRouter();
  const [currentInternetSpeed, setCurrentInternetSpeed] = useState("Fast");

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={tab(currentInternetSpeed, item)}
        onPress={() => {
          setCurrentInternetSpeed(item);
          router.push(`/search/${item}`);
        }}
      >
        <Text style={tabText(currentInternetSpeed, item)}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="Search for Buildings"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={internetSpeeds}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
