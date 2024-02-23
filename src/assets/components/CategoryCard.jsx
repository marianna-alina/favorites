export default function CategoryCard({ name, items, id }) {
  const filterItems = (array) => {
    if (array) {
      return array.filter((item) => {
        return item.category_id == id;
      });
    }
  };

  return (
    <div className="bg-white/20 rounded-lg flex-1 w-full h-full">
      <h1 className="px-6 py-3 text-black text-left text-sm">
        {name.toUpperCase()}
      </h1>
      <div className="grid grid-cols-3 p-2  h-full">
        {items !== null &&
          filterItems(items)
            .slice(0, 3)
            .map((item) => (
              <div key={item.id} className="min-h-44 h-44  w-24 mx-auto">
                <img
                  src={item.img}
                  className="object-cover max-w-full max-h-full mx-auto"
                />
                <p>{item.name}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
