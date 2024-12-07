import home from "./scripts/view/home.js";
import "./scripts/components/app-bar.js";
import "./scripts/components/note-list.js";
import "./scripts/components/note-item.js";
import "./scripts/components/app-footer.js";

window.addEventListener("DOMContentLoaded", () => {
  home();

  const body = document.querySelector("body");
  const addNote = document.getElementById("addNote");
  const modalForm = document.getElementById("modalForm");
  const btnCencel = document.getElementById("cencel");

  addNote.addEventListener("click", (e) => {
    e.preventDefault();

    body.classList.toggle("modal-blur");
    modalForm.classList.toggle("modal-open");
  });

  btnCencel.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.toggle("modal-blur");
    modalForm.classList.toggle("modal-open");
  });
});
