import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from '@env'

export const useNetworkTest = (endpoint: string) => {
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    
    const measureDownloadSpeed = async () => {
      const startTime = Date.now();
        
      console.log(URL)
      console.log(`${URL}/${endpoint}MG.zip`)

      try {
        const response = await axios.get(`uuuu`, {
          responseType: "blob",
          cancelToken: source.token,
        });

        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // in seconds
        const fileSize = response.headers["content-length"] / (1024 * 1024); // in MB
        const speed = fileSize / duration; // speed in MB/s
        setDownloadSpeed(speed);
        console.log(speed);
      } catch (err) {
        if (axios.isCancel(err)) {
        console.log('Request canceled', err);
        } else {
        setError(err as Error);
            console.error(err);
        }
      }
    };

    measureDownloadSpeed();

    // Cleanup function to cancel the request when the component is unmounted
    return () => {
      source.cancel('Component unmounted, canceling request.');
    };
  }, [endpoint]);

  if (error) {
    // Handle the error in a way that suits your application
  }

  return downloadSpeed; // returns download speed in MB/s
};
