import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

export const Detail = () => {

    const { id } = useParams()
    const [ recipe, setRecipe ] = useState([]);

    useEffect(() => {
        const axiosRecipe = async() => {
            const response = await axios(`http://localhost:3001/recipe/${id}`)
            setRecipe(response.data)
        }
        axiosRecipe();

        return setRecipe("");
    }, [id])

    let steps = [];
    let diets = [];
    if(recipe.analyzedInstructions){
        if (recipe.analyzedInstructions?.length === 0) {
            steps.push("Aún siguen en proceso, pero no te preocupes pronto estarán");
        } else if (recipe.analyzedInstructions) {
            steps = recipe.analyzedInstructions[0].steps.map((element) => element.step);
        }
    } 
    if(recipe.steps){
        steps.push(recipe.steps)
    }
    if(recipe.diets) {
        recipe.diets.forEach(diet => {
            diets.push(diet + "/ ")
        })
    }
    if(recipe.Diets) {
        recipe.Diets.forEach(element => {
            diets.push(element.name + "/ ")
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