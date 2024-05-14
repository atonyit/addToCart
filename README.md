
# Add to Cart Application

This is a simple web application that allows users to add items to a shopping list and remove them. The application uses Firebase Realtime Database to store the shopping list data.

## Project Structure

```
/project-root
│
├── /assets
│   ├── panda1.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│
├── index.html
├── index.css
├── index.js
└── site.webmanifest
```

## File Descriptions

### `index.html`

This file contains the HTML structure of the application.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Add to Cart</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
        <meta charset="UTF-8">
        <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        <div class="container">
            <img src="assets/panda1.png" alt="Panda eating ramen">
            <input type="text" id="input-field" placeholder="Food!">
            <button id="add-btn">Add to cart</button>
            <ul id="shopping-list"></ul>
        </div>
        <script src="index.js" type="module"></script>
    </body>
</html>
```

### `index.css`

This file contains the CSS styling for the application.

```css
html, body {
    margin: 0;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    background-color: #a2d2ff;
    user-select: none;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    margin: 30px auto;
}

img {
    width: 150px;
    margin: 0px auto;
}

input {
    color: #b17b00;
    background-color: whitesmoke;
    border: 0;
    padding: 15px;
    border-radius: 8px;
    font-size: 20px;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    margin: 10px 0;
}

button {
    color: #FDFDFD;
    background-color: #0036B1;
    border: 0;
    padding: 15px;
    border-radius: 8px;
    font-size: 20px;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
}

ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

ul li {
    background-color: whitesmoke;
    padding: 10px 20px;
    border-radius: 8px;
    flex-grow: 1;
    text-align: center;
    color: #b17b00;
    font-size: 19px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
}

button:hover {
    cursor: pointer;
    background-color: #00339A;
}

ul li:hover {
    cursor: pointer;
    opacity: 50%;
}
```

### `index.js`

This file contains the JavaScript code that interacts with the Firebase Realtime Database.

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-208e0-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addBTN = document.getElementById("add-btn");
const inputField = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");

addBTN.addEventListener("click", function() {
    let inputValue = inputField.value;

    push(shoppingListInDB, inputValue);

    clearInputFieldEl();
});

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        clearShoppingListEl();

        for(let i = 0; i < itemsArray.length; ++i) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];

            appendToShoppingListEl(currentItem);
        }
    } else {
        shoppingList.innerHTML = "No items here... yet";
    }
});

function clearInputFieldEl() {
    inputField.value = "";
}

function clearShoppingListEl() {
    shoppingList.innerHTML = "";
}

function appendToShoppingListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

        remove(exactLocationOfItemInDB);
    });

    shoppingList.append(newEl);
}
```

### `site.webmanifest`

This file contains the web app manifest.

```json
{
    "name": "Add to Cart",
    "short_name": "Add to Cart",
    "icons": [
        {
            "src": "assets/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "assets/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#a2d2ff",
    "background_color": "#a2d2ff",
    "display": "standalone"
}
```

## Setting Up the Project

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Open `index.html` in a Live Server:**
   Use an IDE like VS Code with Live Server extension or any other method to run a live server.

3. **Ensure Firebase Configuration:**
   Make sure you have a Firebase Realtime Database set up and replace the `databaseURL` in `index.js` with your Firebase project URL.

4. **Check the Icons and Manifest:**
   Make sure the icons and manifest file paths are correct and accessible.

5. **Test the Application:**
   Open your web browser and test the application to add and remove items from the shopping list.

By following these steps, you should be able to set up and run the Add to Cart application successfully.
