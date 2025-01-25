
const API_URL = "http://localhost:3000/users"

export const registerUser = async (userData) => {
    console.log(userData);
    const requestBody = JSON.stringify(userData);
    console.log(requestBody);
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: requestBody
    });
    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return await response.json();
}

export const loginUser = async (userData) => {
    console.log(userData);
    const requestBody = JSON.stringify(userData);
    console.log(requestBody);
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: requestBody
    });
    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return await response.json();
}