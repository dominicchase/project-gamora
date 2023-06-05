import { useEffect, useState } from "react";
import axios from "../api/axios";

export const useGetCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get("/games/categories");
      setAllCategories(data);
    };

    getCategories();
  }, []);

  return { allCategories };
};
