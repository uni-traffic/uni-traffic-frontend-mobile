import { useCurrentUser } from "@/hooks/user/auth/useCurrentUser";
import { useGoogleSignIn } from "@/hooks/user/auth/useGoogleSignIn";
import { useLogOut } from "@/hooks/user/auth/useLogOut";
import { useLogin } from "@/hooks/user/auth/useLogin";
import { deleteItem, setItem } from "@/lib/tokenStorage";
import type { User, UserLoginResponse } from "@/lib/types";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import type React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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

  const [_, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "606711045148-tcqcgtseatmv2a25o8eaf2blupcgdra3.apps.googleusercontent.com"
  });

  const { data: fetchedCurrentUserData, error: getCurrentUserError } = useCurrentUser();
  const { mutate: verifyGoogleSignIn } = useGoogleSignIn();
  const { mutate: handleLogin, isPending: isLoading } = useLogin();
  const { mutate: logOutUser } = useLogOut();

  const setLoggedInUser = useCallback(async () => {
    if (!fetchedCurrentUserData || getCurrentUserError) {
      return;
    }

    setUser(fetchedCurrentUserData);
    router.replace(fetchedCurrentUserData.role === "SECURITY" ? "/security" : "/(user)");
  }, [fetchedCurrentUserData, getCurrentUserError, router]);

  useEffect(() => {
    setLoggedInUser();
  }, [setLoggedInUser]);

  const handleSuccessLogin = useCallback(
    async (responseData: UserLoginResponse) => {
      const { user, accessToken, appKey } = responseData;

      try {
        await Promise.all([
          setItem("AUTH_TOKEN", accessToken),
          setItem("RECOGNIZER_TOKEN", appKey)
        ]);

        setUser(user);
        router.replace(user.role === "SECURITY" ? "/security" : "/(user)");
      } catch {
        setError("Failed to save authentication tokens");
      }
    },
    [router]
  );

  const login = useCallback(
    async (username: string, password: string) => {
      if (!username || !password) {
        setError("Please provide both username and password");
        return;
      }

      setError(null);
      handleLogin(
        { username, password },
        {
          onSuccess: handleSuccessLogin,
          onError: (error) => setError(error.message)
        }
      );
    },
    [handleLogin, handleSuccessLogin]
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      await promptAsync();
    } catch {
      setError("Failed to initiate Google sign-in");
    }
  }, [promptAsync]);

  const logout = useCallback(async () => {
    logOutUser(null, {
      onSuccess: async () => {
        try {
          await Promise.all([deleteItem("AUTH_TOKEN"), deleteItem("RECOGNIZER_TOKEN")]);

          setUser(null);
          setError(null);
          router.replace("/auth/login");
        } catch {
          setError("Failed to clear authentication tokens");
        }
      },
      onError: () => setError("Something went wrong logging out")
    });
  }, [logOutUser, router]);

  const handleGoogleSignIn = useCallback(async () => {
    if (response?.type !== "success" || !response.authentication?.idToken) {
      return;
    }

    verifyGoogleSignIn(
      {
        token: response.authentication.idToken,
        clientType: "MOBILE"
      },
      {
        onSuccess: handleSuccessLogin,
        onError: () => setError("Google authentication failed")
      }
    );
  }, [response, verifyGoogleSignIn, handleSuccessLogin]);

  useEffect(() => {
    handleGoogleSignIn();
  }, [handleGoogleSignIn]);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      signInWithGoogle,
      logout,
      error,
      isLoading
    }),
    [user, login, signInWithGoogle, logout, error, isLoading]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
