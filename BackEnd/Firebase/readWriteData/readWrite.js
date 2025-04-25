//import modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { firebaseConfig } from './config.js'; //import firebase configuration file from config.js

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// parking rates based on parking pass
const defaultRates = {
  Commuter: "$300/year",
  Faculty: "$326/year",
  Housing: "$350/year",
  Visitor: "$3.00/day",
  "Pay Stations": "$1.50/hour"
};

//function adds parking data to database with lot_name as key
let saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function () {
  //get values from input fields
  let lotName = document.getElementById("lotName").value;
  let lotCapacity = document.getElementById("lotCapacity").value;

  // Get selected permit types and their rates
  const parkingRates = {};
  document.querySelectorAll('input[name="permit"]:checked').forEach((checkbox) => {
    const permitType = checkbox.value;
    parkingRates[permitType] = defaultRates[permitType] || ""; // Use default rate, or empty string if not found
  });

  //create object to store parking lot information in database
  const parkingData = {
    lotName: lotName,
    lotCapacity: lotCapacity,
    parkingRates: parkingRates // Use parkingRates here
  };

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

//create a function that gets and displays parking data from firebase
let readButton = document.getElementById("readButton");
readButton.addEventListener("click", function () {
  let lotName = document.getElementById("lotName").value; // Correct ID
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
});

//function that gets and displays parking rates
function getParkingRates(lotName) {
  //check if valid lot name is provided
  if (!lotName ) {
    console.error("Invalid lot name provided.");
    alert("Please enter a lot name to fetch rates.");
    return;
  }

  const ratesRef = ref(database, `parkingData/${lotName}/parkingRates`); //changed

  onValue(ratesRef, (snapshot) => {
    const ratesData = snapshot.val();
    if (ratesData) {
      console.log(`Parking rates for ${lotName}:`, ratesData);
      alert(`Parking rates for ${lotName} retrieved! Check console.`);
      // You can further process and display this data on your webpage here
    } else {
      console.log(`No parking rates found for ${lotName}.`);
      alert(`No parking rates found for ${lotName}.`);
    }
  });
}

// Example of how to use the getParkingRates function when a button is clicked
let fetchRatesButton = document.getElementById("fetchRatesButton");
if (fetchRatesButton) {
  fetchRatesButton.addEventListener("click", function () {
    let name_lot = document.getElementById("lotName").value; // Correct ID
    if (name_lot) {
      getParkingRates(name_lot);
    } else {
      alert("Please enter the lot name to fetch rates.");
    }
  });
}
