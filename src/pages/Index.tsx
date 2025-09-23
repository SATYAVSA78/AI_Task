import { AuthProvider } from '../hooks/useAuth';
import { LoanPortal } from '../components/LoanPortal';

const Index = () => {
  return (
    <AuthProvider>
      <LoanPortal />
    </AuthProvider>
  );
};

export default Index;
