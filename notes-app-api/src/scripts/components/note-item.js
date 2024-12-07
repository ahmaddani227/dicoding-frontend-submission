import home from "../view/home";
import Swal from "sweetalert2";

class NoteItem extends HTMLElement {
  constructor() {
    super();

    // this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._baseUrl = "https://notes-api.dicoding.dev/v2";
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

            word-wrap: break-word;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .card:hover {
            transform: scale(102%);
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


        .card button {
            padding: 0.5rem;
            border: none;
            outline: none;
            background-color: var(--first-color);
            color: white;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease-out;
        }
      `;
  }

  connectedCallback() {
    const button = this.querySelectorAll("button#delete");
    const btnArchive = this.querySelectorAll("button#archive");
    const btnUnarchive = this.querySelectorAll("button#unarchive");

    // btn delete
    button.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");

        Swal.fire({
          icon: "warning",
          title: "Anda Yakin ?",
          text: "Anda Yakin ingin menghapus Note ini ?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // loading
            this._loading();

            await this._deleteNote(id);

            // Close Loading
            this._closeLoading();

            await Swal.fire({
              title: "Deleted!",
              text: "Note Berhasilar di Hapus",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });

            home();
          }
        });
      });
    });

    // btn archive
    btnArchive.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");

        // Loading
        this._loading();

        await this._archiveNote(id);

        // Loading Close
        this._closeLoading();

        await Swal.fire({
          icon: "success",
          title: "Archived!",
          text: "Note Berhasilar di Archive",
          showConfirmButton: false,
          timer: 1500,
        });

        home();
      });
    });

    // btn unarchive
    btnUnarchive.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");

        // Loading
        this._loading();

        await this._unarchiveNote(id);

        // Loading Close
        this._closeLoading();

        await Swal.fire({
          icon: "success",
          title: "Unarchived!",
          text: "Note Berhasilar di Unarchive",
          showConfirmButton: false,
          timer: 1500,
        });

        home();
      });
    });
  }

  _loading() {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  _closeLoading() {
    Swal.close();
  }

  async _deleteNote(id) {
    try {
      const response = await fetch(`${this._baseUrl}/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  }

  async _archiveNote(id) {
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${id}/archive`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  }

  async _unarchiveNote(id) {
    try {
      const response = await fetch(`${this._baseUrl}/notes/${id}/unarchive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  }

  render() {
    this._updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
        <div class="card">
            <h1>${this._note.title}</h1>
            <span>${this._note.createdAt}</span>
            <p>${this._note.body}</p>
            <div>
              <button data-id="${this._note.id}" id="delete">  delete</button>
              <button data-id="${this._note.id}" id="${this._note.archived == false ? "archive" : "unarchive"}"> ${this._note.archived == false ? "archive" : "unarchive"}</button>
            </div>
        </div>
      `;
  }
}

customElements.define("note-item", NoteItem);
