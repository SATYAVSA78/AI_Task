import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Shield, Phone } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/use-toast';

interface LoginFormProps {
  onOTPSent: (mobile: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOTPSent }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { requestOTP } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobileNumber || mobileNumber.length < 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit mobile number',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const formattedNumber = mobileNumber.startsWith('+91') ? mobileNumber : `+91${mobileNumber}`;
      await requestOTP(formattedNumber);
      toast({
        title: 'OTP Sent',
        description: 'Please check your phone for the verification code',
      });
      onOTPSent(formattedNumber);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send OTP. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-success/5">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Loan Portal</h1>
          <p className="text-muted-foreground">Secure access to your loan details</p>
        </div>

        <Card className="shadow-lg border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your registered mobile number to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  OTP valid for 5 minutes. 5 attempts allowed.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary-hover transition-all duration-300"
                disabled={isLoading || !mobileNumber}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>By continuing, you agree to our Terms of Service</p>
              <p>Need help? Contact support at support@loanportal.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};