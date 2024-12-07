const baseUrl = "https://notes-api.dicoding.dev/v2";
import Swal from "sweetalert2";

const home = () => {
  const unArchiveContainer = document.getElementById("bodySection");
  const noteUnarchiveList = unArchiveContainer.querySelector("note-list");

  const noteArchiveContainer = document.getElementById("noteArchived");
  const noteArchiveList = noteArchiveContainer.querySelector("note-list");

  const loading = () => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const hideLoading = () => {
    Swal.close();
  };

  const showNotes = async () => {
    loading();
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();

      const reqNoteArchive = await fetch(`${baseUrl}/notes/archived`);
      const reqNoteArchiveJson = await reqNoteArchive.json();

      hideLoading();

      displayResult(responseJson.data, reqNoteArchiveJson.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };

  const displayResult = (notesUnarchive, notesArchive) => {
    noteUnarchiveList.innerHTML = "";
    noteArchiveList.innerHTML = "";

    const noteItemsUnarchive = notesUnarchive.map((note) => {
      const noteItemElement = document.createElement("note-item");

      noteItemElement.note = note;
      return noteItemElement;
    });

    const noteItemsArchive = notesArchive.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      return noteItemElement;
    });

    noteArchiveList.append(...noteItemsArchive);
    noteUnarchiveList.append(...noteItemsUnarchive);
  };

  const insertNote = async (note) => {
    loading();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      };

      const response = await fetch(`${baseUrl}/notes`, options);
      const responseJson = await response.json();

      hideLoading();

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: responseJson.message,
        showConfirmButton: false,
        timer: 1500,
      });

      showNotes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };

  showNotes();

  document.addEventListener("DOMContentLoaded", () => {
    // Modal Insert data
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

    // Insert data
    const formNote = document.getElementById("formAddNote");
    const inputTitle = formNote.querySelector("#title");
    const inputBody = formNote.querySelector("#body");

    formNote.addEventListener("submit", async (e) => {
      e.preventDefault();

      const note = {
        title: inputTitle.value,
        body: inputBody.value,
      };

      await insertNote(note);

      inputTitle.value = "";
      inputBody.value = "";
      body.classList.toggle("modal-blur");
      modalForm.classList.toggle("modal-open");
    });
  });
};

export default home;
