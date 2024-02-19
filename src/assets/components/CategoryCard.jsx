
export default function CategoryCard({ name }) {

    return (
        <div
            className="bg-white/20 rounded-lg flex-1 w-full h-full">
            <h1 className="border-b-2 border-[#0000002d] px-6 py-3 text-black">
                {name}
            </h1>
        </div>

    )
}