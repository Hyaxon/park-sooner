import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// DOM elements
const lotIdInput = document.getElementById('lotId');
const lotNameInput = document.getElementById('lotName');
const lotCapacityInput = document.getElementById('lotCapacity');
const lotAddressInput = document.getElementById('lotAddress');
const latInput = document.getElementById('lat');
const longInput = document.getElementById('long');
const walkTimesContainer = document.getElementById('walkTimesContainer');
const addWalkTimeButton = document.getElementById('addWalkTimeButton');
const parkingRatesContainer = document.getElementById('parkingRatesContainer');
const addRateButton = document.getElementById('addRateButton');
const saveButton = document.getElementById('saveButton');
const fetchDataButton = document.getElementById('fetchDataButton');
const signInGoogleButton = document.getElementById('signInGoogleButton');
const signOutButton = document.getElementById('signOutButton');

// Add walk time field
addWalkTimeButton.addEventListener('click', () => {
  const div = document.createElement('div');
  div.className = 'walkTimeEntry';
  div.innerHTML = `
    <input type="text" class="destination" placeholder="Destination (e.g., bizzellLibrary)" />
    <input type="number" class="time" placeholder="Minutes (e.g., 5)" />
    <button class="removeButton" type="button">Remove</button>
  `;
  walkTimesContainer.appendChild(div);
  
  // Add remove functionality
  div.querySelector('.removeButton').addEventListener('click', () => {
    div.remove();
  });
});

// Add parking rate field
addRateButton.addEventListener('click', () => {
  const div = document.createElement('div');
  div.className = 'rateEntry';
  div.innerHTML = `
    <input type="text" class="rateType" placeholder="Rate Type (e.g., Commuter)" />
    <input type="text" class="rateValue" placeholder="Rate (e.g., $300/year)" />
    <button class="removeButton" type="button">Remove</button>
  `;
  parkingRatesContainer.appendChild(div);
  
  // Add remove functionality
  div.querySelector('.removeButton').addEventListener('click', () => {
    div.remove();
  });
});

// Google Sign In
signInGoogleButton.addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Signed in as ${user.email}`);
    })
    .catch((error) => {
      alert(`Sign-in error: ${error.message}`);
    });
});

// Sign Out
signOutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert('Signed out successfully');
    })
    .catch((error) => {
      alert(`Sign-out error: ${error.message}`);
    });
});

// Save data to Firebase
saveButton.addEventListener('click', () => {
  if (!auth.currentUser) {
    alert('Please sign in first');
    return;
  }

  const lotId = lotIdInput.value.trim();
  if (!lotId) {
    alert('Please enter a Lot ID');
    return;
  }

  // Collect walk times
  const walkTimes = {};
  document.querySelectorAll('.walkTimeEntry').forEach(entry => {
    const destination = entry.querySelector('.destination').value.trim();
    const time = entry.querySelector('.time').value.trim();
    if (destination && time) {
      walkTimes[destination] = parseInt(time);
    }
  });

  // Collect parking rates
  const parkingRates = {};
  document.querySelectorAll('.rateEntry').forEach(entry => {
    const type = entry.querySelector('.rateType').value.trim();
    const value = entry.querySelector('.rateValue').value.trim();
    if (type && value) {
      parkingRates[type] = value;
    }
  });

  // Collect pass types
  const passTypes = {
    commuter: document.querySelector('input[name="passType"][value="commuter"]').checked,
    faculty: document.querySelector('input[name="passType"][value="faculty"]').checked,
    housing: document.querySelector('input[name="passType"][value="housing"]').checked,
    free: document.querySelector('input[name="passType"][value="free"]').checked,
    paid: document.querySelector('input[name="passType"][value="paid"]').checked
  };

  // Collect average capacities
  const averageLotCapacities = {};
  document.querySelectorAll('.capacityInput').forEach(input => {
    const time = input.getAttribute('data-time');
    const value = input.value.trim();
    if (time && value) {
      averageLotCapacities[time] = parseInt(value);
    }
  });

  // Prepare data object
  const parkingData = {
    lotName: lotNameInput.value.trim(),
    lotCapacity: lotCapacityInput.value.trim(),
    lotAddress: lotAddressInput.value.trim(),
    coordinates: {
      lat: parseFloat(latInput.value),
      long: parseFloat(longInput.value)
    },
    walkTimes,
    parkingRates,
    passTypes,
    averageLotCapacities
  };

  // Save to Firebase
  set(ref(database, `parkingData/${lotId}`), parkingData)
    .then(() => {
      alert('Data saved successfully!');
    })
    .catch((error) => {
      alert(`Error saving data: ${error.message}`);
    });
});

// Fetch data from Firebase
fetchDataButton.addEventListener('click', () => {
  const lotId = lotIdInput.value.trim();
  if (!lotId) {
    alert('Please enter a Lot ID');
    return;
  }

  get(child(ref(database), `parkingData/${lotId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Fill basic info
        lotNameInput.value = data.lotName || '';
        lotCapacityInput.value = data.lotCapacity || '';
        lotAddressInput.value = data.lotAddress || '';
        latInput.value = data.coordinates?.lat || '';
        longInput.value = data.coordinates?.long || '';
        
        // Fill walk times
        walkTimesContainer.innerHTML = '';
        if (data.walkTimes) {
          for (const [destination, time] of Object.entries(data.walkTimes)) {
            const div = document.createElement('div');
            div.className = 'walkTimeEntry';
            div.innerHTML = `
              <input type="text" class="destination" value="${destination}" />
              <input type="number" class="time" value="${time}" />
              <button class="removeButton" type="button">Remove</button>
            `;
            walkTimesContainer.appendChild(div);
            div.querySelector('.removeButton').addEventListener('click', () => {
              div.remove();
            });
          }
        }
        
        // Fill parking rates
        parkingRatesContainer.innerHTML = '';
        if (data.parkingRates) {
          for (const [rateType, rateValue] of Object.entries(data.parkingRates)) {
            const div = document.createElement('div');
            div.className = 'rateEntry';
            div.innerHTML = `
              <input type="text" class="rateType" value="${rateType}" />
              <input type="text" class="rateValue" value="${rateValue}" />
              <button class="removeButton" type="button">Remove</button>
            `;
            parkingRatesContainer.appendChild(div);
            div.querySelector('.removeButton').addEventListener('click', () => {
              div.remove();
            });
          }
        }
        
        // Fill pass types
        if (data.passTypes) {
          document.querySelector('input[name="passType"][value="commuter"]').checked = data.passTypes.commuter || false;
          document.querySelector('input[name="passType"][value="faculty"]').checked = data.passTypes.faculty || false;
          document.querySelector('input[name="passType"][value="housing"]').checked = data.passTypes.housing || false;
          document.querySelector('input[name="passType"][value="free"]').checked = data.passTypes.free || false;
          document.querySelector('input[name="passType"][value="paid"]').checked = data.passTypes.paid || false;
        }
        
        // Fill average capacities
        if (data.averageLotCapacities) {
          document.querySelectorAll('.capacityInput').forEach(input => {
            const time = input.getAttribute('data-time');
            if (data.averageLotCapacities[time]) {
              input.value = data.averageLotCapacities[time];
            }
          });
        }
        
        alert('Data loaded successfully!');
      } else {
        alert('No data found for this Lot ID');
      }
    })
    .catch((error) => {
      alert(`Error fetching data: ${error.message}`);
    });
});

// Check auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user.email);
    signInGoogleButton.style.display = 'none';
    signOutButton.style.display = 'inline-block';
  } else {
    console.log('User is signed out');
    signInGoogleButton.style.display = 'inline-block';
    signOutButton.style.display = 'none';
  }
});
