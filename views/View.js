export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length == 0)) {
      return this.renderMessage();
    }
    this._data = data;
    const html = this._generateMarkup();

    if (!render) return html;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  update(data) {
    this._data = data;

    const html = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(html);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      if (!newEl.isEqualNode(curEl)) {
        if (newEl.firstChild?.nodeValue.trim() !== "")
          curEl.textContent = newEl.textContent;

        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const html = `<div class="spinner">
                    <svg>
                      <use href="img/icons.svg#icon-loader"></use>
                    </svg>
                  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderError(message = this._errorMessage) {
    const html = `<div class="error flex column justify-center">
                    <svg>
                      <use href="img/icons.svg#icon-alert-triangle"></use>
                    </svg>
                    <h2 class="error__msg">${message}</h2>
                  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderMessage(message = this._message) {
    const html = `<div class="message flex column justify-center">
                    <svg>
                      <use href="img/icons.svg#icon-smile"></use>
                    </svg>
                    <h2 class="message__msg">${message}</h2>
                  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
