const axios = require("axios");
require('dotenv').config();
const {API_KEY} = process.env;
const { Diet } = require("../db");

module.exports = async(req, res) => {
    try {
        const diets = await Diet.findAll()

        if(diets.length === 0) {
            const endpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`
            const allRecipes = (await axios(endpoint)).data.results
            const dietsArray = [];

            allRecipes.forEach((recipe) => {
                recipe.diets.forEach((diet) => {
                    if (!dietsArray.includes(diet)) {
                    dietsArray.push(diet);
                    }
                });
            }); 
            await Diet.bulkCreate(dietsArray.map((name) => ({ name })));
            const diets = await Diet.findAll()
            res.status(200).json(diets); 
        }
        else {
            res.status(200).json(diets)
        }
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}