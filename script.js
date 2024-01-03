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
const deleteBtn = document.querySelector("delete");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

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
		categoryInput.value !== "None"
	) {
	} else {
		alert("Uzupełnij wszystkie pola!");
	}
};

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", hidePanel);
saveBtn.addEventListener("click", checkInputs);
