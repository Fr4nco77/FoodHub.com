import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import cards from "../../images/cardsLanding.png";

export const Landing = () => {
    return (
        <div className={styles.back}>
            <div>
                <div>
                <h1>Welcome to FoodHub</h1>
                <p>Todas las experiencias culinarias a solo un click</p>
                </div>
                <Link to="/home"><button>Comenzar</button></Link>
            </div>
            <div>
                <img src={cards} alt="food" />
            </div>
            
        </div>
    )
}