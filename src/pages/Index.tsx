import { LanguageProvider } from '../hooks/useLanguage';
import { LoanPortal } from '../components/LoanPortal';

const Index = () => {
  return (
    <LanguageProvider>
      <LoanPortal />
    </LanguageProvider>
  );
};

export default Index;
