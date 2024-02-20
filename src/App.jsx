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
import { useState } from "react";
import { useParams } from "react-router-dom";

function App() {

  const [items, setItems] = useState(null);
  const { categoryID } = useParams();
  const navigate = useNavigate();

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
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories/:categoryID" element={<CategoryPage deleteItem={deleteItem} />} />
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
      </Routes>
    </>
  );
}

export default App;
