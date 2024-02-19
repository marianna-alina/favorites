import "./App.css";
import Navbar from "./assets/components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./assets/pages/Dashboard";
import ItemDetailsPage from "./assets/pages/ItemDetailsPage";
import CategoryPage from "./assets/pages/CategoryPage";
import AddItemPage from "./assets/pages/AddItemPage";
import EditItemPage from "./assets/pages/EditItemPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories/:categoryID" element={<CategoryPage />} />
        <Route
          path="/categories/:categoryID/items/:itemId"
          element={<ItemDetailsPage />}
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
