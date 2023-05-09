import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNetworkTest } from "../../../API/fetch";

const SpeedTestComponent = () => {
  // const res = useNetworkTest("10");

  // return (
  //   <View>
  //     <Text>Current download speed: {res.downloadSpeed} MB/s</Text>
  //     <Text>Current latency speed: {res.latency} ms</Text>
  //     <Text>
  //       Current lat/lon speed: {res.location?.coords.latitude}{" "}
  //       {res.location?.coords.longitude}
  //     </Text>
  //     <Text>Current altitude: {res.location?.coords.altitude}</Text>
  //   </View>
  // );
  return <Text>Network</Text>;
};

export default SpeedTestComponent;
