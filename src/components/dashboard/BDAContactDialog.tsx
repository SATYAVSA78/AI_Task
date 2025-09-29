import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Phone, 
  Mail
} from 'lucide-react';
import { LoanData } from '../../hooks/useLoanData';
import { useLanguage } from '../../hooks/useLanguage';

interface BDAContactDialogProps {
  loan: LoanData;
  onClose: () => void;
}

export const BDAContactDialog: React.FC<BDAContactDialogProps> = ({ loan, onClose }) => {
  const { t } = useLanguage();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t('bdaContactDetails')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('name')}</p>
                  <p className="font-medium">{loan.bdaName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('phone')}</p>
                  <p className="font-medium">{loan.bdaPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('email')}</p>
                  <p className="font-medium">{loan.bdaEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => window.open(`tel:${loan.bdaPhone}`)}
              className="flex-1 gap-2"
            >
              <Phone className="w-4 h-4" />
              {t('call')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open(`mailto:${loan.bdaEmail}`)}
              className="flex-1 gap-2"
            >
              <Mail className="w-4 h-4" />
              {t('email')}
            </Button>
          </div>

          <Button variant="outline" onClick={onClose} className="w-full">
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};