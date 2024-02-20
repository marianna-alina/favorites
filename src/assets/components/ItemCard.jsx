import { IoHeartDislikeOutline } from "react-icons/io5";
import { convertToUppercase } from "../utils/stringFunctions";
import { MdOutlineModeEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ItemCard({ item, deleteItem }) {
  const { categoryID, itemId } = useParams();
  const filtered = Object.entries(item).filter(
    (entry) =>
      !entry.includes("id") &&
      !entry.includes("categoryId") &&
      !entry.includes("category_id") &&
      !entry.includes("img")
  );

  console.log(filtered);
  return (
    <div className="bg-white/20 rounded-lg p-3 ">
      <div className="flex justify-end">
        <IoHeartDislikeOutline size={30} onClick={() => deleteItem(item.id)} />
        <Link to={`/categories/${categoryID}/items/${itemId}/edit`} state={{ item: item }}>
          <MdOutlineModeEdit size={30} />
        </Link>
      </div>
      <Link to={`items/${item.id}`}>
        <div className="text-left">
          {item.img && <img src={item.img} />}
          {Object.entries(item)
            .filter(
              (entry) =>
                !entry.includes("id") &&
                !entry.includes("category_id") &&
                !entry.includes("categoryId") &&
                !entry.includes("img")
            )
            .map((entry, index) => (
              <div key={index}>
                <p className="text-lg">
                  <b>{convertToUppercase(entry[0])}</b>: {entry[1]}
                </p>
              </div>
            ))}
        </div>
      </Link>
    </div>
  );
}
