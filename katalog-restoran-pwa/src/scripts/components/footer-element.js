class FooterElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>
            <div class="container">
                <p>Copyright © 2024 - Madu Resto Group</p>
            </div>
        </footer>
    `;
  }
}

customElements.define('footer-element', FooterElement);
