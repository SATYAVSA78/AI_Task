import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Building2, 
  IndianRupee, 
  Calendar, 
  Clock, 
  FileText, 
  MessageCircle, 
  Phone,
  CheckCircle,
  AlertCircle,
  Clock3,
  XCircle,
  ChevronRight,
  Upload,
  History
} from 'lucide-react';
import { LoanTimeline } from './LoanTimeline';
import { DocumentUpload } from './DocumentUpload';
import { ChatBot } from './ChatBot';
import { useLoanData } from '../../hooks/useLoanData';

interface User {
  mobileNumber: string;
  name: string;
  applicationIds: string[];
}

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeModal, setActiveModal] = useState<'timeline' | 'upload' | 'chat' | null>(null);
  const { loans, isLoading } = useLoanData(user.applicationIds);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your loan details...</p>
        </div>
      </div>
    );
  }

  const loan = loans[0]; // For MVP, showing first loan

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Loans Found</h3>
            <p className="text-muted-foreground">
              No loan applications are associated with your account.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'approved':
      case 'disbursed':
        return 'bg-status-approved text-status-approved';
      case 'rejected':
        return 'bg-status-rejected text-status-rejected';
      case 'additional_document_needed':
        return 'bg-status-pending text-status-pending';
      default:
        return 'bg-status-review text-status-review';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'approved':
      case 'disbursed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'additional_document_needed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock3 className="w-4 h-4" />;
    }
  };

  const getStageProgress = (stage: string) => {
    const stageMap = {
      'application_created': 10,
      'consent_pending': 25,
      'under_review': 50,
      'additional_document_needed': 60,
      'additional_documents_submitted': 70,
      'approved': 90,
      'disbursed': 100,
      'rejected': 0
    };
    return stageMap[stage as keyof typeof stageMap] || 0;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Loan Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveModal('chat')}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Help
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Loan Summary Card */}
        <Card className="shadow-lg border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {loan.nbfcName}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                ID: {loan.applicationId}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Status and Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStageIcon(loan.stage)}
                  <span className="font-medium">Current Status</span>
                </div>
                <Badge className={`${getStageColor(loan.stage)} border-0`}>
                  {loan.stage.replace(/_/g, ' ').toUpperCase()}
                </Badge>
              </div>
              
              <Progress 
                value={getStageProgress(loan.stage)} 
                className="h-2"
              />
              
              {loan.rejectionReason && (
                <div className="p-3 rounded-lg bg-status-rejected-bg border border-status-rejected/20">
                  <p className="text-sm text-status-rejected font-medium">Rejection Reason:</p>
                  <p className="text-sm text-status-rejected/80">{loan.rejectionReason}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Loan Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Student</p>
                    <p className="font-medium">{loan.studentName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <IndianRupee className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="font-medium text-lg">{formatCurrency(loan.loanAmount)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tenure</p>
                    <p className="font-medium">{loan.tenureMonths} months</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Applied On</p>
                    <p className="font-medium">{formatDate(loan.appliedAt)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Course</p>
                    <p className="font-medium">{loan.courseName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Course Access</p>
                    <Badge variant={loan.courseAccess ? "default" : "secondary"}>
                      {loan.courseAccess ? "Granted" : "Pending"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <IndianRupee className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Processing Fee</p>
                    <p className="font-medium">
                      {loan.processingFee ? formatCurrency(loan.processingFee) : '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">First EMI Date</p>
                    <p className="font-medium">
                      {loan.firstEmiDate ? new Date(loan.firstEmiDate).toLocaleDateString('en-IN') : '—'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                onClick={() => setActiveModal('timeline')}
                className="justify-between h-12"
              >
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Timeline
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Button 
                variant="outline" 
                onClick={() => setActiveModal('upload')}
                disabled={loan.stage !== 'additional_document_needed'}
                className="justify-between h-12"
              >
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Docs
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Button 
                variant="outline" 
                onClick={() => window.open(`tel:${loan.bdaPhone}`)}
                className="justify-between h-12"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact BDA
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Button 
                variant="outline" 
                onClick={() => setActiveModal('chat')}
                className="justify-between h-12"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Ask AI
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{formatCurrency(loan.loanAmount)}</div>
              <div className="text-sm text-muted-foreground">Total Amount</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{loan.tenureMonths}</div>
              <div className="text-sm text-muted-foreground">Months Tenure</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{loan.rateOfInterest}%</div>
              <div className="text-sm text-muted-foreground">Interest Rate</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {getStageProgress(loan.stage)}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modals */}
      {activeModal === 'timeline' && (
        <LoanTimeline 
          loan={loan} 
          onClose={() => setActiveModal(null)} 
        />
      )}
      
      {activeModal === 'upload' && (
        <DocumentUpload 
          loan={loan} 
          onClose={() => setActiveModal(null)} 
        />
      )}
      
      {activeModal === 'chat' && (
        <ChatBot 
          loan={loan} 
          onClose={() => setActiveModal(null)} 
        />
      )}
    </div>
  );
};