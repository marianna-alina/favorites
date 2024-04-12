import "./App.css";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import EditItemPage from "./pages/EditItemPage";
import AddItemPage from "./pages/AddItemPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import { API_URL } from "./utils/apiUrl";
import Navbar from "./components/Navbar";

function App() {
  const [items, setItems] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/items`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  function addItem(newItem) {
    axios
      .post(`${API_URL}/categories/${newItem.category_id}/items`, newItem)

      .then(function () {
        setItems((prevItems) => [...prevItems, newItem]);
        navigate(`/categories/${newItem.category_id}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function updateItem(updatedItem) {
    console.log(updatedItem);

    axios
      .put(`${API_URL}/items/${updatedItem.id}`, updatedItem)
      .then(function () {
        setItems((items) =>
          items.map((item) => {
            if (item.id === updatedItem.id) {
              return updatedItem;
            }
            return item;
          })
        );
        navigate(`/categories/${updatedItem.category_id}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const deleteItem = (itemToDelete) => {
    console.log(itemToDelete);
    axios
      .delete(`${API_URL}/items/${itemToDelete.id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== itemToDelete.id));
        setIsDialogOpen(false);

        navigate(`/categories/${itemToDelete.category_id}`);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
    // }
  };

  return (
    <div className="flex flex-col w-full font-primary ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard items={items} />} />
        <Route
          path="/categories/:categoryID"
          element={
            <CategoryPage
              deleteItem={deleteItem}
              items={items}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              isDialogOpen={isDialogOpen}
            />
          }
        />
        <Route
          path="/categories/:categoryID/items/:itemId"
          element={<ItemDetailsPage deleteItem={deleteItem} />}
        />
        <Route
          path="/categories/:categoryID/items/:itemId/edit"
          element={<EditItemPage onUpdateItem={updateItem} />}
        />
        <Route
          path="/categories/:categoryID/new-item"
          element={<AddItemPage onAddItem={addItem} />}
        />
        <Route path="/new-category" element={<AddCategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
