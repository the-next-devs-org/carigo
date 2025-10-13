import { makeGetRequest } from "../api/Api";

export async function getVehicle(registrationNumber: string) {
  try {
    const response = await makeGetRequest(
      `vehicles/getVehicleByRegistrationNumber/${registrationNumber}`
    );

    if (response.data) {
      return response.data;
    } else {
      console.log(`Failed to vehicle ${registrationNumber} data`);
      return null;
    }
  } catch (err) {
    console.error("Error fetching agreement:", err);
    return null;
  }
}
