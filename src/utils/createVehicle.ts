import { makePostRequest } from "../api/Api";

export async function createVehicle(payload: any) {
  try {
    const response = await makePostRequest("vehicles/createVehicle", payload);
    if (response.data.success) {
      return true; // Successfully created vehicle
    } else {
      console.log("Failed to create vehicle");
      return false;
    }
  } catch (err) {
    console.error("Error creating vehicle:", err);
    return false; // Error occurred while creating vehicle
  }
}
