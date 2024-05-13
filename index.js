const appSettings = {
    databaseURL: "https://playground-5b376-default-rtdb.firebaseio.com/"
}

const addBTN = document.getElementById("add-btn");
const inputField = document.getElementById("input-field")


addBTN.addEventListener("click", function(){
    let inputValue = inputField.value;

    console.log(inputValue);
})