const axios = require("axios");
require('dotenv').config();
const {API_KEY} = process.env;
const { Recipe, Diet } = require("../db");

module.exports = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.includes("-")) {
        const endpoint = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`;
        const response = await axios(endpoint);
        if (!response.data) return res.status(404).json({ error: "El id no está definido" });
        const { title, summary, healthScore, analyzedInstructions, image, diets } = response.data;
        const recipe = { id, title, summary, healthScore, analyzedInstructions, image, diets };
        res.status(200).json(recipe);
      } else {
        const recipe = await Recipe.findOne({ where: { id }, include: Diet });
        if (!recipe) return res.status(404).json({ error: "El id no está definido" });

        const { title, summary, healthScore, steps, image, Diets } = recipe.dataValues;
        const recipeData = { id, title, summary, healthScore, steps, image, Diets };
        console.log(recipe);
        res.status(200).json(recipeData);
      }
    } catch (error) {
      console.error("Error en la consulta:", error);
      res.status(500).json({ error: "Ocurrió un error en la consulta" });
    }
  };