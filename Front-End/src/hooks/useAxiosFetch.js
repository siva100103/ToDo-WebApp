import axios from "axios";
import { useEffect, useState } from "react";

function useAxiosFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        if (error.response) {
            console.log('Response error:', error.response.data);
          } else if (error.request) {
            console.log('Request error:', error.request);
          } else {
            console.log('Error:', error.message);
          }
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useAxiosFetch;
