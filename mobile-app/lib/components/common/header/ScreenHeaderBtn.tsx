import { View, Text } from "react-native";
import { TouchableOpacity, Image } from "react-native";

import { styles, btnImg } from "./screenHeader.style";

interface ScreenHeaderBtnProps {
  iconUrl: string;
  dimension: string;
  onPress: () => void;
}

const ScreenHeaderBtn: React.FC<ScreenHeaderBtnProps> = ({
  iconUrl,
  dimension,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={() => onPress()}>
      <Image source={iconUrl} resizeMode="cover" style={btnImg(dimension)} />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
