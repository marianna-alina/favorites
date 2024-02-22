import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/apiUrl";
import { convertToUppercase } from "../utils/stringFunctions";

export default function EditItemPage() {
    const location = useLocation();
    const { item } = location.state;
    const { categoryID } = useParams();
    const navigate = useNavigate();
    const hiddenFields = ["id", "category_id", "img", "categoryId"];

    const [editedItem, setEditedItem] = useState(item);
    const [imageUrl, setImageUrl] = useState(null);
    const [waitingForImageUrl, setWaitingForImageUrl] = useState(false)

    function handleValueChanges(e) {
        setEditedItem({
            ...editedItem,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .put(`${API_URL}/items/${editedItem.id}`, {
                ...editedItem,
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

    return (
        <>
            <div className="d-inline-flex flex-column w-100 p-4">
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={(e) => handleFileUpload(e)} />
                    {Object.entries(editedItem).map(([key, value], index) => (
                        !hiddenFields.includes(key) && (
                            <div key={index} className="flex justify-between items-baseline gap-3">
                                <label className="text-lg">{convertToUppercase(key)}</label>
                                {key === "personal_notes" ? (
                                    <textarea
                                        className="mb-4 pl-2 pt-1 pb-1 rounded-md "
                                        type="text"
                                        name={key}
                                        value={value}
                                        onChange={handleValueChanges}
                                    />
                                ) : (
                                    <input
                                        className="mb-4 pl-2 pt-1 pb-1 rounded-md "
                                        type="text"
                                        name={key}
                                        value={value}
                                        onChange={handleValueChanges}
                                    />
                                )}
                            </div>
                        )
                    ))}
                    <button className="bg-slate-500 rounded-md text-white font-bold p-2 hover:opacity-70" type="submit" disabled={waitingForImageUrl}>Update Item</button>
                </form>
                {imageUrl && <img src={imageUrl} className="max-h-96 object-contain" alt="item image" />}
            </div>
        </>
    );

}
