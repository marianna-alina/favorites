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
import LandingPage from "./assets/pages/LandingPage";
import ProtectedRoute from "./assets/pages/ProtectedRoute";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { continueWithGoogle } from "./assets/utils/auth";
import { app } from "./firebaseConfig";

function App() {
  const [items, setItems] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const auth = getAuth(app);

  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  async function signupWithGoogle() {
    try {
      await continueWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

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

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator you prefer
  }

  return (
    <div className="flex flex-col w-full">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              items={items}
              handleSignUp={signupWithGoogle}
              user={user}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} redirect="/dashboard">
              <Dashboard items={items} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:categoryID"
          element={
            <ProtectedRoute user={user} redirect="/categories/:categoryID">
              <CategoryPage deleteItem={deleteItem} items={items} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:categoryID/items/:itemId"
          element={
            <ProtectedRoute
              user={user}
              redirect="/categories/:categoryID/items/:itemId"
            >
              <ItemDetailsPage deleteItem={deleteItem} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:categoryID/items/:itemId/edit"
          element={
            <ProtectedRoute
              user={user}
              redirect="/categories/:categoryID/items/:itemId/edit"
            >
              <EditItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:categoryID/new-item"
          element={
            <ProtectedRoute
              user={user}
              redirect="/categories/:categoryID/new-item"
            >
              <AddItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-category"
          element={
            <ProtectedRoute user={user} redirect="/new-category">
              <AddCategoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
