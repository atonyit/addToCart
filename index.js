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
})

onValue(shoppingListInDB, function(snapshot){
   let itemsArray = Object.entries(snapshot.val());
   clearShoppingListEl();
   
   for(let i = 0; i < itemsArray.length; ++i){
    let currentItem = itemsArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];

    appendToShoppingListEl(currentItem);
   }
})

function clearInputFieldEl() {
    inputField.value = "";
}

function clearShoppingListEl(){
shoppingList.innerHTML = "";
}


function appendToShoppingListEl (item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function(){
        console.log(itemID);
    })

    shoppingList.append(newEl)

}