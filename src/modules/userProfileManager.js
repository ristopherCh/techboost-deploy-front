import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "techboostappserver.azurewebsites.net/api/userprofile";

export const getUser = (userId) => {
  return getToken().then((token) => {
    const fetchUrl = `${_apiUrl}/details/${userId}`;
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
          "An unknown error occurred while trying to fetch a user profile."
        );
      }
    });
  });
};

export const getAllUsers = () => {
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
          "An unknown error occurred while trying to fetch all user profiles."
        );
      }
    });
  });
};