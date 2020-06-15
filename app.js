// COLOR

const background_color_lightGreen = "#abf7b9";
const background_color_lightRed = "#f7b7b7";
const text_color_green = "#06912b";
const text_color_red = "#ff0000";

//  Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI constructor
function UI() {
	UI.prototype.addBookToList = function (bookObj) {
		const list = document.getElementById("book-list");

		const row = document.createElement("tr");

		row.innerHTML = `<td>${bookObj.title}</td>
                        <td>${bookObj.author}</td>
                        <td>${bookObj.isbn}</td>
                        <td><a href= "#" class = "delete">X</td>`;
		list.appendChild(row);
	};

	UI.prototype.clearInputs = function () {
		document.getElementById("title").value = "";
		document.getElementById("author").value = "";
		document.getElementById("isbn").value = "";
	};

	UI.prototype.deleteBook = function (target) {
		if ((target.className = "delete")) {
			target.parentElement.parentElement.remove();
		}
		errMsg = "Book Deleted";
		addErrorText(errMsg);

		DisplayToastMessage(text_color_green, background_color_lightGreen);
	};
}

// Add event listener
document.getElementById("book-form").addEventListener("submit", function (e) {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const isbn = document.getElementById("isbn").value;

	const titleDisable = document.getElementById("title");
	const authorDisable = document.getElementById("author");
	const isbnDisable = document.getElementById("isbn");

	let errMsg;
	const ui = new UI();
	// Validation
	if (title === "" || author === "" || isbn === "") {
		// ERROR MESSAGE
		errMsg = "Please enter all field";
		// Create Error Text
		addErrorText(errMsg);

		DisplayToastMessage(
			text_color_red,
			background_color_lightRed,
			titleDisable,
			authorDisable,
			isbnDisable,
			true
		);

		ui.clearInputs();
	} else {
		// SUCCESS MESSAGE
		const book = new Book(title, author, isbn);

		ui.addBookToList(book);

		// Create Error text node
		errMsg = "Book added successfuly";
		addErrorText(errMsg);
		// Display Error msg
		DisplayToastMessage(
			text_color_green,
			background_color_lightGreen,
			titleDisable,
			authorDisable,
			isbnDisable
		);

		//  Clear the inputs
		ui.clearInputs();
	}
	e.preventDefault();
});

function addErrorText(msg) {
	const container = document.querySelector(".container");

	const heading = document.querySelector("#heading");

	const displayErrorMessage = document.createElement("div");

	displayErrorMessage.appendChild(document.createTextNode(`${msg}`));

	displayErrorMessage.className = "alert-msg";

	container.insertBefore(displayErrorMessage, heading);
}

function DisplayToastMessage(
	text_color,
	background_color,
	titleDisable,
	authorDisable,
	isbnDisable,
	status = false
) {
	const displayErrorMessage = document.querySelector(".alert-msg");
	displayErrorMessage.style.color = text_color;
	displayErrorMessage.style.backgroundColor = background_color;
	displayErrorMessage.style.textAlign = "center";
	displayErrorMessage.style.fontWeight = "bold";
	displayErrorMessage.style.textTransform = "uppercase";
	displayErrorMessage.style.letterSpacing = "0.15em";
	displayErrorMessage.style.padding = "10px";
	displayErrorMessage.style.margin = "20px 0";
	if (status) {
		titleDisable.disabled = true;
		authorDisable.disabled = true;
		isbnDisable.disabled = true;
		setTimeout(function () {
			titleDisable.disabled = false;
			authorDisable.disabled = false;
			isbnDisable.disabled = false;
			document.querySelector(".alert-msg").remove();
		}, 2000);
	}

	setTimeout(function () {
		document.querySelector(".alert-msg").remove();
	}, 2000);
}

// Event for delete
document.getElementById("book-list").addEventListener("click", function (e) {
	const ui = new UI();
	ui.deleteBook(e.target);
	// if ((e.target.className = "delete")) {
	// 	e.target.parentElement.parentElement.remove();
	// }
	// errMsg = "Book Deleted";
	// addErrorText(errMsg);

	// DisplayToastMessage(text_color_green, background_color_lightGreen);
});
