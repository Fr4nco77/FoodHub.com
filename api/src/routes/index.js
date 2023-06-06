const { Router } = require('express');
const { recipeRouter } = require("./recipeRouter");
const { dietRouter } = require("./dietRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipe", recipeRouter);
router.use("/diets", dietRouter);
module.exports = router;
