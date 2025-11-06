import React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";

const URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [issue,setIssue]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const storeTokenInLocalStorage = (serverToken) => {
    setToken(serverToken);
  };

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
  };

  const userAuthentication = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL}/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getIssueData = async () => {
    try {
      const response = await fetch(`${URL}/issues`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      }); 
      if (response.ok) {
        const data = await response.json();
        setIssue(data.issues);
      }
      else {
        console.error("Error fetching issue data");
      }

    } catch (error) {
      console.error("Error fetching issue data:", error);
    } 
  };

  useEffect(() => {
    userAuthentication();
    getIssueData();
  }, [authorizationToken]);

  // Determine if the user is an admin based on the user data
  const isAdmin = user && user.isAdmin === true;

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLocalStorage,
        logoutUser,
        user,
        issue,
        authorizationToken,
        isLoading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
