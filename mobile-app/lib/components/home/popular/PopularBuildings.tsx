import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useState} from 'react'
import { useRouter } from 'expo-router'

import styles from './popularBuildings.style'
import { COLORS, SIZES } from '../../../constants'
import PopularBuildingCard from '../../common/cards/popular/PopularBuildingCard'
import { useFetchSpeeds } from '../../../../API/fetch'

const PopularBuildings = () => {
  const router = useRouter();
  const { data, error, loading } = useFetchSpeeds(""); //WIP change to variable, not hard coded

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Buildings</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Error</Text>
        ) : (
              <FlatList
                data={data}
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