import * as config from "./config.js";
import * as helpers from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    currentPage: 1,
    query: "",
    results: [],
    resultsPerPage: config.RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = 
    await Promise
    .race([
      helpers.getJSON(`${config.API_URL}/${id}?key="${config.API_KEY}"`),
      helpers.timeout(config.TIMEOUT_SEC),
    ]);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      imageURL: recipe.image_url,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
    };

    if (state.bookmarks.some((cur) => state.recipe.id === cur.id)) {
      state.recipe.bookmarked = true;
    }

  } catch (e) {
    throw e;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = 
    await Promise
    .race([
      helpers.getJSON(`${config.API_URL}?search=${query}&key=${config.API_KEY}`),
      helpers.timeout(config.TIMEOUT_SEC),
    ]);

    state.search.query = query;
    state.search.currentPage = 1;
    state.search.results = [];

    data.data.recipes
    .map((recipe) => {
      state.search.results.push({
        id: recipe.id,
        title: recipe.title,
        imageURL: recipe.image_url,
        publisher: recipe.publisher,
      });
    });

  } catch (e) {
    throw e;
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;

  const min = (page - 1) * state.search.resultsPerPage;
  const max = page * state.search.resultsPerPage;

  return state.search.results.slice(min, max);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients
  .forEach((cur) => {
    if (cur.quantity) {
      cur.quantity = (cur.quantity * (newServings / state.recipe.servings)).toFixed(2);
    }
  });

  state.recipe.servings = newServings;
}

export const addBookmark = function (recipe) {
  if (state.recipe.id === recipe.id) {
    state.bookmarks.push(recipe);
    state.recipe.bookmarked = true;
    persistBookmarks();
  }
}

export const deleteBookmark = function (id) {
  if (state.recipe.id === id) {
    const index = state.bookmarks.findIndex((cur) => cur.id === id);
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;
    persistBookmarks();
  }
}

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

const init = function () {
  const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (storedBookmarks) state.bookmarks = storedBookmarks;
}

init();