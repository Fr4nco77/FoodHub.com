import { Link } from "react-router-dom"
import styles from "./Card.module.css";

export const Card = (props) => {
    const { id, title, image, diets, Diets } = props.recipe;
    let list = [];

    if (diets) {
        list = diets.map((diet) => {
          return diet + "/ ";
        });
      } else {
        list = Diets.map((diet) => {
          return (diet.name + "/ ");
        });
      }
    return (
        <div id={styles.card}>
            <Link to={`/detail/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={image} alt="title"/>
            <h3 >{title}</h3>
            {
                list.length === 0 ? <p>Sin dietas añadidas</p>
                : <p>Diets: {list}</p>
            }
            </Link>  
        </div>
    )
}