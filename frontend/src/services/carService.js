import { jwtStorage } from "../storage/userStorage.js";

const API_URL = "http://localhost:3000/cars";

export const getAllNoUsersCars = async (type = "all") => {
  try {
    const response = await fetch(`${API_URL}?type=${type}`, {
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
    return cars;
  } catch (error) {
    console.error(error);
  }
};

export const createCar = async (carData) => {
    try {
      const requestBody = JSON.stringify(carData);
      console.log(requestBody);
      const response = await fetch(`${API_URL}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtStorage.value}`,
          },
          body: requestBody
      });
      if (!response.ok) {
          const error = await response.json();
          return { success: false, message: error};
        }
      const carCrated = await response.json(); 
      return { success: true, ...carCrated};
    } catch (error) {
      console.error(error);
    }
  };
