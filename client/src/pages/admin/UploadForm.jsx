import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

const initialState = {
  name: "",
  category: "INIT",
  price: 0,
  image: {
    file: undefined,
    data: undefined,
  },
  description: "",
  numInStock: 0,
};

export const UploadForm = ({ toggleShow, handleGetGames, game }) => {
  const axiosPrivate = useAxiosPrivate();

  const [uploadState, uploadDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    { ...game, category: game?.category?.categoryEnum } ?? initialState
  );
  const [categories, setCategories] = useState([]);
  const [showCategoryFields, toggleShowCategoryFields] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryEnum, setCategoryEnum] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const { name, category, price, image, description, numInStock } = uploadState;

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image.file);
    formData.append("numInStock", numInStock);

    let response;

    if (game) {
      response = await axiosPrivate
        .put(`/admin/update/?id=${game._id}`, formData)
        .catch((err) => toast.error(err.response.data.message ?? "Error"));
    } else {
      response = await axiosPrivate
        .post("/admin/create", formData)
        .catch((err) => toast.error(err.response.data.message ?? "Error"));
    }

    if (response.data) {
      toast.success(`Successfully edited ${game.name}`);
      toggleShow((prevState) => !prevState);
      handleGetGames();
    }
  };

  const getCategories = async () => {
    const response = await axiosPrivate.get("/admin/categories");
    setCategories(response.data);
  };

  const handleNewCategory = async () => {
    await axiosPrivate.post("/admin/create/category", {
      categoryName,
      categoryEnum,
    });

    await getCategories();

    setCategoryName("");
    setCategoryEnum("");
    toggleShowCategoryFields(false);
  };

  const handleDeleteGame = async () => {
    await axiosPrivate
      .delete(`/admin/delete/?id=${game._id}`)
      .catch((err) => toast.error(err.response.data.message ?? "Error"));

    toast.success(`Successfully deleted ${game.name}`);

    toggleShow((prevState) => !prevState);
    handleGetGames();
  };

  return (
    <form className="d-flex flex-column gap-3">
      <fieldset className="d-flex gap-4 mb-3">
        <input
          name="name"
          value={name}
          onChange={handleChange}
          type="text"
          placeholder="Name"
        />

        <input
          name="price"
          value={price}
          onChange={handleChange}
          type="text"
          placeholder="Price"
        />
      </fieldset>

      <fieldset className="d-flex gap-4 mb-3">
        <select
          className={(!category || category === "INIT") && "text-muted"}
          name="category"
          onChange={handleChange}
        >
          <option value="INIT">Category</option>

          {categories.map((option) => (
            <option
              value={option.categoryEnum}
              selected={category === option.categoryEnum}
              key={`category-${option.categoryEnum}`}
            >
              {option.categoryName}
            </option>
          ))}
        </select>

        <button
          className="btn-secondary"
          onClick={() => toggleShowCategoryFields((prevState) => !prevState)}
          type="button"
          disabled={showCategoryFields}
        >
          New Category
        </button>
      </fieldset>

      {showCategoryFields && (
        <fieldset className="d-flex gap-3 mb-3">
          <input
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            type="text"
            placeholder="Category Name"
          />

          <input
            value={categoryEnum}
            onChange={(event) => setCategoryEnum(event.target.value)}
            type="text"
            placeholder="Category Enum"
          />

          <button
            className="btn-secondary"
            onClick={handleNewCategory}
            type="button"
          >
            Submit
          </button>
        </fieldset>
      )}

      <fieldset className="mb-3">
        <label className="d-block h6 mb-3">Image</label>

        <input
          className={`d-block ${image?.file && "mb-4"}`}
          type="file"
          accept="jpg jpeg png"
          onChange={handleFileChange}
        />

        {image?.file && <img width={200} height={300} src={image?.data} />}
      </fieldset>

      <fieldset className="mb-3">
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          type="text"
          placeholder="Description"
        />
      </fieldset>

      <fieldset className="w-25 mb-3">
        <input
          name="numInStock"
          value={numInStock}
          onChange={handleChange}
          type="text"
          placeholder="Qty"
        />
      </fieldset>

      <div className="d-flex gap-4">
        <button
          className="btn-secondary w-50"
          onClick={handleSubmit}
          disabled={!image}
        >
          {game ? "Save" : "Create"}
        </button>

        {game && (
          <button
            className="delete-btn w-50 mb-5"
            type="button"
            onClick={handleDeleteGame}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};
