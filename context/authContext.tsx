import api from "@/api/axios";
import { deleteItem, getItem, setItem } from "@/lib/tokenStorage";
import type { LoginResponse, User } from "@/lib/types";
import type { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import type React from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLoggedInUser = async () => {
    const token = await getItem("AUTH_TOKEN");
    if (!token) {
      return;
    }

    try {
      const response: AxiosResponse = await api.get("/user/me");

      if (response.status !== 200) {
        return;
      }

      setUser(response.data);

      if (response.data.role === "SECURITY") {
        router.replace("/security");
        return;
      }

      router.replace("/(user)");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (username: string, password: string) => {
    setError(null);
    if (username.length < 5 || password.length < 3) {
      setError("Provide username or password");
      return;
    }

    try {
      setIsLoading(true);

      const response: AxiosResponse = await api.post("/auth/login", {
        username,
        password
      });
      if (response.status !== 200) {
        setError("Unknown response");
        return;
      }

      const { user, accessToken, appKey }: LoginResponse = response.data;

      setUser(user);
      await setItem("AUTH_TOKEN", accessToken);
      await setItem("RECOGNIZER_TOKEN", appKey);

      if (user.role === "SECURITY") {
        router.replace("/security");
        return;
      }

      router.replace("/(user)");
    } catch (err) {
      const error = err as AxiosError;

      if (error.status === 401) {
        setError("Invalid login, please try again");
        setUser(null);
        return;
      }

      setError("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await deleteItem("AUTH_TOKEN");
    await deleteItem("RECOGNIZER_TOKEN");
    setUser(null);

    router.replace("/auth/login");
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, isLoading }}>
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
