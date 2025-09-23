import React, { useState, useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Phone,
  Mail,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { LoanData } from '../../hooks/useLoanData';

interface ChatBotProps {
  loan: LoanData;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isEscalation?: boolean;
}

export const ChatBot: React.FC<ChatBotProps> = ({ loan, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: `Hi! I'm here to help you with your loan application ${loan.applicationId}. You can ask me about your application status, required documents, timeline, or any other questions about your loan.`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Quick suggestion buttons
  const quickSuggestions = [
    "What's my current status?",
    "When will my loan be approved?",
    "What documents do I need?",
    "How do I contact my BDA?",
    "What's my loan amount?",
    "When is my first EMI due?"
  ];

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const messageLower = userMessage.toLowerCase();

    // Mock FAQ responses based on loan data
    if (messageLower.includes('status') || messageLower.includes('current')) {
      return `Your loan application ${loan.applicationId} is currently in "${loan.stage.replace(/_/g, ' ')}" stage. ${
        loan.stage === 'under_review' ? 'Our team is reviewing your application and you should hear back within 3-5 business days.' :
        loan.stage === 'approved' ? 'Congratulations! Your loan has been approved. Disbursement will happen soon.' :
        loan.stage === 'additional_document_needed' ? 'We need additional documents from you. Please check the upload section in your dashboard.' :
        'We\'ll keep you updated as your application progresses.'
      }`;
    }

    if (messageLower.includes('amount') || messageLower.includes('loan amount')) {
      return `Your loan amount is ₹${loan.loanAmount.toLocaleString('en-IN')} for a tenure of ${loan.tenureMonths} months at ${loan.rateOfInterest}% interest rate.`;
    }

    if (messageLower.includes('document') || messageLower.includes('upload')) {
      const docs = loan.requestedDocs.length > 0 ? loan.requestedDocs.join(', ') : 'Identity proof, Income proof, Bank statements';
      return `For your application, you need to upload: ${docs}. You can upload these documents through the "Upload Documents" section in your dashboard.`;
    }

    if (messageLower.includes('bda') || messageLower.includes('contact')) {
      return `Your assigned BDA is ${loan.bdaName}. You can reach them at:
      📞 Phone: ${loan.bdaPhone}
      📧 Email: ${loan.bdaEmail}
      
      They are available Monday to Friday, 9 AM to 6 PM.`;
    }

    if (messageLower.includes('emi') || messageLower.includes('repayment')) {
      return `Your first EMI is scheduled for ${new Date(loan.firstEmiDate).toLocaleDateString('en-IN')}. The EMI amount will be calculated based on your loan amount of ₹${loan.loanAmount.toLocaleString('en-IN')} and ${loan.tenureMonths} months tenure.`;
    }

    if (messageLower.includes('course') || messageLower.includes('access')) {
      return `Course access status: ${loan.courseAccess ? 'Granted' : 'Pending'}. You are enrolled in "${loan.courseName}". ${
        loan.courseAccess ? 'You can access your course materials now.' : 'Course access will be granted once your loan is approved.'
      }`;
    }

    if (messageLower.includes('timeline') || messageLower.includes('history')) {
      return `Your application was submitted on ${new Date(loan.appliedAt).toLocaleDateString('en-IN')}. You can view the complete timeline with all updates in the "Timeline" section of your dashboard.`;
    }

    // Simulate inability to answer after multiple attempts
    if (failedAttempts >= 2) {
      setFailedAttempts(0);
      return null; // This will trigger escalation
    }

    setFailedAttempts(prev => prev + 1);
    return `I'm sorry, I don't have specific information about that. Could you please rephrase your question or try asking about your application status, required documents, or contact details?`;
  };

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botResponse = await generateBotResponse(messageContent);
      
      if (botResponse === null) {
        // Trigger escalation
        const escalationMessage: Message = {
          id: `escalation_${Date.now()}`,
          content: `I wasn't able to resolve your query. Would you like me to connect you with your BDA ${loan.bdaName} for personalized assistance?`,
          sender: 'bot',
          timestamp: new Date(),
          isEscalation: true
        };
        setMessages(prev => [...prev, escalationMessage]);
      } else {
        const botMessage: Message = {
          id: `bot_${Date.now()}`,
          content: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEscalation = () => {
    // Mock escalation - in real app, this would create a ticket
    const ticketId = `T-${Date.now()}`;
    
    toast({
      title: 'Escalated to BDA',
      description: `Ticket ${ticketId} created. Your BDA will contact you within 24 hours.`,
    });

    const escalationConfirm: Message = {
      id: `confirm_${Date.now()}`,
      content: `I've created ticket ${ticketId} and notified your BDA ${loan.bdaName}. They will contact you within 24 hours at ${loan.mobileNumber}. You can also reach them directly at ${loan.bdaPhone}.`,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, escalationConfirm]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            AI Assistant - Loan Support
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[70vh]">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                    <Card className={`${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-card'
                    }`}>
                      <CardContent className="p-3">
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Escalation options */}
                    {message.isEscalation && (
                      <div className="mt-2 space-y-2">
                        <Button 
                          onClick={handleEscalation}
                          variant="outline" 
                          size="sm"
                          className="w-full gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          Connect with BDA
                        </Button>
                        
                        <Card className="p-3 bg-muted/50">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-2 font-medium">
                              <User className="w-4 h-4" />
                              {loan.bdaName}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {loan.bdaPhone}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              {loan.bdaEmail}
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <Card className="bg-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm font-medium mb-3">Quick suggestions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-left justify-start h-auto py-2 px-3"
                  >
                    <span className="text-xs">{suggestion}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Message Input */}
          <div className="p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage(inputMessage)}
                disabled={isLoading || !inputMessage.trim()}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ask me about your loan status, documents, timeline, or contact information
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};