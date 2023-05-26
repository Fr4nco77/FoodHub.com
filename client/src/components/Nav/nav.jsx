import { Link } from "react-router-dom"
import { useState } from "react"

export const Nav = () => {
    let [ name, setName ] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSearch = () => {
        setName("");
    }
    return (
        <>
        <div>
            <Link><button>Home</button></Link>
            <Link><button>Recipes</button></Link>            
        </div>
        <div>
            <input type="search" placeholder="Search..." value={name} onChange={handleChange} />
            <button onClick={handleSearch}>Buscar</button>
        </div>
        </>
    )
}