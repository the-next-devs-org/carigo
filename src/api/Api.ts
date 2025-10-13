import axios, { type AxiosResponse } from "axios";
import { BACKEND_API_ENDPOINT, xApiKey } from "./config";

type RequestParams = { [key: string]: any };
type RequestBody = { [key: string]: any };
type RequestHeaders = { [key: string]: string };

function handleInvalidTokenOrSession() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
}

export async function makeGetRequest(
  url: string,
  params?: RequestParams
): Promise<AxiosResponse<any>> {
  const fullUrl = ` ${BACKEND_API_ENDPOINT}${url}`;
  // console.log(Making API GET request to: ${fullUrl});

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "x-api-key": xApiKey,
  };

  if (token) {
    headers["token"] = `${token}`;
  }

  try {
    const response = await axios.get(fullUrl, {
      headers,
      params,
      validateStatus: function (status): boolean {
        return (status >= 200 && status < 300) || status === 304;
      },
    });
    return response;
  } catch (error: any) {
    // console.error(Error making GET request to ${fullUrl}, error);

    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "Invalid JWT token. Or session expired"
    ) {
      handleInvalidTokenOrSession();
    }
    throw error;
  }
}

export async function makePostRequest(
  url: string,
  body: RequestBody = {},
  contentType?: string
): Promise<AxiosResponse<any>> {
  const fullUrl = `${BACKEND_API_ENDPOINT}${url}`;
  // console.log(Making API POST request to: ${fullUrl});
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const headers: RequestHeaders = {
    "x-api-key": xApiKey,
  };

  if (body instanceof FormData) {
    // Let the browser set the Content-Type header for FormData
  } else {
    headers["Content-Type"] = contentType ? contentType : "application/json";
  }

  if (token) {
    headers["token"] = `${token}`;
  }

  try {
    const response = await axios.post(fullUrl, body, { headers });
    return response;
  } catch (error: any) {
    // console.error(Error making POST request to ${fullUrl}, error);

    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "Invalid JWT token. Or session expired"
    ) {
      handleInvalidTokenOrSession();
    }
    throw error;
  }
}

export async function makePutRequest(
  url: string,
  body: RequestBody = {},
  contentType: string = "application/json"
): Promise<AxiosResponse<any>> {
  const fullUrl = `${BACKEND_API_ENDPOINT}${url}`;
  // console.log(Making API PUT request to: ${fullUrl});
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const headers: RequestHeaders = {
    "Content-Type": contentType ? contentType : "application/json",
    "x-api-key": xApiKey,
  };

  if (token) {
    headers["token"] = `${token}`;
  }

  try {
    const response = await axios.put(fullUrl, body, { headers });
    return response;
  } catch (error: any) {
    // console.error(Error making PUT request to ${fullUrl}, error);

    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "Invalid JWT token. Or session expired"
    ) {
      handleInvalidTokenOrSession();
    }
    throw error;
  }
}

export async function makeDeleteRequest(
  url: string,
  body: RequestBody = {}
): Promise<AxiosResponse<any>> {
  const fullUrl = `${BACKEND_API_ENDPOINT}${url}`;
  // console.log(Making API DELETE request to: ${fullUrl});
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const headers: RequestHeaders = {
    "x-api-key": xApiKey,
  };

  if (token) {
    headers["token"] = `${token}`;
  }

  try {
    const response = await axios.delete(fullUrl, { headers, data: body });
    return response;
  } catch (error: any) {
    // console.error(Error making DELETE request to ${fullUrl}, error);

    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "Invalid JWT token. Or session expired"
    ) {
      handleInvalidTokenOrSession();
    }
    throw error;
  }
}
