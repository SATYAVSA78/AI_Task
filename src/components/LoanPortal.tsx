import React, { useState } from 'react';import { PhoneAccess } from './PhoneAccess';
import { Dashboard } from './dashboard/Dashboard';
import { useLoanData } from '../hooks/useLoanData';

export const LoanPortal = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  
  // Mock user data based on mobile number
  const mockUser = mobileNumber ? {
    mobileNumber,
    name: 'Jane Doe',
    applicationIds: ['A123']
  } : null;

  const handleAccess = (mobile: string) => {
    setMobileNumber(mobile);
    setShowDashboard(true);
  };

  if (showDashboard && mockUser) {
    return <Dashboard user={mockUser} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <PhoneAccess onAccess={handleAccess} />
    </div>
  );
};