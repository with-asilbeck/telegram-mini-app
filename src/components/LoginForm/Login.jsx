import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";

const Login = ({setUserToken}) => {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem('isAuth', result.user.email)
            setUserToken(result.user.email)
        }).catch((error) => {
            console.error("Error during sign-in:", error);
        });
    };

    return (
        <div className="loginpage">
            <p>Sign in with Google</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in</button>
        </div>
    );
}

export default Login;
