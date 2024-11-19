"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  signup,
  login,
  logout,
  isAuthenticated,
  confirmRegistrationEmail,
  changePassword,
  loginWithGoogle,
  requestPasswordReset,
  confirmPasswordResetEmail,
  resetPassword,
} from "@/services/authService";
import { getUserInfo } from "@/services/userService";
import {
  ChangePasswordFormData,
  LoginFormData,
  PasswordResetFormData,
  PasswordResetRequest,
  SignupFormData,
} from "@/types/form";
import { User } from "@/types/user";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signup: (data: SignupFormData) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => void;
  confirmRegistrationEmail: (token: string) => Promise<string>;
  confirmPasswordResetEmail: (token: string) => Promise<string>;
  changePassword: (data: ChangePasswordFormData) => Promise<void>;
  requestPasswordReset: (data: PasswordResetRequest) => Promise<void>;
  resetPassword: (data: PasswordResetFormData) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const isAuth = await isAuthenticated();
      setIsAuthenticatedState(isAuth);

      if (isAuth) {
        try {
          const userInfo = await getUserInfo();
          setUser(userInfo);
        } catch (error) {
          console.error("Error in fetching user info:", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const handleSignup = useCallback(async (data: SignupFormData) => {
    await signup(data);
    setIsAuthenticatedState(true);
  }, []);

  const handleLogin = useCallback(async (data: LoginFormData) => {
    await login(data);
    setIsAuthenticatedState(true);
    const userInfo = await getUserInfo();
    setUser(userInfo);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsAuthenticatedState(false);
    setUser(null);
  }, []);

  const handleConfirmRegistrationEmail = useCallback(async (token: string) => {
    const res = await confirmRegistrationEmail(token);
    const userInfo = await getUserInfo();
    setUser(userInfo);
    setIsAuthenticatedState(true);
    return res;
  }, []);

  const handleConfirmPasswordResetEmail = useCallback(async (token: string) => {
    return await confirmPasswordResetEmail(token);
  }, []);

  const handleChangePassword = useCallback(
    async (data: ChangePasswordFormData) => {
      await changePassword(data);
    },
    []
  );

  const handleRequestPasswordReset = useCallback(
    async (data: PasswordResetRequest) => {
      await requestPasswordReset(data);
    },
    []
  );

  const handleResetPassword = useCallback(
    async (data: PasswordResetFormData) => {
      await resetPassword(data);
    },
    []
  );

  const handleLoginWithGoogle = useCallback(async () => {
    await loginWithGoogle();
    const userInfo = await getUserInfo();
    setUser(userInfo);
    setIsAuthenticatedState(true);
  }, []);

  const value = {
    isAuthenticated: isAuthenticatedState,
    isLoading,
    user,
    signup: handleSignup,
    login: handleLogin,
    logout: handleLogout,
    confirmRegistrationEmail: handleConfirmRegistrationEmail,
    confirmPasswordResetEmail: handleConfirmPasswordResetEmail,
    changePassword: handleChangePassword,
    requestPasswordReset: handleRequestPasswordReset,
    resetPassword: handleResetPassword,
    loginWithGoogle: handleLoginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
