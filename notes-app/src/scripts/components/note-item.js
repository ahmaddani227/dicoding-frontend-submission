class NoteItem extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  set note(value) {
    this._note = value;

    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          --first-color: rgba(180, 180, 180, 1);
          --secon-color: rgba(240, 240, 240, 0.801);
          --blue-color: rgb(0, 47, 255);
        }
   
        .card {
            width: auto;
            min-height: 200px;
            border: 1px solid var(--first-color);
            background-color: var(--secon-color);
            border-radius: 10px;
            padding: 0.8rem;
            box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.1s ease-out;
            cursor: pointer;
        }

        .card:hover {
            transform: scale(105%);
        }

        .card h1 {
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }

        .card span {
            font-size: 12px;
            color: var(--first-color);
            margin-block: 0.4rem;
            display: block;
        }
      `;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="card">
            <h1>${this._note.title}</h1>
            <span>${this._note.createdAt}</span>
            <p>${this._note.body}</p>
        </div>
      `;
  }
}

customElements.define("note-item", NoteItem);
