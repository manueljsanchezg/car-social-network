const API_URL = "http://localhost:3000/users";

export const registerUser = async (userData) => {
  try {
    const requestBody = JSON.stringify(userData);
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
    if (!response.ok) {
      const error = await response.json();
      switch(response.status) {
        case 400: 
          return { success: false, message: "The user already exists" };
        default:
          return { success: false, message: error};
      }
    }
    //alert("User created succesfully");
    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message || "Error" };
  }
};

export const loginUser = async (userData) => {
  try {
    const requestBody = JSON.stringify(userData);
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
    if (!response.ok) {
      const error = await response.json();
      switch(response.status) {
        case 401: 
          return { success: false, message: "Invalid credentials" };
        case 404: 
          return { success: false, message: "User not found" };
        default:
          return { success: false, message: error};
      }
    }
    const data = await response.json();
    return { success: true, ...data};
  } catch (error) {
    return { success: false, message: error.message || "Error" };
  }
};
