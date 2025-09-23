import { useState, useEffect } from 'react';

export interface LoanData {
  applicationId: string;
  studentName: string;
  coApplicantName: string;
  mobileNumber: string;
  nbfcName: string;
  loanAmount: number;
  tenureMonths: number;
  appliedAt: string;
  processingFee: number;
  disbursedAt: string | null;
  rateOfInterest: number;
  courseAccess: boolean;
  firstEmiDate: string;
  courseName: string;
  downPaymentAt: string;
  stage: string;
  rejectionReason: string | null;
  bdaName: string;
  bdaPhone: string;
  bdaEmail: string;
  requestedDocs: string[];
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  eventId: string;
  applicationId: string;
  fromStage: string;
  toStage: string;
  actor: string;
  timestamp: string;
  notes: string;
  attachments: string[];
}

export const useLoanData = (applicationIds: string[]) => {
  const [loans, setLoans] = useState<LoanData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API call - in real app, this would fetch from backend
    const fetchLoans = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockLoanData: LoanData = {
        applicationId: 'A123',
        studentName: 'John Doe',
        coApplicantName: 'Jane Doe',
        mobileNumber: '+919876543210',
        nbfcName: 'SecureFinance NBFC',
        loanAmount: 450000,
        tenureMonths: 36,
        appliedAt: '2025-08-01T10:00:00+05:30',
        processingFee: 2000,
        disbursedAt: null,
        rateOfInterest: 12.5,
        courseAccess: true,
        firstEmiDate: '2025-10-01',
        courseName: 'Advanced Data Science & AI',
        downPaymentAt: '2025-07-31T09:30:00+05:30',
        stage: 'under_review',
        rejectionReason: null,
        bdaName: 'Ravi Sharma',
        bdaPhone: '+919812345678',
        bdaEmail: 'ravi@bda.com',
        requestedDocs: [],
        timeline: [
          {
            eventId: 'ev-001',
            applicationId: 'A123',
            fromStage: '',
            toStage: 'application_created',
            actor: 'System',
            timestamp: '2025-08-01T10:00:00+05:30',
            notes: 'Application submitted successfully',
            attachments: []
          },
          {
            eventId: 'ev-002',
            applicationId: 'A123',
            fromStage: 'application_created',
            toStage: 'consent_pending',
            actor: 'System',
            timestamp: '2025-08-01T10:05:00+05:30',
            notes: 'Waiting for student consent',
            attachments: []
          },
          {
            eventId: 'ev-003',
            applicationId: 'A123',
            fromStage: 'consent_pending',
            toStage: 'under_review',
            actor: 'SecureFinance NBFC',
            timestamp: '2025-08-02T14:30:00+05:30',
            notes: 'Application under review by NBFC team',
            attachments: []
          }
        ]
      };

      setLoans([mockLoanData]);
      setIsLoading(false);
    };

    if (applicationIds.length > 0) {
      fetchLoans();
    } else {
      setIsLoading(false);
    }
  }, [applicationIds]);

  return { loans, isLoading };
};