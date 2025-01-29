import { jwtStorage } from "../storage/userStorage.js";

const API_URL = "http://localhost:3000/cars";

export const getAllNoUsersCars = async () => {
  try {
    const response = await fetch(`${API_URL}/no-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtStorage.value}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const cars = await response.json();
    console.log(cars);
    return cars;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsersCars = async () => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtStorage.value}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const createCar = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtStorage.value}`,
          }
      });
      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
        return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
