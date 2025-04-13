
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let button = document.getElementById("button");

button.addEventListener("click", function () {
  //get values from input fields
  let lotName = document.getElementById("lotName").value;
  let lotCapacity = document.getElementById("lotCapacity").value;

  //print error if input fields are empty
  if (lotName === "" || lotCapacity === "") {
    alert("Please enter all fields.");
  } 
  else {
    //make object to store in database
    const parkingData = {
      lotName: lotName,
      lotCapacity: lotCapacity
    };

    //save data to firebase realtime database    
    const reference = ref(database, "parkingData"); //create reference to the database

    //push object to reference parkingData
    push(reference, parkingData);
  }
});