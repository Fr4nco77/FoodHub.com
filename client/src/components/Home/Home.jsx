import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addAllRecipes,  addDiets,  dietsFilter, orderHS, orderOrigin,  orderRecipes,  removeFilters} from "../../redux/actions";


export const Home = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const recipes = useSelector((state) => state.recipes);
    const filterRecipes = useSelector((state) => state.filterRecipes);
    const diets = useSelector((state) => state.diets);

    const [orderBy, setOrderBy] = useState("");
    const [healthScore, setHealthScore] = useState("");
    const [origin, setOrigin] = useState("");
    const [selectedDiet, setSelectedDiet] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState(1);
    const cardsPerPage = 9;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = data?.slice(indexOfFirstCard, indexOfLastCard);
  
    const totalPages = Math.ceil(data?.length / cardsPerPage);
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
      setInputPage((prevPage) => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
      setInputPage((prevPage) => prevPage - 1);
    };
  
    const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= totalPages) {
            setInputPage(value);
            setCurrentPage(value);
        }
    };

    useEffect(() => {
        if (!diets) {
        dispatch(addDiets());
        }
        if (filterRecipes) {
        setData(filterRecipes);
        } else {
        if (!recipes) dispatch(addAllRecipes());
        setData(recipes);
        }
    }, [recipes, filterRecipes]);

    const handleResetFilters = () => {
        dispatch(removeFilters());
        setOrderBy("");
        setHealthScore("");
        setOrigin("");
        setSelectedDiet("");
    };

    const handleOrderRecipes = (e) => {
        const {value} = e.target;
        dispatch(orderRecipes(value));
        setOrderBy(value);
    };


    const handleOrderHS = (e) => {
        const { value } = e.target;
        dispatch(orderHS(value));
        setHealthScore(value);
    };

    const handleOrigin = (e) => {
        const { value } = e.target;
        dispatch(orderOrigin(value));
        setOrigin(value);
    };

    const handleDiets = (e) => {
        const { value } = e.target;
        dispatch(dietsFilter(value));
        setSelectedDiet(value);
    };



    return (
        <div id={styles.container}>
            <div id={styles.filters}>
                <h3>Order By Name:</h3>
                <div className={styles.options}>
                    <label>
                        <input type="radio" name="orderBy" value="A" onChange={handleOrderRecipes} checked={orderBy === "A"}/>
                        Ascending
                    </label>
                    <label>
                        <input type="radio" name="orderBy" value="D" onChange={handleOrderRecipes} checked={orderBy === "D"}/>
                        Descending
                    </label>
                </div>
                <h3>Health Score:</h3>
                <div className={styles.options}>
                    <label>
                        <input type="radio" name="healthScore" value="-" onChange={handleOrderHS} checked={healthScore === "-"}/>
                        High
                    </label>
                    <label>
                        <input type="radio" name="healthScore" value="+" onChange={handleOrderHS} checked={healthScore === "+"}/>
                        Low
                    </label>
                </div>
                <h3>Origin:</h3>
                <div className={styles.options}>
                    <label>
                        <input type="radio" name="origin" value="API" onChange={handleOrigin} checked={origin === "API"}/>
                        Other Recipes
                    </label>
                    <label>
                        <input type="radio" name="origin" value="DB" onChange={handleOrigin} checked={origin === "DB"}/>
                        My Recipes
                    </label>
                </div>
                <h3>Choose your favorite diet</h3>
                <div className={styles.radioButtonsDiets}>
                    {
                        diets?.map((diet) => (
                            <label key={diet.id}>
                                <input type="radio" name="diet" value={diet.name} onChange={handleDiets} checked={selectedDiet === diet.name}/>
                                {diet.name.toUpperCase()}
                            </label>
                        ))
                    }
                </div>
                <button id={styles.reset} onClick={handleResetFilters}>Reset</button>
            </div>

            <div id={styles.cards}>
                {
                currentCards?.map((element) =>  <Card key={element.id} recipe={element}/>)
                }
                <div id={styles.paginado}>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}><svg width="100%" height="100%" strokeWidth="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f5ebc7"><path d="M15 6l-6 6 6 6" stroke="#f5ebc7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                    <input type="number" min="1" max={totalPages} value={inputPage} onChange={handleInputChange}/>
                    <button onClick={handleNextPage} disabled={indexOfLastCard >= data?.length}><svg width="100%" height="100%" strokeWidth="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f5ebc7"><path d="M9 6l6 6-6 6" stroke="#f5ebc7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                </div>
            </div>
        </div>
    )
}
