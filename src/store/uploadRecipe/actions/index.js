import { RECIPE_UPLOADED, RECIPE_NOT_UPLOADED } from '../types';
import { apiUpload } from '../../../services/forkify/api';
import { getItemFromLS, setItemFromLS } from '../../../utils';

/**
 * @param newRecipe The new recipe as an object
 * @returns The success or failure message from a promise, also some recipe information goes to localStorage
 */
export async function uploadRecipeAction(newRecipe) {
  try {
    // format data and fetch the recipe
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format.'
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await apiUpload(recipe);
    //-------//--------//
    const dataRecipe = data.data.recipe;
    const myRecipe = {
      title: dataRecipe.title,
      image: dataRecipe.image_url,
      id: dataRecipe.id,
    };

    // send the recipe to localStorage
    const myRecipesInLS = getItemFromLS('myRecipes');
    myRecipesInLS.push(myRecipe);
    setItemFromLS('myRecipes', myRecipesInLS);

    return {
      type: RECIPE_UPLOADED,
      payload: {
        status: data.status,
      },
    };
  } catch (err) {
    return {
      type: RECIPE_NOT_UPLOADED,
      payload: {
        errorStatus: err,
      },
    };
  }
}