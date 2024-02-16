import "./App.css";
import Navbar from "./assets/components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./assets/pages/Dashboard";
import ItemDetailsPage from "./assets/pages/ItemDetailsPage";
import CategoryCard from "./assets/components/CategoryCard";
import CategoryPage from "./assets/pages/CategoryPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories/:categoryID" element={<CategoryPage />} />
        <Route path="/items/:itemId" element={<ItemDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
