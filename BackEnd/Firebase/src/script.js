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
    parkingData.hourlyRate = parseFloat(hourlyRate);
  }
  //save data to firebase realtime database    
  const reference = ref(database, "parkingData"); //create reference to the database

  //push object to reference parkingData
  push(reference, parkingData);
}
);