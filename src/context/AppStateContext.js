import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  // Track if user is logged in
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Track if OTP is verified
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const [hasShownLocationSheet, setHasShownLocationSheet] = useState(false);

  // Functions to update login / OTP state
  const login = () => setIsSignedIn(true);
  const logout = () => {
    setIsSignedIn(false);
    setIsOTPVerified(false);
  };
  const verifyOTP = () => setIsOTPVerified(true);

  return (
    <AppStateContext.Provider
      value={{
        isSignedIn,
        login,
        logout,
        isOTPVerified,
        verifyOTP,
        hasShownLocationSheet,
        setHasShownLocationSheet,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
