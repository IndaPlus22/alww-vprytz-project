import axios from "axios";
import { useEffect, useState } from "react";
import { EXPO_ROUTER_APP_SPEED_URL, EXPO_ROUTER_APP_API } from '@env'

import * as Location from 'expo-location';

interface PostData {
  lat: number;
  lon: number;
  altitude: number;
  speed: number;
  latency: number;
}

interface ResponseData {
  id: number;
  lat: number;
  lon: number;
  speed: number;
  latency: number;
  created_at: string;
  updated_at: string;
}

export interface iBuilding {
  id: string;
  name: string;
  image: string;
  address: string;
  floor: number;
  lat: number;
  lon: number;
  speed: number;
  latency: number;
  updated_at: string;
}

export const useNetworkTest = (endpoint: string) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [latency, setLatency] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    const measureDownloadSpeed = async () => {
      try {
        const startLatency = Date.now();
        await axios.head(`${EXPO_ROUTER_APP_SPEED_URL}/${endpoint}MB.zip`, {
          cancelToken: source.token,
        });
        const endLatency = Date.now();
        const latency = endLatency - startLatency;
        setLatency(latency);

        const startTime = Date.now();
        const response = await axios.get(`${EXPO_ROUTER_APP_SPEED_URL}/${endpoint}MB.zip`, {
          responseType: "blob",
          cancelToken: source.token,
        });
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // in seconds
        const fileSize = response.headers["content-length"] / (1024 * 1024); // in MB
        const speed = fileSize / duration; // speed in MB/s
        setDownloadSpeed(speed);
        console.log(`Speed: ${speed} MB/s, Latency: ${latency} ms`);

        const postData: PostData = {
          lat: location?.coords.latitude || 0,
          lon: location?.coords.longitude || 0,
          altitude: location?.coords.altitude || 0,
          speed,
          latency,
        };
        console.log(postData);
        await sendPost(postData);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err);
        } else {
          setError(err as Error);
          console.error(err);
        }
      }
    };

    const sendPost = async (data: PostData) => {
      try {
        const response = await axios.post(`${EXPO_ROUTER_APP_API}/measurements`, data);
        console.log(response.data);
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    };

    measureDownloadSpeed();

    return () => {
      source.cancel('Component unmounted, canceling request.');
    };
  }, [endpoint]);

  if (error) {
    //WIP
  }

  return { downloadSpeed, latency, location, errorMsg };
};

export const useFetchSpeeds = (id: string) => {
  const [data, setData] = useState<ResponseData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // const options = {
  //   method: 'GET',
  //   url: `${EXPO_ROUTER_APP_API}/measurements${id ? `/${id}` : ''}}`,
  // };

  // useEffect(() => {
  //   const source = axios.CancelToken.source();

  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.request({
  //         ...options,
  //         cancelToken: source.token,
  //       });
  //       setData(response.data);
  //     } catch (err) {
  //       if (axios.isCancel(err)) {
  //         console.log('Request canceled', err);
  //       } else {
  //         setError(err as Error);
  //         console.error(err);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     source.cancel('Component unmounted, canceling request.');
  //   };
  // }, []);

  // if (error) {
  //   //WIP
  // }

  let buildings = parseData(data)

  return { buildings, error, loading };
};

const parseData = (unParsedData: ResponseData[]) => {
  //convert lat lon to address
  //infer building name from address
  //infer floor from altitude
  //return array of buildings

  let iBuildings: iBuilding[] = []
  return exampleBuildings
}

const exampleBuildings: iBuilding[] = Array.from({ length: 10 }, (_, i) => ({
  id: `id${i + 1}`,
  name: `Building ${i + 1}`,
  image: `https://example.com/building${i + 1}.jpg`,
  address: `100${i + 1} Main St`,
  lat: 59.34 + i / 100,
  lon: 18.12 + i / 100,
  floor: i,
  speed: 100 + i,
  latency: 10 + i,
  updated_at: new Date().toISOString(),
}));