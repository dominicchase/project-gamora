import { useEffect, useState } from "react";
import axios from "../api/axios";

export const useGetCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const { data: categoryData } = await axios.get("/games/categories");
      setAllCategories(categoryData);
    };

    getCategories();
  }, []);

  return { allCategories };
};
