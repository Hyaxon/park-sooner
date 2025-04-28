import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Tab Switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    tab.classList.add('active');
    document.getElementById(`${tab.dataset.tab}-content`).classList.add('active');
  });
});

// Initialize dynamic fields for parking data
const walkTimesContainer = document.getElementById('walkTimesContainer');
const addWalkTimeButton = document.getElementById('addWalkTimeButton');
const parkingRatesContainer = document.getElementById('parkingRatesContainer');
const addRateButton = document.getElementById('addRateButton');

// Add walk time field
const addWalkTimeField = () => {
  const div = document.createElement('div');
  div.className = 'walkTimeEntry entry-row';
  div.innerHTML = `
    <input type="text" class="destination" placeholder="Destination (e.g., bizzellLibrary)" />
    <input type="number" class="time" placeholder="Minutes (e.g., 5)" />
    <button class="removeButton">Remove</button>
  `;
  walkTimesContainer.appendChild(div);
  div.querySelector('.removeButton').addEventListener('click', () => div.remove());
};

// Add parking rate field
const addRateField = () => {
  const div = document.createElement('div');
  div.className = 'rateEntry entry-row';
  div.innerHTML = `
    <input type="text" class="rateType" placeholder="Rate Type (e.g., Commuter)" />
    <input type="text" class="rateValue" placeholder="Rate (e.g., $300/year)" />
    <button class="removeButton">Remove</button>
  `;
  parkingRatesContainer.appendChild(div);
  div.querySelector('.removeButton').addEventListener('click', () => div.remove());
};

// Initialize with one field each
addWalkTimeField();
addRateField();

// Event listeners
addWalkTimeButton.addEventListener('click', addWalkTimeField);
addRateButton.addEventListener('click', addRateField);

// Authentication
const signInGoogleButton = document.getElementById('signInGoogleButton');
const signOutButton = document.getElementById('signOutButton');

signInGoogleButton.addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      alert(`Signed in as ${result.user.email}`);
    })
    .catch((error) => {
      alert(`Sign-in error: ${error.message}`);
    });
});

signOutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert('Signed out successfully');
    })
    .catch((error) => {
      alert(`Sign-out error: ${error.message}`);
    });
});

// Parking Data Functions
const saveParkingButton = document.getElementById('saveParkingButton');
const fetchParkingButton = document.getElementById('fetchParkingButton');

saveParkingButton.addEventListener('click', saveParkingData);
fetchParkingButton.addEventListener('click', fetchParkingData);

function saveParkingData() {
  if (!auth.currentUser) {
    alert('Please sign in first');
    return;
  }

  const lotId = document.getElementById('lotId').value.trim();
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
    lotName: document.getElementById('lotName').value.trim(),
    lotCapacity: document.getElementById('lotCapacity').value.trim(),
    lotAddress: document.getElementById('lotAddress').value.trim(),
    coordinates: {
      lat: parseFloat(document.getElementById('lat').value),
      long: parseFloat(document.getElementById('long').value)
    },
    walkTimes,
    parkingRates,
    passTypes,
    averageLotCapacities
  };

  // Save to Firebase
  set(ref(database, `parkingData/${lotId}`), parkingData)
    .then(() => {
      alert('Parking data saved successfully!');
    })
    .catch((error) => {
      alert(`Error saving parking data: ${error.message}`);
    });
}

function fetchParkingData() {
  const lotId = document.getElementById('lotId').value.trim();
  if (!lotId) {
    alert('Please enter a Lot ID');
    return;
  }

  get(child(ref(database), `parkingData/${lotId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Fill basic info
        document.getElementById('lotName').value = data.lotName || '';
        document.getElementById('lotCapacity').value = data.lotCapacity || '';
        document.getElementById('lotAddress').value = data.lotAddress || '';
        document.getElementById('lat').value = data.coordinates?.lat || '';
        document.getElementById('long').value = data.coordinates?.long || '';
        
        // Fill walk times
        walkTimesContainer.innerHTML = '';
        if (data.walkTimes) {
          for (const [destination, time] of Object.entries(data.walkTimes)) {
            const div = document.createElement('div');
            div.className = 'walkTimeEntry entry-row';
            div.innerHTML = `
              <input type="text" class="destination" value="${destination}" />
              <input type="number" class="time" value="${time}" />
              <button class="removeButton">Remove</button>
            `;
            walkTimesContainer.appendChild(div);
            div.querySelector('.removeButton').addEventListener('click', () => div.remove());
          }
        } else {
          addWalkTimeField();
        }
        
        // Fill parking rates
        parkingRatesContainer.innerHTML = '';
        if (data.parkingRates) {
          for (const [rateType, rateValue] of Object.entries(data.parkingRates)) {
            const div = document.createElement('div');
            div.className = 'rateEntry entry-row';
            div.innerHTML = `
              <input type="text" class="rateType" value="${rateType}" />
              <input type="text" class="rateValue" value="${rateValue}" />
              <button class="removeButton">Remove</button>
            `;
            parkingRatesContainer.appendChild(div);
            div.querySelector('.removeButton').addEventListener('click', () => div.remove());
          }
        } else {
          addRateField();
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
        
        alert('Parking data loaded successfully!');
      } else {
        alert('No parking data found for this Lot ID');
      }
    })
    .catch((error) => {
      alert(`Error fetching parking data: ${error.message}`);
    });
}

// Drop-Off Data Functions
const saveDropoffButton = document.getElementById('saveDropoffButton');
const fetchDropoffButton = document.getElementById('fetchDropoffButton');

saveDropoffButton.addEventListener('click', saveDropoffData);
fetchDropoffButton.addEventListener('click', fetchDropoffData);

function saveDropoffData() {
  if (!auth.currentUser) {
    alert('Please sign in first');
    return;
  }

  const dropId = document.getElementById('dropId').value.trim();
  if (!dropId) {
    alert('Please enter a Drop ID');
    return;
  }

  // Prepare data object
  const dropoffData = {
    dropName: document.getElementById('dropName').value.trim(),
    dropLocation: document.getElementById('dropLocation').value.trim(),
    coordinates: {
      latitude: document.getElementById('dropLat').value.trim(),
      longitude: document.getElementById('dropLong').value.trim()
    }
  };

  // Save to Firebase
  set(ref(database, `dropOffData/${dropId}`), dropoffData)
    .then(() => {
      alert('Drop-off data saved successfully!');
    })
    .catch((error) => {
      alert(`Error saving drop-off data: ${error.message}`);
    });
}

function fetchDropoffData() {
  const dropId = document.getElementById('dropId').value.trim();
  if (!dropId) {
    alert('Please enter a Drop ID');
    return;
  }

  get(child(ref(database), `dropOffData/${dropId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Fill basic info
        document.getElementById('dropName').value = data.dropName || '';
        document.getElementById('dropLocation').value = data.dropLocation || '';
        document.getElementById('dropLat').value = data.coordinates?.latitude || '';
        document.getElementById('dropLong').value = data.coordinates?.longitude || '';
        
        alert('Drop-off data loaded successfully!');
      } else {
        alert('No drop-off data found for this Drop ID');
      }
    })
    .catch((error) => {
      alert(`Error fetching drop-off data: ${error.message}`);
    });
}

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
