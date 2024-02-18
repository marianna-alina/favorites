import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shortUUID from "short-uuid";

export default function AddItemPage() {
  const location = useLocation();
  const { fields } = location.state;
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const newItemId = shortUUID.generate();

  useEffect(() => {
    let initialValues = {};
    fields.forEach((field) => {
      initialValues[field] = "";
    });

    setItem(initialValues);
  }, [fields]);

  const [item, setItem] = useState(null);
  const API_URL = "https://json-server-backend-app.adaptable.app";

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
        navigate(`/categories/${categoryID}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  if (item === null) return null;

  return (
    <>
      <div className="d-inline-flex flex-column w-100 p-4">
        <form onSubmit={handleSubmit}>
          {Object.entries(item).map(([key, value], index) => (
            <div key={index}>
              <label>{key}</label>

              <input
                className="form-control mb-4"
                type="text"
                name={key}
                placeholder={key}
                value={value}
                onChange={handleValueChanges}
              />
            </div>
          ))}

          <button className="btn btn-primary btn-round">Add Item</button>
        </form>
      </div>
    </>
  );
}
