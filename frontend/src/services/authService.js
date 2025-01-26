import { jwtStorage } from "../storage/userStorage.js";

const API_URL ="http://localhost:3000/auth";

export const validateToken = async () => {
  try {
    const response = await fetch(`${API_URL}/validate-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtStorage.value}`,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.valid) {
        return true;
      } else {
        return false;
      }
    } else {
      console.error("Token error");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
