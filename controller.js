import * as model from "./model.js";
import recipeView from "./views/RecipeView.js";
import searchView from "./views/SearchView.js";
import resultsView from "./views/ResultsView.js";
import paginationView from "./views/PaginationView.js";
import bookmarksView from './views/BookmarksView.js';

const controlRecipe = async function (id) {
  try {
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    
  } catch (e) {
    console.error(e);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    paginationView.render(model.state.search);
    resultsView.render(model.getSearchResultsPage());

  } catch (e) {
    console.error(e);
    resultsView.renderError();
  }
};

const controlPagination = function (btn) {
  resultsView.render(model.getSearchResultsPage(Number(btn.dataset.target)));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const init = function () {
  recipeView.addRenderHandler(controlRecipe);
  bookmarksView.addRenderHandler(controlBookmarks);
  recipeView.addServingsUpdateHandler(controlServings);
  recipeView.addBookmarkHandler(controlAddBookmark);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addClickHandler(controlPagination);
};

init();
