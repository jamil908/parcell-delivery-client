
import { useAppSelector } from '@/redux/hooks';
import type { IUser } from '@/types/user.types';

interface UseAuthReturn {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSender: boolean;
  isReceiver: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    isAdmin: user?.role === 'admin',
    isSender: user?.role === 'sender',
    isReceiver: user?.role === 'receiver',
  };
};

