import { createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext({
    auth: 0,
    setAuth: (i) => { this.auth = i},
    user: "",
    setUser: (i) => { this.user = i},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(0);
    const [user, setUser] = useState("");

    useEffect(() => {
    const isAuth = () => {
        //might be deleted later
        let auth = localStorage.getItem("Auth") || "0"
        let username = localStorage.getItem("Username") || ""
        if(auth === "1"){
            setAuth(1)
            setUser(username)
        }
        else if(auth === "2"){
            setAuth(2)
            setUser(username)
        }
        else{
            setAuth(0)
            setUser(username)
        }
    }

    isAuth();
    }, [auth]);

    return (
        <AuthContext.Provider value = {{ auth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
  
export default AuthProvider;
