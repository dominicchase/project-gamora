import React, { useReducer } from "react";
import { createGame, updateGame } from "../../../api/admin/api";

const initialState = {
  name: "",
  price: 0,
  image: {
    file: undefined,
    data: undefined,
  },
  numInStock: 0,
};

export const UploadForm = ({ toggleShow, resetGamesData, game }) => {
  const [uploadState, uploadDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    game ?? initialState
  );

  const { name, price, image, numInStock } = uploadState;

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

  const handleUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image.file);
    formData.append("numInStock", numInStock);

    if (game) {
      updateGame(game._id, formData).then(async () => {
        await resetGamesData();
        toggleShow(false);
      });
    } else {
      createGame(formData)
        .then(async () => {
          await resetGamesData();
          toggleShow(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  return (
    <form className="d-flex flex-column gap-3">
      <fieldset className="d-flex flex-column">
        <label className="text-muted mb-2">Name</label>
        <input type="text" name="name" value={name} onChange={handleChange} />
      </fieldset>

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
