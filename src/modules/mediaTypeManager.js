import "firebase/auth";
import { getToken } from "./authManager";

// const _apiUrl = "https://localhost:5001/api/mediaType";
const _apiUrl = "https://techboostappserver.azurewebsites.net/api/mediaType";

export const getAllMediaTypes = () => {
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
          "An unknown error occurred while trying to fetch all media types."
        );
      }
    });
  });
};

export const getMediaType = (mediaTypeId) => {
  return getToken().then((token) => {
    const fetchUrl = `${_apiUrl}/${mediaTypeId}`;
    return fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  });
};
