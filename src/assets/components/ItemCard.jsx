import { IoHeartDislikeOutline } from "react-icons/io5";


export default function ItemCard({ item, deleteItem }) {

  return (
    <div className="bg-white/20 rounded-lg">

      <IoHeartDislikeOutline onClick={() => deleteItem(item.id)} />
      <div>
        {item.img && <img src={item.img} />}
        {Object.entries(item)
          .filter(
            (entry) =>
              !entry.includes("id") &&
              !entry.includes("category_id") &&
              !entry.includes("img")
          )
          .map((entry, index) => (
            <div key={index}>
              <p>
                {entry[0].toUpperCase().replace("_", " ")}: {entry[1]}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
