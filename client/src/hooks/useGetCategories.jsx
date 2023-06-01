import { useEffect, useState } from "react";
import axios from "../api/axios";

export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("/games/categories");
      setCategories(response.data);
    };

    getCategories();
  }, []);

  return { categories };
};
