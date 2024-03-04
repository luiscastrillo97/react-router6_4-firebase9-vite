import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoUrl } = user;
                setUser({ uid, email, displayName, photoUrl });
            } else {
                setUser(null);
            }
        });
        return unsuscribe;
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
