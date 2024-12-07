class NoteList extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
        .note-list {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            gap: 1.3rem;
            margin: 0.5rem 0 1.5rem;
        }

        /* Small */
        @media screen and (min-width: 640px) {
          .note-list {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Medium */
        @media screen and (min-width: 768px) {
          .note-list {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Large */
        @media screen and (min-width: 1024px) {
          .note-list {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
    `;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="note-list" id="noteList">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("note-list", NoteList);
