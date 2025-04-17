//import modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { firebaseConfig } from './config.js'; //import firebase configuration file from config.js

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


//function adds parking data to database with lot_name as key
let saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function () {
  //get values from input fields
let lotName = document.getElementById("lotName").value;
let lotCapacity = document.getElementById("lotCapacity").value;
let hourlyRate = document.getElementById("hourlyRate").value;

//get selected permit types and if there are pay stations or not
let selectedPermits = [];
document.querySelectorAll('input[name="permit"]:checked').forEach((checkbox) => {
  selectedPermits.push(checkbox.value);
});
  //create object to store parking lot information in database
  const parkingData = {
    lotName: lotName,
    lotCapacity: lotCapacity,
    permitTypes: selectedPermits
  };

  // If hourly rate is provided, add it
  if (hourlyRate.trim() !== "") {
    parkingData.hourlyRate = hourlyRate;
  }
 
  //write parking data to firebase with lot_name as key
  set(ref(database, 'parkingData/' + lotName), parkingData)
  .then(() => {
    alert('Data saved!');
    console.log("Data saved successfully!");
  })
  .catch((error) => {
    console.error("Error saving data: ", error);
  });
});


//create a function that gets and displays parking data 
let readButton = document.getElementById("readButton");
readButton.addEventListener("click", function () {
  let lotName = document.getElementById("lotName").value;
const parkingRef = ref(database, 'parkingData/' + lotName);
onValue(parkingRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    console.log("Retrieved data:", data);
    alert("Data retrieved! Check console.");
  } else {
    alert("No data found for that lot.");
  }
});
})
