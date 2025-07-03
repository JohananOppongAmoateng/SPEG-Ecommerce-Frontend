import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const [accessToken, setAccessToken] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
  );

  // Helper: Decode and validate JWT
  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() / 1000 > exp;
    } catch {
      return true; // Treat as expired if decoding fails
    }
  };

  const resendVerification = async (email) => {
    try {
      await axiosInstance.post("/api/users/resend-verification", { email });
      return true;
    } catch (error) {
      console.error("Error resending verification email:", error);
      return false;
    }
  };

  const syncAccessTokenWithLocalStorage = () => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  useEffect(syncAccessTokenWithLocalStorage, [accessToken]);

  // Fetch user profile
  const fetchUserProfile = async (token) => {
    try {
      const { data } = await axiosInstance.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  // Refresh token
  const refreshAccessToken = async () => {
    try {
      const { data } = await axiosInstance.get("/api/users/refresh_auth", {
        withCredentials: true,
      });
      return data.accessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  // Login function
  const login = async (token) => {
    try {
      if (!isTokenExpired(token)) {
        setAccessToken(token);
        const user = await fetchUserProfile(token);
        setAuthState({ isAuthenticated: true, user, loading: false });
        return true; // Successfully logged in
      } else {
        console.warn("Attempted login with an expired token.");
        return false; // Login failed - token expired
      }
    } catch (error) {
      console.error("Login error:", error);
      return false; // Login failed - error occurred
    }
  };

  // Logout function
  const logout = async () => {
    setAccessToken(null);
    setAuthState({ isAuthenticated: false, user: null, loading: false });
    try {
      await axiosInstance.get("/api/users/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Initialize authentication on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (accessToken && !isTokenExpired(accessToken)) {
          const user = await fetchUserProfile(accessToken);
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
          });
        } else {
          const newToken = await refreshAccessToken();
          setAccessToken(newToken);
          const user = await fetchUserProfile(newToken);
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Initialization error:", error);
        logout();
      }
    };
    initializeAuth();
  }, []);

  // Axios interceptors
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isTokenExpired(accessToken)
        ) {
          originalRequest._retry = true;
          try {
            const newToken = await refreshAccessToken();
            setAccessToken(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, resendVerification }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
