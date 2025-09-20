import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProducts = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true); // Start with true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("https://dummyjson.com/products");
        if (res.status === 200 || res.status === 201) {
          console.log("Data Fetched Successfully");
          setState(res.data.products);
        } else {
          console.log("Something Went Wrong");
          setError("Failed to fetch products");
        }
      } catch (error) {
        console.log(error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { state, loading, error };
};

export default useFetchProducts;