import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const userLogin = (username, password) => {
    setUserLoading(true);
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUserLoading(false);
        localStorage.setItem("bipl_token", data.token);
      })
      .catch((err) => console.log(err.message));
  };
  const value = { user, setUser, userLoading, setUserLoading, userLogin };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
