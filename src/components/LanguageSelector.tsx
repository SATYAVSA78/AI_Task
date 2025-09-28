import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Languages } from 'lucide-react';
import { useLanguage, Language } from '../hooks/useLanguage';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'english', nativeName: 'English' },
    { code: 'te', name: 'telugu', nativeName: 'తెలుగు' },
    { code: 'hi', name: 'hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'tamil', nativeName: 'தமிழ்' },
    { code: 'ml', name: 'malayalam', nativeName: 'മലയാളം' },
    { code: 'kn', name: 'kannada', nativeName: 'ಕನ್ನಡ' }
  ];

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5" />
            {t('chooseLanguage')}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-2 py-4">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "default" : "outline"}
              className="justify-start h-12 text-left"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-xs text-muted-foreground">{t(lang.name)}</span>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};