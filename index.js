import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from
 "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-208e0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")

const addBTN = document.getElementById("add-btn");
const inputField = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");


addBTN.addEventListener("click", function(){
    let inputValue = inputField.value;

    push(shoppingListInDB, inputValue)

    clearInputFieldEl();
    appendToShoppingListEl(inputValue);
})

onValue(shoppingListInDB, function(snapshot){
   let itemsArray = Object.values(snapshot.val());
   console.log(shoppingListArray)
})

function clearInputFieldEl() {
    inputField.value = "";
}

function appendToShoppingListEl (itemValue) {
    shoppingList.innerHTML += `<li> ${itemValue} </li>`
}