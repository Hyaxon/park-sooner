//import firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { firebaseConfig } from './config.js'; //import firebase configuration file from config.js
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"; //import google auth provider and sign in with popup function
const app = initializeApp(firebaseConfig); //initialize firebase app with configuration file

//get references to real time database and authentication
const auth = getAuth(app);
const database = getDatabase(app);

//sign up with email and password 
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
          });
        alert("User signed up succesfully!"); //alert user that they have signed up successfully
        })
        .catch((error) => {
        alert(error.message); //alert user if there is an error signing up
        });
});

//sign in with google pop up 
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

            //store user information to database
            set(ref(database, 'users/' + user.uid), {
                email: user.email,
                fullName: user.displayName, 
              });
            alert("Signed in with Google as " + user.displayName); //alert user that they have signed in successfully
        }).catch((error) => {
            alert(error.message); //alert user if there is an error signing in
        });
}); 


