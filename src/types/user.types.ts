
export type TUserRole = 'admin' | 'sender' | 'receiver' | 'customer';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TUserRole;
  isBlocked: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;

  data: {
    user: IUser;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface IUpdateRolePayload {
  role: TUserRole;
}

export interface IUpdateBlockStatusPayload {
  isBlocked: boolean;
}

export interface IGetMeResponse {
  success: boolean;
  message?: string; // message might not be present on success
  user: IUser; // <-- User object is directly here
  // Note: Tokens are usually NOT returned by a 'getMe' endpoint, only on login.
}