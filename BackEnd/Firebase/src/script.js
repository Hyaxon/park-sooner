
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let button = document.getElementById("button");

button.addEventListener("click", function () {
  let name = document.getElementById("name").value;
  let country = document.getElementById("country").value;

  if (name === "" || country === "") {
    alert("Please fill in all fields.");
  } else {
    const data = {
      name: name,
      country: country
    };

    const recordsRef = ref(database, "records");  
    push(recordsRef, data)                       //push data
      .then(() => {
        alert("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }
});