import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

export const Detail = () => {

    const { id } = useParams();
    const [ recipe, setRecipe ] = useState([]);

    useEffect(() => {
        const axiosRecipe = async() => {
            try {
                const response = await axios.get(`http://localhost:3001/recipe/${id}`);
                setRecipe(response.data);
              } catch (error) {
                console.error("Error axiosRecipe:", error);
              }
        }
        axiosRecipe();

        return setRecipe([]);
    }, [id])

    let steps = [];
    let diets = [];
    if(recipe.analyzedInstructions && recipe.diets){
        if (recipe.analyzedInstructions?.length === 0) {
            steps.push("They are still in process, but don't worry soon they will be");
        } else {
            steps = recipe.analyzedInstructions[0].steps.map((element) => element.step);
        }
        recipe.diets.forEach(diet => {
            diets.push(diet + "/ ");
        })
    } 
    if(recipe.steps && recipe.Diets){
        steps.push(recipe.steps);
        recipe.Diets.forEach(element => {
            diets.push(element.name + "/ ");
        });
    }

    return (
        <div id={styles.container}>
            <div id={styles.detail}>
                <div id={styles.top}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div id={styles.info}>
                        <p><span>Recipe N°:</span> {recipe.id}</p>
                        <p><span>Title:</span> {recipe.title}</p>
                        <div id={styles.infoHealth}>
                            <p><span>Health Score:</span> {recipe.healthScore}/100</p>
                            <p><span>Diets:</span> {diets}</p>
                        </div>
                        <div id={styles.summary}>
                            <p dangerouslySetInnerHTML={{__html:recipe.summary}}></p>
                        </div>
                    </div>
                </div>
                <div id={styles.bottom}>
                    {
                        steps?.map((step, index) => {
                            return (
                                <p key={index}><span>Step {index + 1}:</span>{" " + step}</p>
                            )
                        })
                    }
                </div>
            </div> 
        </div>
    )
}