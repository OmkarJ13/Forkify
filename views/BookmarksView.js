import View from './View.js';
import previewView from "./PreviewView.js";

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks');
    _errorMessage = 'No bookmarks yet, find a nice recipe and bookmark it :)';

    addRenderHandler(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        return this._data
        .map((cur) => previewView.render(cur, false))
        .join("");
    }
}

export default new BookmarksView();