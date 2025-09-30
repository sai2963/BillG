import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBills = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${import.meta.env.VITE_API}/api/bills`);
        if (res.status === 200 || res.status === 201) {
          console.log("Data Fetched Successfully");
          setState(res.data.bills);
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

export default useFetchBills;