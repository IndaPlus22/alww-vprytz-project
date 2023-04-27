import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNetworkTest } from '../../../API/fetch';

const SpeedTestComponent = () => {
  const speed = useNetworkTest("10");

  return (
    <View>
      <Text>Current download speed: {speed} MB/s</Text>
    </View>
  );
};

export default SpeedTestComponent;
