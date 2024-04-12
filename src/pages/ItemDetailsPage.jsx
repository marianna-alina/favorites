import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";

import { convertToUppercase } from "../utils/stringFunctions";

export default function ItemDetailsPage() {
  const [item, setItem] = useState(null);
  const { categoryID, itemId } = useParams();

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
        <div className="p-3  max-h-5/6 flex flex-col sm:mt-16  md:flex-row lg:w-3/4 lg:mx-auto gap-10">
          <div>
            {item.img && <img src={item.img} className="rounded-lg mx-auto" />}
          </div>
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
                  {entry[0] === "name" ? (
                    <h1 className="text-left text-3xl sm:text-5xl mb-10">
                      <b>{entry[1]}</b>
                    </h1>
                  ) : (
                    <p className="text-lg text-left">
                      <b>{convertToUppercase(entry[0])}</b>: {entry[1]}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
