class SearchView {
  _parentElement = document.querySelector(".nav__search-container");
  _searchInput = this._parentElement.querySelector(".nav__search-input");
  _searchBtn = this._parentElement.querySelector(".nav__search-btn");

  getQuery() {
    return this._searchInput.value;
  }

  addSearchHandler(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();

      handler(e);
      this._clearInput();
    });
  }

  _clearInput() {
    this._searchInput.value = "";
  }
}

export default new SearchView();
