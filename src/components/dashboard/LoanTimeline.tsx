import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  Clock, 
  User, 
  Building2, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { LoanData, TimelineEvent } from '../../hooks/useLoanData';
import { useLanguage } from '../../hooks/useLanguage';

interface LoanTimelineProps {
  loan: LoanData;
  onClose: () => void;
}

export const LoanTimeline: React.FC<LoanTimelineProps> = ({ loan, onClose }) => {
  const { t } = useLanguage();
  const getActorIcon = (actor: string) => {
    if (actor.includes('NBFC') || actor.includes('Finance')) {
      return <Building2 className="w-4 h-4" />;
    }
    if (actor === 'System') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <User className="w-4 h-4" />;
  };

  const getEventIcon = (toStage: string) => {
    switch (toStage) {
      case 'approved':
      case 'disbursed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'rejected':
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      default:
        return <Clock className="w-5 h-5 text-primary" />;
    }
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

  const formatStage = (stage: string) => {
    return stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t('applicationTimeline')} - {loan.applicationId}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {loan.timeline.map((event: TimelineEvent, index: number) => (
              <Card key={event.eventId} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Timeline indicator */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20">
                        {getEventIcon(event.toStage)}
                      </div>
                      {index < loan.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-border mt-2" />
                      )}
                    </div>

                    {/* Event content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {t(event.toStage)}
                          </Badge>
                          {event.fromStage && (
                            <span className="text-xs text-muted-foreground">
                              {t('from')} {t(event.fromStage)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(event.timestamp)}
                        </span>
                      </div>

                      <p className="text-sm text-foreground">
                        {event.notes}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {getActorIcon(event.actor)}
                        <span>Updated by: {event.actor}</span>
                      </div>

                      {event.attachments && event.attachments.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Attachments:</p>
                          {event.attachments.map((attachment, idx) => (
                            <a
                              key={idx}
                              href={attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline block"
                            >
                              Document {idx + 1}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Current status indicator */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t('currentStage')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('applicationCurrently')} <strong>{t(loan.stage)}</strong> {t('stage')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};