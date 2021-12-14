import View from "./View.js";
import previewView from './PreviewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector(".search-results");
  _message = `Search a recipe to view results.`;
  _errorMessage = `Couldn't find any recipes matching your query :(`;

  constructor() {
    super();
    this.renderMessage();
  }
 

  _generateMarkup() {
    return this._data
    .map((cur) => previewView.render(cur, false))
    .join("");
}
}

export default new ResultsView();
