import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import { styles, tab, tabText } from './Welcome.style'
import { images, icons, COLORS, FONT, SIZES, SHADOWS } from '../../../constants'

const internetSpeeds: String[] = ["Fast", "Medium", "Slow"]

const Welcome = () => {
  const router = useRouter();
  const [activeInternetSpeed, setActiveInternetSpeed] = useState("Fast")

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={tab(activeInternetSpeed, item)}>
        <Text >{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.nameText}>John Doe</Text>
        <Text style={styles.WelcomeText}>Welcome back,</Text>
      </View>

      <View style={styles.searchContainer }>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput}
            value=""
            onChange={() => { }}
            placeholder="Search for Buildings"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>

        <View style={styles.tabsContainer}>
          <FlatList
            data={internetSpeeds}
            renderItem={ renderItem }
          />
        </View>

      </View>
    </View>
  )
}

export default Welcome