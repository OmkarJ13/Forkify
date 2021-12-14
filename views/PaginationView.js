import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector(".search-results__pagination");

  addClickHandler(handler) {
    this._parentElement.addEventListener("click", 
    function (e) {
      const btn = e.target.closest(".pagination__btn");
      if (!btn) return;

      handler(btn);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.currentPage;
    const pageNum = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    let html = this._generatePagination(currentPage, pageNum);
    return html;
  }

  _generatePagination(currentPage, pageNum) {
    let html = "";

    if (currentPage === 1 && pageNum > 1) {
      html += `
              <button class="pagination__btn pagination__next-page flex" data-target="${currentPage + 1}">
                <span>Page ${currentPage + 1}</span>
                  <svg>
                    <use href="img/icons.svg#icon-arrow-right"></use>
                  </svg>
              </button>`;

      return html;
    }

    if (currentPage === pageNum && currentPage !== 1) {
      html += `
              <button class="pagination__btn pagination__prev-page flex" data-target="${currentPage - 1}">
                <svg>
                  <use href="img/icons.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
              </button>`;

      return html;
    }

    if (currentPage < pageNum) {
      html += `
          <button class="pagination__btn pagination__prev-page flex" data-target="${currentPage - 1}">
            <svg>
              <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>

          <button class="pagination__btn pagination__next-page flex" data-target="${currentPage + 1}">
            <span>Page ${currentPage + 1}</span>
              <svg>
                <use href="img/icons.svg#icon-arrow-right"></use>
              </svg>
          </button>`;

      return html;
    }

    // Only Page
    return html;
  }
}

export default new PaginationView();