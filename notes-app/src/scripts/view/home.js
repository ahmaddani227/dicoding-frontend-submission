import Notes from "../data/notes.js";

const home = () => {
  const notesContainer = document.getElementById("notesContainer");
  const noteListElemet = notesContainer.querySelector("note-list");

  const showNotes = () => {
    const result = Notes.getAll();
    displayResult(result);
  };

  const displayResult = (notes) => {
    const noteItems = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");

      noteItemElement.note = note;
      return noteItemElement;
    });

    noteListElemet.append(...noteItems);
  };

  showNotes();
};

export default home;
