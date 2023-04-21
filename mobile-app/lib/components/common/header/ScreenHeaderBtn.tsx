import { View, Text } from 'react-native'
import { TouchableOpacity, Image } from 'react-native'

import { styles, btnImg } from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={btnImg(dimension)}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn