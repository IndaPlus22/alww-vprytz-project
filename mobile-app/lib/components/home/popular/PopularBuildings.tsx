import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useState} from 'react'
import { useRouter } from 'expo-router'

import styles from './popularBuildings.style'
import { COLORS, SIZES } from '../../../constants'
import PopularBuildingCard from '../../common/cards/popular/PopularBuildingCard'

const PopularBuildings = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Buildings</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Error</Text>
        ) : (
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={({ item }) => <PopularBuildingCard item={item} />}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{ columnGap: SIZES.medium }}
                horizontal
              />
        )}
      </View>
    </View>
  )
}

export default PopularBuildings