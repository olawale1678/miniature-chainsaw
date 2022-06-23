window.onload = console.log('App has started');

const addType = document.querySelector('.add__type');
const addDescription = document.querySelector('.add__description');
const addValue = document.querySelector('.add__value');
const addBtn = document.querySelector('.add__btn');
const post = document.querySelector('.income__list');
const posts = document.querySelector('.expenses__list');
const income = document.querySelector('.income');
const expenses = document.querySelector('.expenses');
const btn = document.querySelector('.item__delete--btn');
const percentBar = document.querySelector('.budget__expenses--percentage');
const form = document.querySelector('.form');
const itFill = document.querySelector('.itfill');
const span = document.querySelector('.span');
const span1 = document.querySelector('.span1');
let arr = [];
let arr1 = [];
// EVENT LISTENERS
form.addEventListener('submit', checkPoint);
// FUNCTIONS
function checkPoint(e) {
    e.preventDefault();
    if (addType.value === 'inc') {
        addIncome();
        incomeCalculation();
        setBackToDefault();
    } else if (addType.value === 'exp') {
        addExpense();
        expenseCalculation();
        setBackToDefault();
    }
    console.log(arr, arr1);
}

function addIncome() {
    const id = new Date().getTime().toString();
    const text = addDescription.value;
    const value = addValue.value;
    if (addDescription.value !== '' && addValue.value !== '' && addValue.value > 0) {
        inserted(id, text, value);
        createIncome(id, text, value);
    } else {
        return;
    }
}

function createIncome(id, text, value) {
    const element = document.createElement('article');
    element.classList.add('income__list');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<div class="item clearfix">
    <div class="item__description">${text}</div>
    <div class="right clearfix">
    <div class="item__value">+ ${value}</div>
    <div class="item__delete">
    <button class="item__delete--btn">
    <i class="ion-ios-close-outline">&times;</i>
    </button>
    </div>
    </div>
    </div>`;
    const deleteBtn = element.querySelector('.item__delete--btn');
    deleteBtn.addEventListener('click', deleteItem);
    income.appendChild(element);
}

function addExpense() {
    const id = new Date().getTime().toString();
    const text = addDescription.value;
    const value = addValue.value;
    if (addDescription.value !== '' && addValue.value !== '' && addValue.value > 0) {
        inserted1(id, text, value);
        createExpense(id, text, value);
    } else {
        return;
    }
}

function createExpense(id, text, value) {
    const element = document.createElement('article');
    element.classList.add('income__list');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<div class="item clearfix">
    <div class="item__description">${text}</div>
    <div class="right clearfix">
    <div class="item__value">- ${value}</div>
    <div class="item__percentage">10%</div>
    <div class="item__delete">
    <button class="item__delete--btn"><i class="ion-ios-close-outline">&times;</i></button>
    </div>
    </div>
    </div>`;
    const deleteBtn = element.querySelector('.item__delete--btn');
    deleteBtn.addEventListener('click', deleteItem1);
    const itemPer = element.querySelector('.item__percentage');
    if (span.textContent === '0') {
        itemPer.textContent = '---';
        return;
    } else {
        console.log(span.textContent);
        arr1.forEach((item) => {
            let divi = Math.round((parseInt(item.value) / parseInt(span.textContent)) * 100);
            itemPer.textContent = divi + '%';
        })
    }
    expenses.appendChild(element);

}
function inserted(id, text, value) {
    const items = {
        id,
        text,
        value
    }
    arr.push(items);
}

function inserted1(id, text, value) {
    const items = {
        id,
        text,
        value
    }
    arr1.push(items);
}

function incomeCalculation() {
    incomeSum();
    itFill.textContent = parseInt(span.textContent) - parseInt(span1.textContent);
    exp();
}

function incomeSum() {
    const sum = arr.reduce((pre, curr) => {
        return pre + parseInt(curr.value);
    }, 0)
    span.textContent = sum;
}

function expenseCalculation() {
    expenseSum();
    itFill.textContent = parseInt(span.textContent) - parseInt(span1.textContent);
    exp();
}

function expenseSum() {
    const sum = arr1.reduce((pre, curr) => {
        return pre + parseInt(curr.value);
    }, 0)
    span1.textContent = sum;
}
// DELETE ELEMENT
function deleteItem(e) {
    e.preventDefault();
    const element = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    const id = element.dataset.id;
    arr = arr.filter((item) => {
        if (item.id !== id) {
            return item;
        }
        exp();
    })
    income.removeChild(element);
    incomeCalculation();
}

function deleteItem1(e) {
    e.preventDefault();
    const element = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    const id = element.dataset.id;
    arr1 = arr1.filter((item) => {
        if (item.id !== id) {
            return item;
        }
        exp();
    })
    expenses.removeChild(element);
    expenseCalculation();
}

function setBackToDefault() {
    addDescription.value = '';
    addValue.value = '';
}
// PERCENTAGE CALCULATION
function exp() {
    if (span.textContent === '0') {
        return;
    } else {
        console.log(span.textContent);
        let divi = Math.round((parseInt(span1.textContent) / parseInt(span.textContent)) * 100);
        percentBar.textContent = divi + '%';
    }
}