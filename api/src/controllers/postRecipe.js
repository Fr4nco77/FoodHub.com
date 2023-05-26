const { Recipe } = require("../db");

module.exports = async(req, res) => {
    try {
        const { name, image, summary, healthScore, instructions } = req.body;
        if(!name || !summary || !healthScore || !instructions ) return res.status(400).send("Faltan datos");
        await Recipe.create({name, image, summary, healthScore, instructions}) 
        res.status(200).send("Receta creada con exito");
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
}