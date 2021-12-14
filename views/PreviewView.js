import View from './View.js';

class PreviewView extends View {
    _generateMarkup() {
        const id = window.location.hash.slice(1);
        return `
                <a class="search-result ${id === this._data.id ? "search-result--active" : ""} flex" href="#${this._data.id}">
                    <img src="${this._data.imageURL}" class="search-result__img" />
                    <div class="search-result__data flex column">
                        <span class="search-result__title">${this._data.title}</span>
                        <h3 class="search-result__publisher">${this._data.publisher}</h3>
                    </div>
                </a>`;
      }
}

export default new PreviewView();