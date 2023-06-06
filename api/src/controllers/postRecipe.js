const { Recipe, Diet } = require("../db");

module.exports = async(req, res) => {
    try {
        const { title, image, summary, healthScore, steps, diets } = req.body;

        if(!title || !summary || !healthScore || !steps ) return res.status(400).send("Faltan datos");

        const newRecipe = await Recipe.create({title, image, summary, healthScore, steps});
        
        if (diets && diets.length > 0) {
            const foundDiets = await Diet.findAll({ where: { name: diets } });
      
            if (foundDiets.length > 0) {
              await newRecipe.addDiets(foundDiets);
            }
          }
        res.status(200).send("Recipe Created Successfully");
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
}