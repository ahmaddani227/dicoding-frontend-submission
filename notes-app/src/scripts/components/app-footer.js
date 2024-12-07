class AppFooter extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
            .text-center {
                text-align: center;
            }
        `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <p class="text-center">Copyright &copy; 2024</p>
    `;
  }
}

customElements.define("app-footer", AppFooter);
