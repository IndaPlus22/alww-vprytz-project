import axios from "axios";
import { useEffect, useState } from "react";
import { SPEED_URL, API } from '@env'

import * as Location from 'expo-location';
import { checkImage } from "../lib/utils";
import * as WebBrowser from "expo-web-browser";

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
  altitude: number;
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

export const useNetworkTest = (endpoint: string, token: string) => {
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
        await axios.head(`${SPEED_URL}/${endpoint}MB.zip`, {
          cancelToken: source.token,
        });
        const endLatency = Date.now();
        const latency = endLatency - startLatency;
        setLatency(latency);

        const startTime = Date.now();
        const response = await axios.get(`${SPEED_URL}/${endpoint}MB.zip`, {
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
    console.log(token)
    const sendPost = async (data: PostData) => {
      try {
        const response = await axios.post(`${API}measurements`, data, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
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
  console.log(downloadSpeed)
  return { downloadSpeed, latency, location, errorMsg };
};

export const useFetchSpeeds = (id: string) => {
  const [data, setData] = useState<ResponseData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const options = {
    method: 'GET',
    url: `${API}measurements${id ? `/${id}` : ''}`,
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.request({
          ...options,
          cancelToken: source.token,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err);
        } else {
          setError(err as Error);
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel('Component unmounted, canceling request.');
    };
  }, []);

  if (error) {
    //WIP
  }
  console.log(data)
  let buildings = parseBuildingData(data)

  return { buildings, error, loading };
};

const parseBuildingData = (data: any): iBuilding[] => {
  return data.map((building: any) => ({
    id: building.id.toString(),
    name: "KTH",
    image: "",
    address: "Unfucking know",
    floor: building.altitude.toFixed(2),
    lat: building.lat.toFixed(2),
    lon: building.lon.toFixed(2),
    speed: building.speed.toFixed(2),
    latency: building.latency.toFixed(2),
    updated_at: building.updated,
  }));
};



const useURL = () => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}auth`);
        setUrl(response.data.url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return url;
};

export const auth = () => {
  const url = useURL();

  const handleLogin = async () => {
    if (url) {
      const result = await WebBrowser.openAuthSessionAsync(url, "osqspeed://");
      // Handle the result of the auth session here
    }
  };

  return handleLogin;
};