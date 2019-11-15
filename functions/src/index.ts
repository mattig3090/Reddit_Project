import * as functions from 'firebase-functions';

//const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.database();

exports.increment = functions.database.ref('/votes/{voterID}')
.onWrite((change, context) => {
  
  
  // Grab the current value of what was written to the Realtime Database.
  const original = change.after.val();
  let incrementme = 0;

    if (!!original) {
        console.log("add 1 to total");
        incrementme = 1;
    }
    else {
        console.log("subtract 1 to total");
        incrementme = -1;
    }
    let totalRef = db.ref("total");
    return totalRef.once('value', (ss: any) => {
        let theval = ss.val();
        let newval = parseInt(theval) + incrementme;
        return totalRef.set(newval);
    });

    });
    




//import * as firebase from 'firebase';


//let newRef = firebase.database().ref("lobby").push(); 
//newRef.set({"title": "NEW GAME"});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//var database = firebase.database();
//firebase.database().ref("hi").set("there"); 
