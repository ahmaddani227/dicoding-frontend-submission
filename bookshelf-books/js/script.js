let bookshelfs = [];
const STORAGE_KEY = "bookshelfs";
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";

const findBookId = (id) => {
  for (const index in bookshelfs) {
    if (bookshelfs[index].id === id) {
      return index;
    }
  }

  return -1;
};

const makeArticle = (obj) => {
  const { id, title, author, year, isComplete } = obj;

  const textTitle = document.createElement("h3");
  textTitle.innerText = title;
  textTitle.setAttribute("data-testid", "bookItemTitle");

  const button = document.createElement("button");
  button.classList.add("button-collapse");
  button.setAttribute("id", "toggle-collapse");
  button.innerHTML = '<i class="ri-arrow-down-s-line"></i>';

  const headerContainer = document.createElement("header");
  headerContainer.classList.add("header-book");
  headerContainer.append(textTitle, button);

  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Author: ${author}`;
  textAuthor.setAttribute("data-testid", "bookItemAuthor");

  const textYear = document.createElement("p");
  textYear.innerText = `Publication Year: ${year}`;
  textYear.setAttribute("data-testid", "bookItemYear");

  const bodyContainer = document.createElement("div");
  bodyContainer.classList.add("body-book");
  bodyContainer.append(textAuthor, textYear);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="ri-delete-bin-7-line"></i>';
  trashButton.setAttribute("data-testid", "bookItemDeleteButton");

  // Event
  trashButton.addEventListener("click", () => removeBook(id));

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="ri-edit-line"></i>';
  editButton.setAttribute("data-testid", "bookItemEditButton");

  // Event
  editButton.addEventListener("click", () => editBook(id));

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");

  if (isComplete) {
    const undoButton = document.createElement("button");
    undoButton.innerHTML = '<i class="ri-arrow-go-back-line"></i>';
    undoButton.setAttribute("data-testid", "bookItemIsCompleteButton");

    // Event
    undoButton.addEventListener("click", () => undoBookCompleted(id));

    buttonContainer.append(undoButton, trashButton, editButton);
  } else {
    const chekButton = document.createElement("button");
    chekButton.innerHTML = '<i class="ri-check-line"></i>';
    chekButton.setAttribute("data-testid", "bookItemIsCompleteButton");

    // Event
    chekButton.addEventListener("click", () => addBookCompleted(id));

    buttonContainer.append(chekButton, trashButton, editButton);
  }

  bodyContainer.append(buttonContainer);

  const container = document.createElement("article");
  container.classList.add("article");
  container.setAttribute("id", `book-${id}`);
  container.setAttribute("data-bookid", id);
  container.setAttribute("data-testid", "bookItem");

  container.append(headerContainer, bodyContainer);

  // Event
  container.addEventListener("click", () => {
    container.classList.toggle("active");
  });

  return container;
};

const loadDataFromStorage = () => {
  const serializeData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializeData);

  if (data) {
    for (const book of data) {
      bookshelfs.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
};

const addBook = () => {
  const id = +new Date();
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let year = document.getElementById("year");
  let isComplete = document.getElementById("is-complete");

  const bookshelf = {
    id,
    title: title.value,
    author: author.value,
    year: parseInt(year.value),
    isComplete: isComplete.checked ? true : false,
  };
  bookshelfs.push(bookshelf);

  title.value = "";
  author.value = "";
  year.value = "";
  isComplete.checked = false;

  saveData("Data berhasil ditambakan");

  document.dispatchEvent(new Event(RENDER_EVENT));
};

const saveData = (message) => {
  const parsed = JSON.stringify(bookshelfs);

  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(
    new CustomEvent(SAVED_EVENT, {
      detail: {
        message,
      },
    })
  );
};

const addBookCompleted = (id) => {
  const bookById = bookshelfs.find((book) => book.id === id);
  if (bookById) {
    bookById.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Buku selesai dibaca");
  }

  return;
};

const undoBookCompleted = (id) => {
  const bookById = bookshelfs.find((book) => book.id === id);
  if (bookById) {
    bookById.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Data berhasil di Undo");
  }

  return;
};

const removeBook = (id) => {
  const idBook = findBookId(id);

  if (!idBook) return;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      bookshelfs.splice(idBook, 1);

      saveData("Data berhasil dihapus");

      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  });
};

// Function Expresssion btn edit
const editBook = (bookId) => {
  const book = bookshelfs.find((book) => book.id === bookId);

  if (book) {
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("year").value = book.year;
    document.getElementById("is-complete").checked = book.isComplete;

    const form = document.getElementById("bookForm");
    form.dataset.editingId = bookId;

    const btnSubmit = form.querySelector("button");
    btnSubmit.innerText = "Update Book";
  }
};

// Function Expression updateBook
const updateBook = (bookId) => {
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let year = document.getElementById("year");
  let isComplete = document.getElementById("is-complete");

  bookshelfs = bookshelfs.map((book) => {
    if (book.id == bookId) {
      return {
        ...book,
        title: title.value,
        author: author.value,
        year: year.value,
        isComplete: isComplete.checked,
      };
    }

    return book;
  });

  title.value = "";
  author.value = "";
  year.value = "";
  isComplete.checked = false;

  saveData("Data berhasil diupdate");

  document.dispatchEvent(new Event(RENDER_EVENT));
};

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("bookForm");

  submitForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const form = document.getElementById("bookForm");
    const editingId = form.dataset.editingId;

    if (editingId) {
      updateBook(editingId);
      delete form.dataset.editingId;
      form.querySelector("button").innerText = "Add Book";
    } else {
      addBook();
    }
  });

  const btnSearch = document.getElementById("searchSubmit");
  const search = document.getElementById("search");
  const resultContainer = document.getElementById("result");

  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    const query = search.value;

    if (query === "") {
      resultContainer.innerHTML = "";
    } else {
      const hasilFilter = bookshelfs.filter(
        (obj) => obj.title.indexOf(query) !== -1
      );

      resultContainer.innerHTML = "";

      const title = document.createElement("p");
      title.innerText = `Hasil Pencarian: ${query}`;
      title.style.marginBottom = ".5rem";
      title.style.color = "green";
      resultContainer.append(title);

      if (hasilFilter.length > 0) {
        hasilFilter.forEach((el) => {
          const article = makeArticle(el);
          resultContainer.append(article);
        });
      } else {
        const emptyData = document.createElement("h3");
        emptyData.innerHTML = `Data <u>${query}</u> tidak ada`;
        emptyData.style.color = "red";
        resultContainer.append(emptyData);
      }
    }
  });

  loadDataFromStorage();
});

document.addEventListener(SAVED_EVENT, (e) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: e.detail.message,
  });
});

document.addEventListener(RENDER_EVENT, () => {
  const uncheckedBookList = document.getElementById("article-book");
  const checkedBook = document.getElementById("article-book-checked");

  uncheckedBookList.innerHTML = "";
  checkedBook.innerHTML = "";

  for (const book of bookshelfs) {
    const bookElement = makeArticle(book);

    if (book.isComplete) {
      checkedBook.append(bookElement);
    } else {
      uncheckedBookList.append(bookElement);
    }
  }
});
