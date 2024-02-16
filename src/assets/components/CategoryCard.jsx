
export default function CategoryCard({ name }) {

    return (
        <>
            <div
                className="block max-w-[18rem] rounded-lg bg-warning shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <h1 className="border-b-2 border-[#0000002d] px-6 py-3 text-black">
                    {name}
                </h1>
            </div>

        </>
    )
}