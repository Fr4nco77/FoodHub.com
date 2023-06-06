import axios from "axios";
import { ADD_DIETS, ADD_RECIPES, CREATE_RECIPE, DIETS, ORDER_HS, ORDER_ORIGIN, ORDER_RECIPES, REMOVE_FILTERS } from "./actionsType";

export const addAllRecipes = () => {
  const endpoint = "http://localhost:3001/recipe";
  return async(dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: ADD_RECIPES,
        payload: data
      })
    } catch (error) {
      console.error("Error en addAllRecipes:", error.message);
    }
  }
}

export const addRecipes = (title) => {
  const endpoint = `http://localhost:3001/recipe?title=${title}`;
  return async(dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: ADD_RECIPES,
        payload: data
      })
    } catch (error) {
      console.error("Error en addRecipes:", error.message);
    }
  }
}

export const addDiets = () => {
  const endpoint = "http://localhost:3001/diets";
  return async(dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: ADD_DIETS,
        payload: data
      })
    } catch (error) {
      console.error("Error en addDiets:", error.message);
    }
  }
}

export const orderRecipes = (order) => {
  return {
    type: ORDER_RECIPES,
    payload: order
  }
}

export const orderHS = (order) => {
  return {
    type: ORDER_HS,
    payload: order
  }
}

export const orderOrigin = (order) => {
  return {
    type: ORDER_ORIGIN,
    payload: order
  }
}

export const dietsFilter = (diet) => {
  return {
    type: DIETS,
    payload: diet
  }
}

export const removeFilters = () => {
  return {
    type: REMOVE_FILTERS,
    payload: null
  }
}

export const createRecipe = (recipe) => {
  const endpoint = "http://localhost:3001/recipe";
  return async(dispatch) => {
    try {
      const { data } = await axios.post(endpoint, recipe);
      return dispatch({
        type: CREATE_RECIPE,
        payload: data,
      })
    } catch (error) {
      console.error("Error en createRecipe:", error.message);
    }
  }
}