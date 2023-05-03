import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "/api/resource";

export const getResource = (resourceId) => {
  return getToken().then((token) => {
    const fetchUrl = `${_apiUrl}/details/${resourceId}`;
    return fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch a resource."
        );
      }
    });
  });
};

export const getAllResources = () => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch all resources."
        );
      }
    });
  });
};