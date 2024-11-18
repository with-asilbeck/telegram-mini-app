import React, {useEffect, useRef, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, limit, query,  addDoc, serverTimestamp} from "firebase/firestore";
import { auth, db } from "./firebaseConfig"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import "./App.css"

const App = () => {
  const [user] = useAuthState(auth);

  const messageRef = collection(db, 'message');
  const queryRef = query(messageRef, orderBy('createdAt', 'desc'), limit(20));
  const [messages] = useCollection(queryRef, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const scrollTo = useRef(null);

  const sendMessage = async(e) => {
    e.preventDefault();  // Corrected typo here
    if(!user || !formValue) return;

    const payload = {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: user.uid,
      photoUrl: user.photoURL || null,  // Add photo URL from user profile
    };
    await addDoc(messageRef, payload);

    setFormValue('');
  }

  useEffect(() => {
      scrollTo.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const logOut = () => {
    signOut(auth);
  }

  return(
    <div className="App">
      <h1>Messages</h1>
      <div className="messages">
        {messages && messages.docs.map((msg) => <ChatMessages key={msg.id} message={msg.data()} />)}
        <div ref={scrollTo}></div>
      </div>
      <form onSubmit={sendMessage}>  {/* Corrected form submission */}
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Send</button>  {/* Changed button type to submit */}
      </form>
      <div className="buttons">
        {!user ? (
          <button className="login" onClick={googleSignIn}>Sign In With Google</button>
        ) : (
          <button className="logout" onClick={logOut}>Log Out</button>
        )}
      </div>
    </div>
  );
}

function ChatMessages(props) {
  const { text, uid, photoUrl } = props.message;
  
  const className = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    <div className={className}>
      <p>{text}</p>
      {photoUrl && <img src={photoUrl} alt="user" />}  {/* Conditionally render image */}
    </div>
  );
}

export default App;
