import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useRecipeStatus from '../hook/useRecipeStatus';
import Header from '../components/detailPageComponents/Header';
import Recommendations from '../components/detailPageComponents/Recommendations';
import IngredientsAndMeasures from
  '../components/detailPageComponents/IngredientsAndMeasures';
import * as required from '../services/index';

function DrinksDetails() {
  const { id } = useParams();
  const { push } = useHistory();

  const [recipe, setRecipe] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [doneRecipe, progressRecipe] = useRecipeStatus(id);

  const { fetchMealsRecommendation,
    fetchDrinkDetails } = required;

  useEffect(() => {
    async function waitingForReturn() {
      setRecipe(await fetchDrinkDetails(id));
      setRecommendation(await fetchMealsRecommendation());
    }
    waitingForReturn();
  }, [id, fetchMealsRecommendation, fetchDrinkDetails]);

  const handleRedirect = () => {
    push(`/bebidas/${id}/in-progress`);
  };

  if (recipe.length === 0) {
    return <h1> Carregando... </h1>;
  }
  return (
    <section>
      <Header
        thumb={ recipe.strDrinkThumb }
        title={ recipe.strDrink }
        category={ recipe.strAlcoholic }
        recipe={ recipe }
        type="bebida"
        id={ id }
      />
      <IngredientsAndMeasures
        recipe={ recipe }
      />
      <div>
        <h1>Instructions</h1>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <div>
        <Recommendations
          recommendation={ recommendation }
        />
      </div>
      <div>
        {!doneRecipe && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleRedirect }
          >
            { progressRecipe ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        )}
      </div>
    </section>
  );
}

export default DrinksDetails;
