import { ADD_DIETS, ADD_RECIPES, CREATE_RECIPE, DIETS, ORDER_HS, ORDER_ORIGIN, ORDER_RECIPES, REMOVE_FILTERS } from "./actionsType";

const initialState = {
    recipes: null,
    filterRecipes: null,
    diets: null
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_RECIPES:
            return {
                ...state,
                recipes: payload,
            }
        case ADD_DIETS:
            return {
                ...state,
                diets: payload,
            }

        case ORDER_RECIPES:
            let newRecipes = state.filterRecipes ?? [...state.recipes];
            

            newRecipes.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                if (payload === 'A') {
                // Ordenar ascendentemente
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                } else if (payload === 'D') {
                // Ordenar descendentemente
                if (titleA > titleB) return -1;
                if (titleA < titleB) return 1;
                }
                return 0;
            });
            return {
                ...state,
                filterRecipes: newRecipes,
            };

        case ORDER_HS:
            let data = state.filterRecipes ?? [...state.recipes];

            data.sort((a,b) => {
                if(payload === "+") {
                    if(a.healthScore > b.healthScore) return 1;
                    if(a.healthScore < b.healthScore) return -1
                }
                else if(payload === "-"){
                    if(a.healthScore < b.healthScore) return 1;
                    if(a.healthScore > b.healthScore) return -1;
                }
                return 0
            })
        
            return {
                ...state,
                filterRecipes: data,
            };
        case ORDER_ORIGIN:
            let data1 = [...state.recipes];
            
            
            const originRecipes = data1.filter((recip) => {
                if (payload === "API") {
                return typeof recip.id === "number";
                } else {
                return typeof recip.id === "string";
                }
            });
            
            return {
                ...state,
                filterRecipes: originRecipes,
            };

        case DIETS: 
            let data2 = [...state.recipes];

            const filterDiet = data2.filter((element) => {
                if(isNaN(element.id)) {
                    return element.Diets.some(e => e.name === payload);
                }else {
                    return element.diets.includes(payload)
                }
            });
            return {
                ...state,
                filterRecipes: filterDiet
            }

            
        case REMOVE_FILTERS:
            return {
                ...state,
                filterRecipes: null
            }

        case CREATE_RECIPE:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}