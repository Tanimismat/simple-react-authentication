import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    console.log('working');
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch((error) => {
        console.log('My error', error)
        console.error('My error', error)
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        // Sign-out successful.
      })
      .catch((error) => {
        setUser({});
        // An error happened.
      });
  }

  return (
    <div className="App">

      <button onClick={handleSignOut}>Sign out</button>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>

      <h2>Name: {user.displayName}</h2>
      <p>Provider: {user.providerId}</p>
      {/* <img src={user.photoURL} alt="" />  */}
    </div>
  );
}

export default App;
