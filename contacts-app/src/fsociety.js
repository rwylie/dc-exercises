
import * as firebase from 'firebase';

var config = {
   apiKey: "AIzaSyAhcPzld05XwS0KksmvVZarEZoPVo1R63g",
   authDomain: "dc-contacts-793a7.firebaseapp.com",
   databaseURL: "https://dc-contacts-793a7.firebaseio.com",
   projectId: "dc-contacts-793a7",
   storageBucket: "dc-contacts-793a7.appspot.com",
   messagingSenderId: "473040373923"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

 export var User = {};    //user object to export
 export function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)  //will do a popup to sign in
      .then(function (result) {  //if successful firebase gives a user
        User.user = result.user;
        resolve(User);    //and then returns user in the promise
      })
      .catch(function (e) {
        reject(e);
      });
  });
}
firebase.auth()
  .onAuthStateChanged(function(user) {
    if (user) {
      User.user = user;
      console.log(user);
    }
  });
  
 export default database;
