export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  iat?: number; // issued at
  exp?: number; // expiration time
}
