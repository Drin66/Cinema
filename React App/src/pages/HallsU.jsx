import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HallsU = () => {
  const [Halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchAllHalls = async () => {
      try {
        const res = await axios.get("http://localhost:3002/Halls");
        console.log("Fetched Halls:", res.data);

        if (Array.isArray(res.data)) {
            setHalls(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllHalls();
  }, []);
};

export default HallsU;