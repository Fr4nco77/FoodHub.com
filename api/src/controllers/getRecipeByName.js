const axios = require("axios");
require('dotenv').config();
const {API_KEY} = process.env; 

module.exports = async(req, res) => {
    try {
        const { name } = req.query;
        const endpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=50000`
        const allRecipes = (await axios(endpoint)).data.results

        const recipes = allRecipes.filter((e) => e.title.toLowerCase().includes(name.toLowerCase()));
        if(recipes.length === 0) return res.status(404).json({error:"No se encontraron recetas"})
        
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}