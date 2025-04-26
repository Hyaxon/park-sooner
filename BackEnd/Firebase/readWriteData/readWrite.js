//import modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { firebaseConfig } from './config.js'; //import firebase configuration file from config.js
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"; //import google auth provider and sign in with popup function

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

//add google sign in with popup to verify only admins can access read/write to database
let signInGoogleButton = document.getElementById("signInGoogleButton");
const provider =  new GoogleAuthProvider(); //create instance of google provider 
//add event listener to sign in with google button 
signInGoogleButton.addEventListener("click", function () {
    //use firebase authentication to sign in with google 
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            // Validate user object before storing it
            try {
                if (checkType(user)) {
                    set(ref(database, 'users/' + user.uid), {
                        email: user.email,
                        fullName: user.displayName,
                    });
                    alert("Signed in with Google as " + user.displayName);
                }
            } catch (error) {
                console.error(error.message);
                alert("Failed to validate user object.");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
}); 

// MultiFactor Authentication for CWE-843: Access of Resource Using Incompatible Type ('Type Confusion')
function checkType(user) {
  // Check if the user is a valid object
  if (user && typeof user === 'object') {
      if (user.email && typeof user.email === 'string') {
          alert("User email is valid: " + user.email);
          return true; 
      } else {
          throw new Error('Invalid user object for email: Expected a string');
      }
  } else {
      throw new Error('Invalid user object for type check: Expected an object');
  }
}

//function that writes parking data to database with lot_name as key
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

// parking rates based on parking pass
const defaultRates = {
  Commuter: "$300/year",
  Faculty: "$326/year",
  Housing: "$350/year",
  Visitor: "$3.00/day",
  "Pay Stations": "$1.50/hour"
};


//function that gets and displays parking rates for given lot
function getParkingRates(lotName) {
  //check if valid lot name is provided (alan unit test)
  if (typeof lotName !== "string" ||  !lotName.endsWith("_lot")) {
    console.error("Invalid lot name provided.");
    alert("Please enter a valid lot name (name_lot) to fetch rates.");
    return;
  }

  const ratesRef = ref(database, `parkingData/${lotName}/parkingRates`); //get reference to where parking rates are stored
  onValue(ratesRef, (snapshot) => {
    const ratesData = snapshot.val(); //get parking rates object
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

//test getParkingRates
let fetchRatesButton = document.getElementById("fetchRatesButton");
  fetchRatesButton.addEventListener("click", function () {
    let lot = document.getElementById("lotName").value; // Correct ID
    getParkingRates(lot); // Call the function with the lot name
  });