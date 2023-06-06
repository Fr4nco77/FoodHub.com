import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Nav.module.css";
import { useDispatch } from "react-redux";
import { addAllRecipes, addRecipes, removeFilters } from "../../redux/actions";

export const Nav = () => {
    let [ title, setTitle ] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSearch = () => {
        dispatch(addRecipes(title));
        setTitle("");
        navigate("/home");
    }

    const handleBack = () => {
        dispatch(addAllRecipes());
        dispatch(removeFilters());
        navigate("/home");
    }
    return (
        <div id={styles.container}>
            <div className={styles.control}>
                <div className={styles.logo}>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}><button>Food<span>Hub</span></button></Link>
                </div>
                <div className={styles.buttons}>
                    <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}><button>Home</button></Link>
                    <Link to="/form" style={{ textDecoration: 'none', color: 'inherit' }}><button>New Recipe</button></Link>         
                </div>
            </div>
            <div className={styles.searchBar}>
                <input type="search" placeholder="Explore..." value={title} onChange={handleChange} />
                <button onClick={handleSearch}><svg width="100%" height="100%" viewBox="0 0 24 24" strokeWidth="1.7" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f5ebc7"><path d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z" stroke="#f5ebc7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                <button onClick={handleBack}><svg width="100%" height="100%" strokeWidth="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f5ebc7"><path d="M21.888 13.5C21.164 18.311 17.013 22 12 22 6.477 22 2 17.523 2 12S6.477 2 12 2c4.1 0 7.625 2.468 9.168 6" stroke="#f5ebc7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 8h4.4a.6.6 0 00.6-.6V3" stroke="#f5ebc7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
            </div> 
        </div>
    )
}