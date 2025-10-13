import { makeGetRequest } from "../../../api/Api";

export const getRecentUsers = async () => {
  const response = await makeGetRequest("user/getRecentUsers");
  return response.data;
};
