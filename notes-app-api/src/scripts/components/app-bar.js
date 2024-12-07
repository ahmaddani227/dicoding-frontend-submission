class AppBar extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `      
        <div class="container">
            <h1>Notes App</h1>
        </div>
      `;
  }
}

customElements.define("app-bar", AppBar);
