export default function ItemCard({ item }) {
  return (
    <>
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
    </>
  );
}
