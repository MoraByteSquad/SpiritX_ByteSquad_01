import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username?: string; // Adjust based on your token structure
  exp?: number; // Expiry time
}

export const getUsernameFromToken = (): string | null => {
  const token = sessionStorage.getItem('token'); // Retrieve token

  if (!token) return null; // No token found

  try {
    const decoded: JwtPayload = jwtDecode(token);
    
    // Check if the token has expired
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      console.error('Token has expired');
      return null;
    }

    return decoded.username || 'Guest'; // Default to 'Guest' if username is missing
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
