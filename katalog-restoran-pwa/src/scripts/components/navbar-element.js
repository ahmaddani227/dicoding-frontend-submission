class NavbarElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <header>
            <nav class="container nav">
                <a href="#" class="brand">Madu Resto</a>

                <button
                class="hamburger-menu"
                id="hamburger-menu"
                aria-label="hamburger-button"
                >
                &#9776;
                </button>

                <div class="nav-list" id="nav-list">
                <ul class="nav-menu" id="nav-menu">
                    <li class="nav-link"><a href="#">Home</a></li>
                    <li class="nav-link"><a href="#/favorite">Favorite</a></li>
                    <li class="nav-link">
                    <a href="https://github.com/ahmaddani227" target="_blank"
                        >About Us</a
                    >
                    </li>
                </ul>
                </div>
            </nav>
        </header>
    `;
  }
}

customElements.define('navbar-element', NavbarElement);
