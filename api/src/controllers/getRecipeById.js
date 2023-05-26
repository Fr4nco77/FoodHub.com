const axios = require("axios");
require('dotenv').config();
const {API_KEY} = process.env;

module.exports = async(req, res) => {
    try {
        const { id } = req.params;
        const endpoint = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
        const response = await axios(endpoint);
        if(!response.data) return res.status(404).json({error: "El id no esta definido"})
        const { title, summary, healthScore, instructions, image, diets } = response.data
        const recipe = {id, title, summary, healthScore, instructions, image, diets};
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}