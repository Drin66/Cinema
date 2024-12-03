import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

const CategoryU = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3002/categories");
        console.log("Fetched categories:", res.data);

        if (Array.isArray(res.data)) {
            setCategories(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategories();
  }, []);
};

export default CategoryU;