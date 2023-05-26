const { Router } = require("express")
const dietRouter = Router();
const getDiets = require("../controllers/getDiets");

dietRouter.get("/", getDiets)

module.exports = {
    dietRouter
}