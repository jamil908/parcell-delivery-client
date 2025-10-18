import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '@/utils/helpers';
import { useGetMeQuery } from '@/redux/api/userApi';
import { setCredentials } from '@/redux/features/authSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const token = getToken() || ''; // ✅ always a string

  const { data, isSuccess, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setCredentials({
          user: data.user,
          tokens: {
            accessToken: token,
            refreshToken: '',
          },
        })
      );
    }
  }, [isSuccess, data, token, dispatch]);

  if (isLoading && token) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading user...</p>
      </div>
    );
  }

  return <>{children}</>;
}
