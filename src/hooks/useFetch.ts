import { useState, useEffect } from "react";
import axios from "axios";
import { ENV_BE } from "../constants";
const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let res = await axios.get(`${ENV_BE}/${url}`);
      let data = res && res.data.data ? res.data.data : [];
      setData(data);
      setLoading(false);
    })();
  }, []);

  return {
    data,
    loading,
  };
};
export default useFetch;
