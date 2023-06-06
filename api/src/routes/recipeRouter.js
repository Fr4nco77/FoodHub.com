const { Router } = require("express");
const recipeRouter = Router();
const getRecipeById = require("../controllers/getRecipeById");
const getRecipeByName = require("../controllers/getRecipeByName");
const postRecipe = require("../controllers/postRecipe");

recipeRouter.post("/", postRecipe);
recipeRouter.get("/", getRecipeByName);
recipeRouter.get("/:id", getRecipeById);

module.exports = {
    recipeRouter
}