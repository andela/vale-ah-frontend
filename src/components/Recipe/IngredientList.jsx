import React from 'react';
import PropTypes from 'prop-types';
import { generateKey } from '../../utils/helpers';

/**
 * @returns {JSX.Element} Ingredient list
 */
const IngredientList = ({
  ingredients = [],
  syncRecipeIngredents,
  errorHandler,
}) => {
  /**
   *
   * @param {Event} e
   * @returns {undefined}
   */
  const updateList = e => {
    const {
      target: { value: ingredient },
    } = e;

    if (e.keyCode === 13) {
      e.preventDefault();
      if (e.target.value.length > 0) {
        syncRecipeIngredents([
          ...ingredients,
          { key: generateKey(), ingredient },
        ]);

        e.target.value = '';
      }
    }
  };

  /**
   * Remove ingredient from list
   * @param {number} index index of ingredient to remove
   * @returns {undefined}
   */
  const deleteIngredient = index => {
    const updatedList = [...ingredients];
    updatedList.splice(index, 1);
    return syncRecipeIngredents(updatedList);
  };

  const ingredientList =
    ingredients.length > 0 ? (
      ingredients.map(({ key, ingredient }, index) => (
        <li key={key} className="ingredient-item">
          {index + 1}
          {'.'} {ingredient}
          <i
            className="fas fa-minus remove-icon"
            role="button"
            tabIndex={0}
            onClick={() => deleteIngredient(index)}
            onKeyDown={({ keyCode }) =>
              keyCode === 13 ? deleteIngredient(index) : null
            }
          />
        </li>
      ))
    ) : (
      <div className="flex">
        <img
          src="https://cdn2.iconfinder.com/data/icons/outline-web-application-1/20/cart-512.png"
          className="emp"
          alt="placeHolder"
        />
        <small className="no-ing">No ingredient added yet</small>
      </div>
    );

  return (
    <div className="ingredient-section">
      <p className="col-title">Ingredients</p>
      <div>
        <ul className="ingredient-lists">{ingredientList}</ul>

        <div className="input-block">
          <input
            name="ingredient"
            className="text-field text-field--small ingredient-field"
            placeholder="Add an ingredient (Press Enter)"
            onKeyDown={updateList}
          />
          <small className="err-msg">{errorHandler()}</small>
        </div>
      </div>
    </div>
  );
};

IngredientList.propTypes = {
  syncRecipeIngredents: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  errorHandler: PropTypes.func.isRequired,
};

export default IngredientList;
