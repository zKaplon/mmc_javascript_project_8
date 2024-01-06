const incomeArea = document.querySelector(".income-area");
const expensesArea = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");

const panel = document.querySelector(".add-transaction-panel");
const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");

const addTransactionBtn = document.querySelector(".add-transaction");
const deleteAllBtn = document.querySelector(".delete-all");
const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");

let deleteBtn;
let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [];

const showPanel = () => {
	panel.style.display = "flex";
};

const hidePanel = () => {
	panel.style.display = "none";
	clearPanel();
};

const clearPanel = () => {
	nameInput.value = "";
	amountInput.value = "";
	categoryInput.selectedIndex = 0;
};

const checkInputs = () => {
	if (
		nameInput.value !== "" &&
		amountInput.value !== "" &&
		categoryInput.value !== "none"
	) {
		addTransaction();
	} else {
		alert("Uzupełnij wszystkie pola!");
	}
};

const addTransaction = () => {
	const transaction = document.createElement("div");
	transaction.classList.add("transaction");
	transaction.setAttribute("id", ID);

	const transaction2 = document.createElement("div");
	transaction2.classList.add("transaction2");
	transaction.appendChild(transaction2);

	selectedCategory = categoryInput.value;

	if (selectedCategory === "income") {
		categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
	} else if (selectedCategory === "shopping") {
		categoryIcon = '<i class="fas fa-cart-arrow-down"> </i>';
	} else if (selectedCategory === "food") {
		categoryIcon = '<i class="fas fa-hamburger"></i> ';
	} else if (selectedCategory === "cinema") {
		categoryIcon = '<i class="fas fa-film"></i>';
	}

	const transactionIcon = document.createElement("p");
	transactionIcon.classList.add("transaction-name");
	transactionIcon.innerHTML = categoryIcon;
	transaction2.appendChild(transactionIcon);

	const transactionName = document.createElement("p");
	transactionName.classList.add("transaction-name");
	transactionName.textContent = ` ${nameInput.value}`;
	transaction2.appendChild(transactionName);

	const transactionAmount = document.createElement("p");
	transactionAmount.classList.add("transaction-amount");
	transactionAmount.textContent = `${amountInput.value}zł`;
	transaction.appendChild(transactionAmount);

	deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerHTML = "<i class='fas fa-times'></i>";
	transactionAmount.appendChild(deleteBtn);

	showTransaction(transaction);
	updateMoneyArr();
	hidePanel();
	ID++;
};

const showTransaction = (transaction) => {
	if (selectedCategory === "income") {
		incomeArea.appendChild(transaction);
	} else {
		expensesArea.appendChild(transaction);
	}
};

const updateMoneyArr = (params) => {
	if (selectedCategory === "income") {
		moneyArr.push(amountInput.value * 1);
	} else {
		moneyArr.push(amountInput.value * -1);
	}

	updateAvailableMoney();
};

const updateAvailableMoney = () => {
	const sumWithInitial = moneyArr.reduce((a, b) => a + b, 0);
	availableMoney.textContent = `${sumWithInitial}zł`;
};

const deleteTransaction = (id) => {
	const transactionToDelete = document.getElementById(id);
	moneyArr.splice(transactionToDelete.id, 1, 0);
	updateAvailableMoney();

	transactionToDelete.remove();
};

const deleteAllTransactions = () => {
	incomeArea.innerHTML = "<h3>Przychód:</h3>";
	expensesArea.innerHTML = "<h3>Wydatki:</h3>";
	availableMoney.textContent = "0zł";
	moneyArr = [];
};

const changeStyleToLight = () => {
	root.style.setProperty('--first-color', '#F9F9F9')
	root.style.setProperty('--second-color', '#14161F')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
}

const changeStyleToDark = () => {
	root.style.setProperty('--first-color', '#14161F')
	root.style.setProperty('--second-color', '#F9F9F9')
	root.style.setProperty('--border-color', 'rgba(255,255,255,.4)')
}


addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", hidePanel);
saveBtn.addEventListener("click", checkInputs);

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete")) {
		const id = e.target.closest(".transaction").id;
		deleteTransaction(id);
	}
});
deleteAllBtn.addEventListener("click", deleteAllTransactions);
lightBtn.addEventListener('click', changeStyleToLight)
darkBtn.addEventListener('click', changeStyleToDark)