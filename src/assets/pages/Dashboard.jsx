import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import axios from "axios"

import CategoryCard from "../components/CategoryCard"


export default function Dashboard() {

    const [category, setCategory] = useState(null)
    const API_URL = "https://json-server-backend-app.adaptable.app"
    const { categoryID } = useParams()

    useEffect(() => {
        axios.get(`${API_URL}/categories`)
            .then((response) => {
                setCategory(response.data)
            })
            .catch(e => console.log(e))
    }, [categoryID])

    return (
        <>
            <h1>This is Dashboard</h1>

            {category === null ? <p>Loading...</p> :
                (category.map((element) => {
                    return <Link to={`/categories/${element.id}`} key={element.id}><CategoryCard name={element.name} /></Link>


                })
                )}


        </>
    )
}