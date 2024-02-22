import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/apiUrl";

export default function EditItemPage() {
  const location = useLocation();
  const { item } = location.state;
  const { categoryID } = useParams();
  const navigate = useNavigate();

  const [editedItem, setEditedItem] = useState(item);

  function handleValueChanges(e) {
    setEditedItem({
      ...editedItem,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`${API_URL}/items/${editedItem.id}`, editedItem)
      .then(function () {
        navigate(`/categories/${categoryID}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <>
      <div className="d-inline-flex flex-column w-100 p-4">
        <form onSubmit={handleSubmit}>
          {Object.entries(editedItem).map(([key, value], index) => (
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

          <button>Update Item</button>
        </form>
      </div>
    </>
  );
}
