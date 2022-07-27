import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';


const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
 

const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  const handlegithubSignIn = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result=>{
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error=>{
      console.error(error)
    })
  }

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {

      });
  }


  return (
    <div className="App">
      {
      user.email ? <button onClick={handleGoogleSignOut}>Sign Out</button>
        :
        <div>
          <button onClick={handleGoogleSignIn}> Google Sign In</button>
        <button onClick={handlegithubSignIn}> GitHub Sign In</button>
        </div>
      }
      <h4>Name: {user.displayName}</h4>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
