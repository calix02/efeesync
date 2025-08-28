import React, { createContext, useContext, useEffect, useState } from "react";
import apiUrl from './apiUrl.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(apiUrl + "/verify-login", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.status === "success") {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth fetch failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}