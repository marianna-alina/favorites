import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shortUUID from "short-uuid";
import { convertToUppercase, pluralToSingular } from "../utils/stringFunctions";
import { API_URL } from "../utils/apiUrl";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function AddItemPage() {
  const location = useLocation();
  const { fields, categoryName } = location.state;
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
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);

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
        img: imageUrl,
      })
      .then(function () {
        navigate(`/categories/${categoryID}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  function handleFileUpload(e) {
    setWaitingForImageUrl(true);

    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`;

    const dataToUpload = new FormData();
    dataToUpload.append("file", e.target.files[0]);
    dataToUpload.append("upload_preset", import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET);

    axios
      .post(url, dataToUpload)
      .then((response) => {
        setImageUrl(response.data.secure_url);
        setWaitingForImageUrl(false);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  }

  async function addFavorite(e) {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "items"), {
        ...item,
        category_id: categoryID,
        id: newItemId,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log(item);
      navigate(`/categories/${categoryID}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  if (item === null) return null;

  return (
    <>
      <div className="flex flex-col max-w-full p-4 gap-5 ">
        <h1 className="text-3xl font-bold">
          Add a new {pluralToSingular(categoryName)}
        </h1>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
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

          <button className="bg-slate-500 rounded-md text-white font-bold p-2 hover:opacity-70" type="submit" disabled={waitingForImageUrl}>
            Submit
          </button>
        </form>
        {imageUrl && <img src={imageUrl} alt="item image" />}
      </div>
    </>
  );
}
