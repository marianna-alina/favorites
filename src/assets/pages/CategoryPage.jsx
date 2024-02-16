import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function CategoryPage() {

    const [category, setCategory] = useState(null)
    const [items, setItems] = useState(null);
    const API_URL = "https://json-server-backend-app.adaptable.app"

    const { categoryID } = useParams()


    useEffect(() => {
        axios.get(`${API_URL}/categories/${categoryID}`)
            .then((response) => {
                console.log(response.data) // title 
                setCategory(response.data)
            })
            .catch(e => console.log(e))
    }, [categoryID])

    useEffect(() => {
        axios.get(`${API_URL}/items`)
            .then((response) => {
                setItems(response.data)
            })
            .catch(e => console.log(e))

    }, [categoryID])


    const filterItems = (array) => {
        return array.filter((item) => {
            return item.category_id == categoryID
        })
    }

    return (
        <>
            {category === null ? <p>Loading</p> : <h1>{category.name}</h1>}

            {items === null ? <p>Loading...</p> : filterItems(items).map(filteredItem => (
                <div key={filteredItem.id}>
                    <h1 >{filteredItem.title}</h1>
                    <h2>{filteredItem.author}</h2>
                </div>

            ))}
        </>
    )
}