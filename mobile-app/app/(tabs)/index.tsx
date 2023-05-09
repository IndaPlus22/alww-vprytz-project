import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";

import { COLORS } from "../../lib/constants";

import { auth, useNetworkTest } from "../../API/fetch";

const Home = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [key, setKey] = useState<number>(0);

  const networkTest = useNetworkTest(selectedEndpoint, token);

  useEffect(() => {
    if (selectedEndpoint) {
      setTestResults(networkTest);
    }
  }, [selectedEndpoint, key]);

  const handleButtonClick = (endpoint: string) => {
    setSelectedEndpoint(endpoint);
    setKey((prevKey) => prevKey + 1);
  };

  const handleTextChange = (newToken: string) => {
    // perform action here, such as sending an API request
    console.log(`New text: ${newToken}`);

    // update state to reflect new text
    setToken(newToken);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={styles.container}>
        <TextInput
          value={token}
          onChangeText={handleTextChange}
          placeholder="Add token here"
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("10")}
          >
            <Text style={styles.buttonText}>10 MB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("100")}
          >
            <Text style={styles.buttonText}>100 MB</Text>
          </TouchableOpacity>
        </View>
        {testResults && (
          <View style={styles.resultsContainer}>
            <Text>
              Download Speed: {testResults.downloadSpeed.toFixed(2)} MB/s
            </Text>
            <Text>Latency: {testResults.latency} ms</Text>
            <Text>
              Location: Lat {testResults.location.coords.latitude}, Lon{" "}
              {testResults.location.coords.longitude}
            </Text>
            <Text>Error: {testResults.errorMsg}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  resultsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default Home;
