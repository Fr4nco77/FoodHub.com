const axios = require("axios");
require('dotenv').config();
const {API_KEY} = process.env; 
const { Recipe, Diet } = require("../db");

module.exports = async(req, res) => {
    try {
        const { title } = req.query;
        const endpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&titleMatch=${title}&number=45`;
        const endpointAll = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;

        if(title) {
            const { data } = await axios(endpoint);
            const myRecipes = await Recipe.findAll({where:{title}, include: Diet});

            if(data.results.length === 0 && myRecipes.length === 0) return res.status(404).json({error:"No se encontraron recetas"});
            
            const all = myRecipes.concat(data.results);

            return res.status(200).json(all);
        }
        else {
            const myRecipes = await Recipe.findAll({include: Diet});
            const {data} = await axios(endpointAll);
            
            if(myRecipes.length > 0) {
                const all = myRecipes.concat(data.results);
                return res.status(200).json(all);
            }
            return res.status(200).json(data.results);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}