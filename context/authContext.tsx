import api from "@/api/axios";
import { deleteItem, getItem, setItem } from "@/lib/tokenStorage";
import type { LoginResponse, User } from "@/lib/types";
import type { AxiosError, AxiosResponse } from "axios";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import type React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "606711045148-tcqcgtseatmv2a25o8eaf2blupcgdra3.apps.googleusercontent.com"
  });

  const getLoggedInUser = useCallback(async () => {
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
  }, [router]);

  const signInWithGoogle = async () => {
    await promptAsync();
  };

  const verifyGoogleSignIn = async (token: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response: AxiosResponse = await api.post("/auth/google", {
        token: token,
        clientType: "MOBILE"
      });
      if (response.status !== 200) return;

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

      console.log(error.response?.data);
      setError("Internal Server Error: ");
    } finally {
      setIsLoading(false);
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
    setError(null);

    router.replace("/auth/login");
  };

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (response?.type === "success") {
      console.log(request);
      const { authentication } = response;

      verifyGoogleSignIn(authentication?.idToken!);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, login, signInWithGoogle, logout, error, isLoading }}>
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
