import "./App.css";
import axios from "axios";
import Navbar from "./assets/components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./assets/pages/Dashboard";
import ItemDetailsPage from "./assets/pages/ItemDetailsPage";
import CategoryPage from "./assets/pages/CategoryPage";
import AddItemPage from "./assets/pages/AddItemPage";
import EditItemPage from "./assets/pages/EditItemPage";
import { API_URL } from "./assets/utils/apiUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCategoryPage from "./assets/pages/AddCategoryPage";

function App() {
  const [items, setItems] = useState(null);
  const { categoryID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/items`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => console.log(e));
  }, [categoryID]);

  const deleteItem = (itemIdToDelete) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      axios
        .delete(`${API_URL}/items/${itemIdToDelete}`)
        .then(() => {
          setItems(null);
          navigate(`/categories/${categoryID}`);
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard items={items} />} />
        <Route
          path="/categories/:categoryID"
          element={<CategoryPage deleteItem={deleteItem} items={items} />}
        />
        <Route
          path="/categories/:categoryID/items/:itemId"
          element={<ItemDetailsPage deleteItem={deleteItem} />}
        />
        <Route
          path="/categories/:categoryID/items/:itemId/edit"
          element={<EditItemPage />}
        />
        <Route
          path="/categories/:categoryID/new-item"
          element={<AddItemPage />}
        />
        <Route path="/new-category" element={<AddCategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
