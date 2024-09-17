import {jwtDecode} from 'jwt-decode';

type TokenPayload = {
  user:Object;
  stage:string;
  role:string;
  // Add other fields as needed
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    return null;
  }
};
