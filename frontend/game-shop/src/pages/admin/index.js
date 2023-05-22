import React, { useState } from "react";
import { createGame } from "./api/POST.api";

export const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [numInStock, setNumInStock] = useState(0);

  const handleChange = (event) => {
    setFile(event.target.files[0]);

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", file);
    formData.append("numInStock", numInStock);

    createGame(formData)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <>
      <form className="d-flex gap-4">
        <fieldset className="col-2 d-flex flex-column">
          <label>Name</label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </fieldset>

        <fieldset className="col-1 d-flex flex-column">
          <label>Price</label>
          <input
            type="text"
            onChange={(event) => setPrice(event.target.value)}
          />
        </fieldset>

        <fieldset className="col-2 d-flex flex-column">
          <input className="mb-3" type="file" onChange={handleChange} />
          {image && <img width={200} height={300} src={image} alt="" />}
        </fieldset>

        <fieldset className="col-1 d-flex flex-column">
          <label>Quantity</label>
          <input
            type="text"
            onChange={(event) => setNumInStock(event.target.value)}
          />
        </fieldset>

        <button onClick={handleUpload} disabled={!image}>
          Upload
        </button>
      </form>
    </>
  );
};
