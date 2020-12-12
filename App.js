import React, { useState, useEffect } from "react";
import Header from "./Header";
import TrackCovide from "./TrackComponent/TrackCovide";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import Route from "react-router-dom/Route";
import Chat from "./ChatComponent/Chat";
import firebase, { db } from "./Firebase";

function App() {
  // USEEFFECT
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (authh) {
      if (authh) {
        //SET INFOS
        // USER INFOS <NAME, PDP, EMAIL>
        setLogInState(true);
        setPhoto(authh.photoURL);
        setUserName(authh.displayName);
        setEmail(authh.email);
        // GET THE USERS IN CONTACT EMAILS
        dispatchEvent({
          type: "SET_USER",
          user: authh,
        });
      } else {
        dispatchEvent({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  //START CONSTANTS
  const history = useHistory();
  const [logInState, setLogInState] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [photo, setPhoto] = useState("");
  //END CONSTANTS
  //START SMALL FCTS
  const onSubmit = (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        setLogInState(true);
        setPhoto(user.photoURL);
        setUserName(user.displayName);
        setEmail(user.email);
        db.collection("users").doc(user.email).set({
          name: user.displayName,
          pdp: user.photoURL,
          email: user.email,
        });
        history.push("/ChatsRoom");
      })
      .catch(function (error) {});
  };
  const onLogOut = (e) => {
    e.preventDefault();
    setLogInState(false);
    setUserName("");
    setEmail("");
    setPhoto("");
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  //END SMALL FCTS

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header
              logInState={logInState}
              email={email}
              photo={photo}
              userName={userName}
              onLogOut={onLogOut}
              onSubmit={onSubmit}
            />
          </Route>
          {/* <PrivateRoute exact path="/Covid19Track" component={TrackCovide} /> */}
          {/* <Route
              exact
              path="/ChatsRoom"
              render={(props) => <Chat {...props} logInState={logInState} />}
            /> */}
          <Route exact path="/ChatsRoom">
            <Chat email={email} logInState={logInState} />
          </Route>
          <Route exact path="/Covid19Track" component={TrackCovide}></Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
