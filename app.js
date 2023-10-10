// TODO
// -

const libraryEl             = document.getElementsByClassName('library-wrapper');
const libraryRow            = document.getElementsByClassName('library-row');
const newBook               = document.getElementById('new-book');
const bookDialog            = document.getElementById('book-dialog');
const submitBtn             = document.getElementById('submit-book');
const bookTitle             = document.getElementById('book-title');
const bookAuthor            = document.getElementById('book-author');
const bookCount             = document.getElementById('book-page-count');
const bookRead              = document.getElementById('book-read');
const bookForm              = document.getElementById('book-form');
const emptyLibrary          = document.getElementById('empty-notice');

const clearLibraryStart     = document.querySelector('#clear-library-start');
const clearLibraryFinal     = document.querySelector('#clear-library-final');
const clearDialog           = document.querySelector('#clear-notice');
const myLibrary             = [];

const genCloseDiag          = document.getElementsByClassName('generic-cancel');

newBook.addEventListener('click', () => {
    bookDialog.showModal();
});

submitBtn.addEventListener('click', (e) => {

    if ( bookForm.checkValidity() ) {
        submitBook(bookTitle.value, bookAuthor.value, bookCount.value, bookRead.checked);
    }
});

clearLibraryStart.addEventListener('click', (e) => {
    clearDialog.showModal();
});

clearLibraryFinal.addEventListener('click', (e) => {
    removeAllBooks();
});

for ( const closeDiag of genCloseDiag ) {

    closeDiag.addEventListener('click', (e) => {
        const clearTarget   = e.target;
        const diagParent    = clearTarget.parentElement;

        if ( diagParent.tagName === 'DIALOG' ) {
            diagParent.close();
        }        
    });
}

function Book(title, author, pageCount, hasRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.hasRead = hasRead;
}

function addBookToLibrary(book) {

    if ( book instanceof Book ) {
        myLibrary.push(book);
    }
}

function displayBooks() {

    if ( myLibrary.length >= 1 ) {
        emptyLibrary.classList.add('hide');

        let i = 0;

        //Reset the html first so that books don't re-render
        libraryRow[0].innerHTML = "";

        for ( const bookItem of myLibrary ) {
            let bookContent = `<span class="book-title hdr-font">${bookItem.title}</span>`;

            if ( bookItem.author ) {
                bookContent += `<span class="book-author hdr-font">Author: ${bookItem.author}</span>`;
            }

            if ( bookItem.pageCount ) {
                bookContent += `<span class="book-page-count hdr-font">Page Count: ${bookItem.pageCount}</span>`;
            }

            bookContent += `<div class="book-read input-group">
                                <label for="has-read">Read it?</label>
                                <input type="checkbox" name="read" id="has-read" ${bookItem.hasRead ? 'checked' : ''}>
                            </div>`;

            const bookCard = document.createElement('div');
            bookCard.setAttribute('data-book-index', i);
            bookCard.classList.add('book-card');
            bookCard.innerHTML = bookContent;

            const bookRemove = document.createElement('button');
            bookRemove.classList.add('remove-book', 'cancel', 'abs-pos');
            bookRemove.innerHTML = 'X';

            bookRemove.addEventListener('click', (e) => {
                removeBook(e);
            });

            bookCard.prepend(bookRemove);

            libraryRow[0].append(bookCard);

            i++;
        }
    }
}

function submitBook(title, author, count, read) {



    if ( count ) {
        count = parseInt(count);
    }

    let newBook = new Book(title, author, count, read);

    // Check values in array if they're all falsy, otherwise continue submission
    // Not very necessary since we are checking form validity on the submit btn click event
    if ( Object.values(newBook).every( (currentValue) => ! currentValue ) ) {
        console.log('empty book');
        alert('Book submissions require a title and author!');
    } else {
        addBookToLibrary(newBook);
        displayBooks();
    
        emptyLibrary.classList.add('hide');
        bookDialog.close();
    }

    // console.log(Object.keys(newBook));
    // console.log(Object.values(newBook));
}

function removeAllBooks() {
    myLibrary.length = 0;
    libraryRow[0].innerHTML = "";
    emptyLibrary.classList.remove('hide');
}

function removeBook(e) {
    const btnRemove     = e.target;
    const bookToRemove  = btnRemove.parentElement;
    const bookIndex     = bookToRemove.dataset.bookIndex;

    //Remove the selected book at its library index
    myLibrary.splice( bookToRemove.dataset.bookIndex, 1 );

    if ( myLibrary.length === 0 ) {
        removeAllBooks();
    }

    console.log(myLibrary);
    console.log(myLibrary.length);

    //Render books again to adjust indicies and move list of books
    displayBooks();
}

// const theHobbit = new Book('The Hobbit', 'J.R.R Tolkein', 300, false);
// const newBook00 = new Book('Fundamentals of Gaming', 'Unknown', 175, true);
// const newBook01 = new Book('Fundamentals of Music', 'Unknown', 175, false);
// const newBook02 = new Book('Fundamentals of Speech', 'Unknown', 175, false);
// const newBook03 = new Book('Fundamentals of Health', 'Unknown', 175, true);

const testBook = {
    title: "Test",
    author: "Unknown",
    pageCount: 125,
    hasRead: true,
};

// addBookToLibrary(theHobbit);
// addBookToLibrary(newBook00);
// addBookToLibrary(newBook01);
// addBookToLibrary(newBook02);
// addBookToLibrary(newBook03);
// addBookToLibrary(testBook);

//console.log(myLibrary);

//displayBooks();