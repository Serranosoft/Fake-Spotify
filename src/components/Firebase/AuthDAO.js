import 'firebase/auth';
import 'firebase/database';
import { useState, createContext, useEffect } from 'react';
import { auth } from "./config"


export const AuthContext = createContext()

export const AuthDAO = ({ children }) => {


    // Usuario autenticado actual
    const [authUser, handleAuthUser] = useState("")

    // Create a authetication account
    const register = (email, password) => auth.createUserWithEmailAndPassword(email, password);

    // Sign in
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
            .then((authUser) => {
                handleAuthUser(authUser.user)
            })
    };

    // Sign out
    function signOut(history) {
        auth.signOut()
            .then(() => {
                handleAuthUser("")
                history.push("/")
            })
    }

    // Reset password
    function resetPassword(email) {
        auth.sendPasswordResetEmail(email);
    }

    // Update password
    function updatePassword(password) {
        auth.currentUser.updatePassword(password);
    }

    // Obtiene el usuario autenticado cuando el componente termina de montarse
    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            handleAuthUser(authUser)
        })
    }, [])

    return (
        <AuthContext.Provider
            value={
                {
                    authUser, register, login, signOut, resetPassword, updatePassword
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}