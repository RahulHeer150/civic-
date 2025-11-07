import React, { createContext, useContext, useState, useEffect } from "react";

const URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [issue, setIssue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Construct authorization header only if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  // Store token in localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const storeTokenInLocalStorage = (serverToken) => {
    setToken(serverToken);
  };

  const logoutUser = () => {
    setToken("");
    setUser(null);
    setIssue([]);
    localStorage.removeItem("token");
  };

  // Fetch user data
  const userAuthentication = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${URL}/users/profile`, {
        method: "GET",
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.userData) {
        setUser(data.userData);
      } else {
        throw new Error('No user data in response');
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message);
      // Optional: logout user on authentication failure
      logoutUser();
    }
  };

  // Fetch issues data
  const getIssueData = async () => {
    try {
      const response = await fetch(`${URL}/issues`, {
        method: "GET",
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setIssue(data);
      } else if (data.issues && Array.isArray(data.issues)) {
        setIssue(data.issues);
      } else {
        throw new Error('Invalid issues data format');
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
      setError(error.message);
      setIssue([]);
    }
  };

  // Fetch data when token changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      await Promise.all([
        userAuthentication(),
        getIssueData()
      ]);
      
      setIsLoading(false);
    };

    fetchData();
  }, [token]);

  const contextValue = {
    isLoggedIn: !!token,
    storeTokenInLocalStorage,
    logoutUser,
    user,
    issue,
    isLoading,
    error,
    isAdmin: user?.isAdmin || false,
    token
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};