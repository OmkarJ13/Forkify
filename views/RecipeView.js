import View from "./View.js";
import * as config from "../config.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe-container");
  _message = "Click on a recipe to view it";
  _errorMessage = "Couldn't find that recipe, Please try another one!";

  addRenderHandler(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, () => {
        if (window.innerWidth < config.WINDOW_MIN_HEIGHT)
          this._parentElement.scrollIntoView({ behavior: "smooth" });

        handler(window.location.hash.slice(1));
      });
    });
  }

  addServingsUpdateHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".recipe__update-servings");
      if (!btn) return;

      const newServings = Number(btn.dataset.updateServings);
      if (newServings > 0) handler(newServings);
    });
  }

  addBookmarkHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".recipe__bookmark-recipe-btn");
      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    // Main stuff
    let html = `<h1 class="recipe__title">${this._data.title}</h1>
                <img src="${this._data.imageURL}" class="recipe__img" />
                <div class="recipe__info flex column">
                    <div class="recipe__details flex column">
                        <div class="recipe__detail recipe__time flex">
                            <svg>
                                <use href="img/icons.svg#icon-clock"></use>
                            </svg>
                            <h3>${this._data.cookingTime} Minutes</h3>
                        </div>
                        <div class="recipe__detail recipe__servings flex">
                            <svg>
                                <use href="img/icons.svg#icon-users"></use>
                            </svg>
                            <h3>${this._data.servings} Servings</h3>
                        </div>
                        <button class="recipe__update-servings recipe__reduce-servings-btn flex" data-update-servings="${
                          this._data.servings - 1
                        }">
                            <svg>
                                <use href="img/icons.svg#icon-minus-circle"></use>
                            </svg>
                        </button>
                        <button class="recipe__update-servings recipe__increase-servings-btn flex" data-update-servings="${
                          this._data.servings + 1
                        }">
                            <svg>
                                <use href="img/icons.svg#icon-plus-circle"></use>
                            </svg>
                        </button>
                    </div>
                    <button class="recipe__bookmark-recipe-btn flex">
                        <svg>
                            <use href="img/icons.svg#icon-bookmark${
                              this._data.bookmarked ? "-fill" : ""
                            }"></use>
                        </svg>
                    </button>
                </div>`;

    // Ingredients
    html += `<div class="recipe__ingredients-container">
                <h2 class="ingredients__heading">Recipe Ingredients</h2>
                <div class="recipe__ingredients">
                    ${this._data.ingredients
                      .map(this._generateIngredientMarkup)
                      .join("")}
                </div>
            </div>`;

    // Directions
    html += `<div class="recipe__directions">
                <h2 class="directions__heading">How To Cook?</h2>
                <h3 class="directions__publisher">This recipe was carefully designed and tested by ${this._data.publisher}. Please check out directions at their website.</h3>
                <a href="${this._data.sourceURL}" class="directions__btn flex">
                    <span>Directions</span>
                    <svg>
                        <use href="img/icons.svg#icon-arrow-right"></use>
                    </svg>
                </a>
             </div>`;

    return html;
  }

  _generateIngredientMarkup(ingredient) {
    const { quantity, unit, description } = ingredient;

    return `<div class="ingredients__ingredient flex wrap">
                <svg class="ingredient__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <h3 class="ingredient__quantity ${
                  quantity === null ? "hidden" : ""
                }">${quantity}</h3>
                <h3 class="ingredient__unit ${
                  unit === "" ? "hidden" : ""
                }">${unit}</h3>
                <h3 class="ingredient__description">${description}</h3>
            </div>`;
  }
}

export default new RecipeView();
