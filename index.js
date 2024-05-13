import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-5b376-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);

const addBTN = document.getElementById("add-btn");
const inputField = document.getElementById("input-field")


addBTN.addEventListener("click", function(){
    let inputValue = inputField.value;

    console.log(inputValue);
})