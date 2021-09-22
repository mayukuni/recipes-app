import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';

export default function Food() {
  const pageTitle = {
    pageName: 'Comidas',
    setIcon: true,
  };

  const history = useHistory();
  const { recipesState, redirect } = useContext(RecipeContext);
  const getMealId = recipesState.map((meal) => meal.idMeal);
  const limits = 12;

  return (
    <div>
      <Header value={ pageTitle } />
      { redirect ? history.push(`/comidas/${getMealId}`) : (
        <div>
          {
            recipesState.map((meal, index) => (
              (index < limits) && (
                <div key={ index }>
                  <div data-testid={ `${index}-recipe-card` }>
                    <img
                      src={ meal.strMealThumb }
                      data-testid={ `${index}-card-img` }
                      alt={ meal.strMeal }
                    />
                  </div>
                  <div>
                    <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
                  </div>
                </div>
              )
            ))
          }
        </div>
      ) }
      <Footer />
    </div>
  );
}
