// useDataFetching.ts
"use client";

import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useDataFetching = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((jsonData) => {
          setData(jsonData);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };

    fetchData();

    // Clean up function
    return () => {
      // Any cleanup code goes here
    };
  }, [url]); // Re-run effect whenever the URL changes

  return { data, loading, error };
};

export default useDataFetching;
