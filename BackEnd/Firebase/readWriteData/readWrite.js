// Import modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, get, update } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Track authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);
  } else {
    console.log("No user is logged in");
  }
});

// Parking rates configuration
const defaultRates = {
  Commuter: "$300/year",
  Faculty: "$326/year",
  Housing: "$350/year",
  Visitor: "$3.00/day",
  "Pay Stations": "$1.50/hour"
};

// Google Sign-In Handler
const provider = new GoogleAuthProvider();
document.getElementById("signInGoogleButton")?.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if (checkType(user)) {
        set(ref(database, 'users/' + user.uid), {
          email: user.email,
          fullName: user.displayName,
        });
        alert("Signed in with Google as " + user.displayName);
      }
    })
    .catch((error) => alert(error.message));
});

// Type Validation
function checkType(user) {
  if (user && typeof user === 'object' && typeof user.email === 'string') {
    return true;
  }
  throw new Error('Invalid user object');
}

// Walk Time Input Management
document.getElementById("addWalkTimeButton")?.addEventListener("click", () => {
  const container = document.getElementById("walkTimesContainer");
  const newEntry = document.createElement("div");
  newEntry.classList.add("walkTimeEntry");
  newEntry.innerHTML = `
    <input type="text" class="destination" placeholder="Destination Name" />
    <input type="text" class="time" placeholder="Walk Time (e.g., 5 min)" />
  `;
  container.appendChild(newEntry);
});

// Unified Save Handler with Walk Time Preservation
document.getElementById("saveButton")?.addEventListener("click", function () {
  const lotName = document.getElementById("lotName").value.trim();
  const lotCapacity = document.getElementById("lotCapacity").value.trim();
  const lotAddress = document.getElementById("lotAddress").value.trim();

  if (!lotName) {
    alert("Parking lot name is required!");
    return;
  }

  const sanitizedLotName = lotName.replace(/[.#$\[\]\/]/g, "_");
  const parkingRef = ref(database, 'parkingData/' + sanitizedLotName);

  // Collect form data
  const formWalkTimes = {};
  document.querySelectorAll("#walkTimesContainer .walkTimeEntry").forEach(entry => {
    const destination = entry.querySelector(".destination").value.trim();
    const time = entry.querySelector(".time").value.trim();
    if (destination && time) formWalkTimes[destination] = time;
  });

  const parkingRates = {};
  document.querySelectorAll('input[name="permit"]:checked').forEach(checkbox => {
    parkingRates[checkbox.value] = defaultRates[checkbox.value] || "";
  });

  // Update or create logic
  get(parkingRef).then((snapshot) => {
    const updates = {};
    if (lotCapacity) updates.lotCapacity = lotCapacity;
    if (lotAddress) updates.lotAddress = lotAddress;
    if (Object.keys(parkingRates).length > 0) updates.parkingRates = parkingRates;

    if (snapshot.exists()) {
      // Merge existing walk times with new entries
      const existingData = snapshot.val();
      const mergedWalkTimes = {
        ...(existingData.walkTimes || {}),
        ...formWalkTimes  // New entries override existing ones with same destination
      };
      
      if (Object.keys(mergedWalkTimes).length > 0) {
        updates.walkTimes = mergedWalkTimes;
      }

      update(parkingRef, updates)
        .then(() => alert('Data updated successfully!'))
        .catch(error => console.error("Update error:", error));
    } else {
      // For new entries, use form data directly
      set(parkingRef, { 
        lotName, 
        walkTimes: formWalkTimes,
        ...updates,
        created: new Date().toISOString() 
      })
      .then(() => alert('New lot created!'))
      .catch(error => console.error("Create error:", error));
    }
  }).catch(error => console.error("Existence check error:", error));
});

// Data Retrieval Handlers
document.getElementById("readButton")?.addEventListener("click", function () {
  const lotName = document.getElementById("lotName").value.trim();
  if (!lotName) return alert("Please enter a lot name");

  get(ref(database, `parkingData/${lotName}`)).then((snapshot) => {
    const data = snapshot.val();
    if (!data) return alert("No data found");

    // Populate form fields
    document.getElementById("lotCapacity").value = data.lotCapacity || "";
    document.getElementById("lotAddress").value = data.lotAddress || "";

    // Populate walk times
    const container = document.getElementById("walkTimesContainer");
    container.innerHTML = "";
    if (data.walkTimes) {
      Object.entries(data.walkTimes).forEach(([dest, time]) => {
        container.appendChild(createWalkTimeEntry(dest, time));
      });
    }

    // Populate checkboxes
    document.querySelectorAll('input[name="permit"]').forEach(checkbox => {
      checkbox.checked = data.parkingRates?.[checkbox.value] !== undefined;
    });

    alert("Data loaded into form!");
  }).catch(error => console.error("Read error:", error));
});

document.getElementById("fetchRatesButton")?.addEventListener("click", () => {
  const lotName = document.getElementById("lotName").value.trim();
  if (!lotName) return alert("Please enter a lot name");

  get(ref(database, `parkingData/${lotName}/parkingRates`)).then((snapshot) => {
    const rates = snapshot.val();
    rates ? alert(JSON.stringify(rates, null, 2)) : alert("No rates found");
  }).catch(error => console.error("Rates fetch error:", error));
});

// Helper function
function createWalkTimeEntry(destination = "", time = "") {
  const div = document.createElement("div");
  div.classList.add("walkTimeEntry");
  div.innerHTML = `
    <input type="text" class="destination" value="${destination}" />
    <input type="text" class="time" value="${time}" />
  `;
  return div;
}

