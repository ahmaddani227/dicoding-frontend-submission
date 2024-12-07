class LoaderElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="loader-wrapper">
        <div class="loader"></div>
    </div>`;
  }
}

customElements.define('loader-element', LoaderElement);
