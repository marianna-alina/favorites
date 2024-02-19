import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shortUUID from "short-uuid";
import { convertToUppercase, pluralToSingular } from "../utils/stringFunctions";
import { API_URL } from "../utils/apiUrl";

export default function AddItemPage() {
  const location = useLocation();
  const { fields, categoryName } = location.state;
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const newItemId = shortUUID.generate();
  console.log(categoryName);

  useEffect(() => {
    let initialValues = {};
    fields.forEach((field) => {
      initialValues[field] = "";
    });

    setItem(initialValues);
  }, [fields]);

  const [item, setItem] = useState(null);

  function handleValueChanges(e) {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`${API_URL}/categories/${categoryID}/items`, {
        ...item,
        category_id: categoryID,
        id: newItemId,
      })
      .then(function () {
        console.log(item);

        navigate(`/categories/${categoryID}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  if (item === null) return null;

  return (
    <>
      <div className="flex flex-col max-w-full p-4 gap-5 ">
        <h1 className="text-3xl font-bold">
          Add a new {pluralToSingular(categoryName)}
        </h1>
        <form onSubmit={handleSubmit}>
          {Object.entries(item).map(([key, value], index) => (
            <div
              key={index}
              className="flex justify-between items-baseline gap-3"
            >
              <label className="text-lg">{convertToUppercase(key)}</label>

              {key === "personal_notes" ? (
                <textarea
                  required
                  className="mb-4 pl-2 pt-1 pb-1 rounded-md ml-4"
                  type="text"
                  name={key}
                  placeholder={convertToUppercase(key)}
                  value={value}
                  onChange={handleValueChanges}
                ></textarea>
              ) : (
                <input
                  required
                  className="mb-4 pl-2 pt-1 pb-1 rounded-md "
                  type="text"
                  name={key}
                  placeholder={convertToUppercase(key)}
                  value={value}
                  onChange={handleValueChanges}
                />
              )}
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
