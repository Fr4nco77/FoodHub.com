import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import cards from "../../images/cardsLanding.png";

export const Landing = () => {
    return (
        <div className={styles.container}>
                <div className={styles.landing} id={styles.welcome}>
                    <div>
                        <h1>Welcome to <span className={styles.title}>Food<span id={styles.hub}>Hub</span></span></h1>
                        <p>Immerse yourself in <span className={styles.text}>a culinary journey full of</span> surprises and delights, where the passion for cooking merges with the quest for <span className={styles.text}>new sensations</span>, enabling you to create and share special moments <span className={styles.text}>with just a click</span></p>
                    </div>
                    <Link to="/home"><button>Start</button></Link>
                </div>
                <div className={styles.landing}>
                    <img src={cards} alt="food" />
                </div>   
        </div>
    )
}