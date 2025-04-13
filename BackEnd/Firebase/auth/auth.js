//import firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { firebaseConfig } from './config.js'; //ijmport firebase configuration file from config.js

const app = initializeApp(firebaseConfig); //initialize firebase app with configuration file

//get references to real time database and authentication
const auth = getAuth(app);
const database = getDatabase(app);

let signUpButton = document.getElementById("signUpButton");
//add event listener to sign up button
signUpButton.addEventListener("click", function () {
    //get email and password inputted by user 
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    //use firebase authentication to create a new user account 
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        //if signed up, userCredential contains user info
        const user = userCredential.user;

        //store additional user information in real time database
        //"set" saves data to a specified reference
        set(ref(database, 'users/' + user.uid), {
            email: user.email,
            displayName: user.displayName
          });
        alert("User signed up succesfully!"); //alert user that they have signed up successfully
        _})
        .catch((error) => {
        alert(error.message); //alert user if there is an error signing up
        });
});

