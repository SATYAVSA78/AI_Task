import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, Loader2, Shield, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/use-toast';

interface OTPFormProps {
  mobileNumber: string;
  onVerified: () => void;
  onBackToLogin: () => void;
}

export const OTPForm: React.FC<OTPFormProps> = ({ 
  mobileNumber, 
  onVerified, 
  onBackToLogin 
}) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [attempts, setAttempts] = useState(0);
  const { verifyOTP, requestOTP } = useAuth();
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the complete 6-digit OTP',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await verifyOTP('mock-tx-id', otp);
      toast({
        title: 'Success!',
        description: 'Login successful. Welcome to your dashboard.',
      });
      onVerified();
    } catch (error) {
      setAttempts(prev => prev + 1);
      
      if (attempts >= 4) {
        toast({
          title: 'Account Temporarily Locked',
          description: 'Too many failed attempts. Please try again after 15 minutes or contact support.',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Invalid OTP',
          description: `Incorrect OTP. ${5 - attempts - 1} attempts remaining.`,
          variant: 'destructive'
        });
      }
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await requestOTP(mobileNumber);
      setTimeLeft(300);
      setOtp('');
      toast({
        title: 'OTP Resent',
        description: 'A new OTP has been sent to your phone',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resend OTP. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const maskedNumber = mobileNumber.replace(/(\+91)(\d{2})(\d{4})(\d{4})/, '$1 $2••••$4');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-success/5">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Verify OTP</h1>
          <p className="text-muted-foreground">Enter the 6-digit code sent to {maskedNumber}</p>
        </div>

        <Card className="shadow-lg border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Enter Verification Code</CardTitle>
            <CardDescription className="text-center flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              Time remaining: {formatTime(timeLeft)}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                onComplete={handleVerifyOTP}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleVerifyOTP}
                className="w-full h-11 bg-primary hover:bg-primary-hover transition-all duration-300"
                disabled={isLoading || otp.length !== 6 || attempts >= 5}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </Button>

              <div className="flex justify-between items-center text-sm">
                <Button 
                  variant="ghost" 
                  onClick={onBackToLogin}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={handleResendOTP}
                  disabled={timeLeft > 0}
                  className="text-primary hover:text-primary-hover"
                >
                  {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : 'Resend OTP'}
                </Button>
              </div>
            </div>

            {attempts > 0 && (
              <div className="text-center text-sm text-warning">
                {attempts >= 5 ? (
                  <p className="text-danger">Account locked. Contact support: +91-9999999999</p>
                ) : (
                  <p>Attempts remaining: {5 - attempts}</p>
                )}
              </div>
            )}

            <div className="text-center text-xs text-muted-foreground">
              <p>Didn't receive the code? Check your SMS or try resending</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};