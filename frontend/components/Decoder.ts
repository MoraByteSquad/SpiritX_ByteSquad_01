import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username?: string; // Adjust based on your token structure
  exp?: number; // Expiry time
}

export const getUsernameFromToken = (): string | null => {
  const token = sessionStorage.getItem('token');
  console.log('name:', );

  if (!token) {
    console.error('No token found in sessionStorage');
    return null; // No token found
  }

  // Check if the token has the correct format
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.error('Invalid token format');
    return null;
  }

  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    console.log('Decoded:', decoded);
    return decoded.username || null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
