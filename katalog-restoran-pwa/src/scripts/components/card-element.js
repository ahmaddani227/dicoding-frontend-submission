class CardElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="card" key="${this.getAttribute('id')}" >
            <figure>
                <img data-src="${this.getAttribute(
    'image'
  )}" alt="${this.getAttribute(
  'name'
)}" class="lazyload" width="400px" height="250px" />
            </figure>
            <div class="kota">
                <p>${this.getAttribute('city')}</p>
            </div>
            <div class="card-body">
                <div class="flex justify-between mt-2 items-center">
                    <a href="${this.getAttribute('href')}" class="title">
                        ${this.getAttribute('name')}
                    </a>
                    <span class="rating">
                        &#9733; 
                        ${this.getAttribute('rating')}
                    </span>
                </div>
                <p class="description">${this.getAttribute('description')}</p>
            </div>
        </div>
    `;
  }
}

customElements.define('card-element', CardElement);
