import React, { useEffect, useReducer, useState } from "react";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

const initialState = {
  name: "",
  category: "",
  price: 0,
  image: {
    file: undefined,
    data: undefined,
  },
  numInStock: 0,
};

export const UploadForm = ({ toggleShow, resetGamesData, game }) => {
  const axiosPrivate = useAxiosPrivate();

  const [uploadState, uploadDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    game ?? initialState
  );

  const { name, category, price, image, numInStock } = uploadState;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      uploadDispatch({
        ...uploadState,
        image: { file, data: reader.result },
      });
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    uploadDispatch({ ...uploadState, [name]: value });
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image.file);
    formData.append("numInStock", numInStock);

    if (game) {
      await updateGame(game._id, formData);
      resetGamesData();
      toggleShow(false);
    } else {
      await axiosPrivate.post("/admin/create", formData);

      resetGamesData();
      toggleShow(false);
    }
  };

  const [categories, setCategories] = useState([]);

  const [showCategoryFields, toggleShowCategoryFields] = useState(false);

  const getCategories = async () => {
    const response = await axiosPrivate.get("/admin/categories");
    console.log(response.data);
    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleNewCategory = async () => {
    const response = await axiosPrivate.post("/admin/create/category", {
      categoryName,
      categoryEnum,
    });

    await getCategories();

    toggleShowCategoryFields(false);
  };

  const [categoryName, setCategoryName] = useState("");
  const [categoryEnum, setCategoryEnum] = useState("");

  return (
    <form className="d-flex flex-column gap-3">
      <fieldset className="d-flex flex-column">
        <label className="text-muted mb-2">Name</label>

        <input type="text" name="name" value={name} onChange={handleChange} />
      </fieldset>

      <fieldset className="d-flex flex-column">
        <label className="text-muted mb-2">Category</label>

        <select defaultValue="" name="category" onChange={handleChange}>
          <option value="">Category</option>

          {categories.map((option) => (
            <option value={option.categoryEnum}>{option.categoryName}</option>
          ))}
        </select>
      </fieldset>

      {!showCategoryFields && (
        <button
          type="button"
          onClick={() => toggleShowCategoryFields((prevState) => !prevState)}
        >
          Add Category
        </button>
      )}

      {showCategoryFields && (
        <form className="d-flex gap-3">
          <fieldset className="d-flex flex-column">
            <label className="text-muted mb-2">Category Name</label>

            <input
              type="text"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
          </fieldset>

          <fieldset className="d-flex flex-column">
            <label className="text-muted mb-2">Category Enum</label>

            <input
              type="text"
              value={categoryEnum}
              onChange={(event) => setCategoryEnum(event.target.value)}
            />
          </fieldset>

          <button type="button" onClick={handleNewCategory}>
            Add Category
          </button>
        </form>
      )}

      <fieldset className="d-flex flex-column">
        <label className="text-muted mb-2">Price</label>

        <input
          type="text"
          name="price"
          value={+price}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset className="d-flex flex-column">
        <label className="text-muted mb-2">Image</label>

        <input
          className={`${image.file && "mb-3"}`}
          type="file"
          accept="jpg jpeg png"
          onChange={handleFileChange}
        />
        {image.file && <img width={200} height={300} src={image.data} alt="" />}
      </fieldset>

      <fieldset className="d-flex flex-column mb-5">
        <label className="text-muted mb-2">Quantity</label>

        <input
          type="text"
          name="numInStock"
          value={+numInStock}
          onChange={handleChange}
        />
      </fieldset>

      <button
        className="w-25 primary-btn"
        onClick={handleUpload}
        disabled={!image}
      >
        Upload
      </button>
    </form>
  );
};
