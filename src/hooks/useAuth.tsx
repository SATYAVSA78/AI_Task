import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  mobileNumber: string;
  name: string;
  applicationIds: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  requestOTP: (mobile: string) => Promise<{ txId: string; retryAfterSec: number }>;
  verifyOTP: (txId: string, otp: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const requestOTP = async (mobile: string): Promise<{ txId: string; retryAfterSec: number }> => {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      txId: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      retryAfterSec: 60
    };
  };

  const verifyOTP = async (txId: string, otp: string): Promise<User> => {
    // Mock implementation - in real app, this would verify with backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (otp === '123456') {
      const mockUser: User = {
        mobileNumber: '+919876543210',
        name: 'Jane Doe',
        applicationIds: ['A123']
      };
      login(mockUser);
      return mockUser;
    } else {
      throw new Error('Invalid OTP');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      requestOTP,
      verifyOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};