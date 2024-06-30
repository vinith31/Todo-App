import { createContext, useContext, useState } from "react";


//1.Create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext);

//2.Share the created context with other components

function AuthProvider( {children} ){
    
    //3. put some state in context
    const [isAuthenticated, setAuthenticated] = useState(false);
    
    const [username, setUsername] = useState(null);

    // this function returns the boolean toCheck if the username and password matches
    function login(username, password){

        // if the username is in28minutes and password is dummy then it executes if otherwise else
        if(username === 'in28minutes' && password === 'dummy'){
            setAuthenticated(true); // we are changing the isAuthenticated to true
            setUsername(username); // setting the username 
            return true; // returning true
        }else{
            setAuthenticated(false); // we are changing the isAuthenticated to false
            setUsername(null); // setting the username to null 
            return false; // returning false
        }
    }

    function logout(){
        setAuthenticated(false); // we are changing the isAuthenticated to false
    }

    return (
        // all the childrens can access the isAuthenticated, login function, logout function and username
        // childrens aka components
        <AuthContext.Provider value={{isAuthenticated, login, logout, username}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;