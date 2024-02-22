import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import { convertToUppercase } from "../utils/stringFunctions";


export default function ItemDetailsPage() {
  const [item, setItem] = useState(null);
  const { categoryID, itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/items/${itemId}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [categoryID, itemId]);

  return (
    <div>
      {item === null ? (
        <h1>Loading...</h1>
      ) : (
        <div className="p-3 max-h-5/6 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-10">
          {item.img && <img src={item.img} className="max-h-[800px] rounded-lg" />}
          <div>
            {Object.entries(item)
              .filter(
                (entry) =>
                  !entry.includes("id") &&
                  !entry.includes("category_id") &&
                  !entry.includes("categoryId") &&
                  !entry.includes("img")
              )
              .map((entry, index) => (
                <div key={index} className="flex flex-col">
                  {entry[0] === "name" ? (<h1 className="text-lg text-left text-5xl mb-10">
                    <b>{entry[1]}</b>
                  </h1>) : (<p className="text-lg text-left">
                    <b>{convertToUppercase(entry[0])}</b>: {entry[1]}
                  </p>)}

                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
