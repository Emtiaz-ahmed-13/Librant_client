import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  try {
    console.log("Token to decode:", token);
    const decoded = jwtDecode(token);
    console.log("Successfully decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
};
