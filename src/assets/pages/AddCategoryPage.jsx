import { useState } from "react";
import shortUUID from "short-uuid";
import { API_URL } from "../utils/apiUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCategoryPage() {
  const [category, setCategory] = useState({
    name: "",
    fields: new Array(5).fill(""),
  });
  const newCategoryId = shortUUID.generate();
  const navigate = useNavigate();
  function handleValueChanges(index, value) {
    setCategory({
      ...category,
      fields: category.fields.map((field, i) => (i === index ? value : field)),
      // [e.target.name]: e.target.value,
    });
  }

  function handleNameChange(e) {
    setCategory({
      ...category,
      name: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`${API_URL}/categories`, {
        ...category,
        category_id: newCategoryId,
      })
      .then(function () {
        console.log(category);

        navigate(`/`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  return (
    <>
      <div className="flex flex-col max-w-full p-4 gap-5 ">
        <h1 className="text-3xl font-bold">Add a new custom category</h1>
        <form onSubmit={handleSubmit}>
          <h2>Type the name of the category (e.g. &quot;Tv Shows&quot;)</h2>
          <div className="flex justify-between items-baseline gap-3">
            <label className="text-lg">Name</label>

            <input
              required
              className="mb-4 pl-2 pt-1 pb-1 rounded-md "
              type="text"
              name="name"
              placeholder="A name for the category"
              value={category.name}
              onChange={handleNameChange}
            />
          </div>
          <h2>
            Type fields you want to associate to this category (e.g. for tv
            shows: genre, year...){" "}
          </h2>
          <p>You can type up to 5 fields</p>
          {category.fields.map((field, index) => (
            <div
              className="flex justify-between items-baseline gap-3"
              key={index}
            >
              <label className="text-lg">{`Field #${index + 1}`}</label>

              <input
                required
                className="mb-4 pl-2 pt-1 pb-1 rounded-md "
                type="text"
                name={`Field #${index + 1}`}
                placeholder={`Field #${index + 1}`}
                value={field}
                onChange={(e) => handleValueChanges(index, e.target.value)}
              />
            </div>
          ))}

          <button className="bg-slate-500 rounded-md text-white font-bold p-2 hover:opacity-70">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
