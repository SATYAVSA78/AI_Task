import React, { useState } from 'react';
import { LoginForm } from './auth/LoginForm';
import { OTPForm } from './auth/OTPForm';
import { Dashboard } from './dashboard/Dashboard';
import { useAuth } from '../hooks/useAuth';

export const LoanPortal = () => {
  const { user, isAuthenticated } = useAuth();
  const [authStep, setAuthStep] = useState<'login' | 'otp' | 'authenticated'>('login');
  const [mobileNumber, setMobileNumber] = useState('');

  if (isAuthenticated) {
    return <Dashboard user={user} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {authStep === 'login' && (
        <LoginForm 
          onOTPSent={(mobile) => {
            setMobileNumber(mobile);
            setAuthStep('otp');
          }}
        />
      )}
      
      {authStep === 'otp' && (
        <OTPForm 
          mobileNumber={mobileNumber}
          onVerified={() => setAuthStep('authenticated')}
          onBackToLogin={() => setAuthStep('login')}
        />
      )}
    </div>
  );
};