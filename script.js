let myLibrary = []

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read it already" : "not read yet"}.`;
    }
    this.readBook = () => {this.read = true};
}

function addBookToLibrary(title, author, pages, read) {
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooksInPage(library) {
    const libraryDiv = document.createElement("div");
    libraryDiv.id = "library";
    const libraryList = document.createElement("ol");
    libraryDiv.appendChild(libraryList);
    for (const book of library) {
        const bookInfo = book.info();
        let listItem = document.createElement("li");
        listItem.id = book.id;
        listItem.innerText += bookInfo;
        if (!book.read) {
            const readBookButton = document.createElement("button");
            readBookButton.classList.add("read-book");
            readBookButton.innerText = "Read the Book";
            readBookButton.addEventListener("click", (e) => {
                e.preventDefault();
                let bookId = e.target.closest("li").id;
                let book = myLibrary.filter((book) => book.id == bookId);
                if (book) {
                    book[0].readBook();
                }
                renderBooksInPage(document.getElementsByTagName('body')[0]);
            });
            listItem.append(readBookButton);
        }
        const deleteBookButton = document.createElement("button");
        deleteBookButton.classList.add("delete-book");
        deleteBookButton.innerText = "Delete Book";
        deleteEventListener(deleteBookButton);
        listItem.append(deleteBookButton);
        libraryList.append(listItem);
    }
    return libraryDiv;
}

let showFormButtons = document.getElementsByClassName("show-form");
for (let i = 0; i < showFormButtons.length; i++) {
    let button = showFormButtons[i];
    button.addEventListener("click", (e) => {
        e.preventDefault()
        document.getElementsByTagName("form")[0].style.display = "block";
    });
}

function renderBooksInPage(el) {
    const previousList = document.getElementById("library");
    if (previousList) previousList.remove();
    el.prepend(displayBooksInPage(myLibrary));
}

let bookSubmitButton = document.getElementById("book-submit");
bookSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let form = e.target.closest('form');
    let inputs = form.querySelectorAll('input:not(input[type="submit"])');
    addBookToLibrary(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked);
    document.getElementsByTagName("form")[0].style.display = "none";
    renderBooksInPage(document.getElementsByTagName('body')[0]);
});

function deleteEventListener(deleteButton) {
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        let bookId = e.target.closest("li").id;
        myLibrary = myLibrary.filter((book) => book.id != bookId);
        renderBooksInPage(document.getElementsByTagName('body')[0]);
    });
}




window.onload = () => {
    renderBooksInPage(document.getElementsByTagName('body')[0]);
}