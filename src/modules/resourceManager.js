import "firebase/auth";
import { getToken } from "./authManager";

// const _apiUrl = "https://techboostappserver.azurewebsites.net/api/resource";
const _apiUrl = `${process.env.REACT_APP_API_BASE_URL}api/resource`;

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

export const getResourcesByMediaType = (mediaType) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/mediaType/${mediaType}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch resources by media type."
        );
      }
    });
  });
};

export const getResourcesBySubject = (subject) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/subject/${subject}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch resources by subject."
        );
      }
    });
  });
};

export const getResourcesByCreator = (creator) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/creator/${creator}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch resources by creator."
        );
      }
    });
  });
};

export const getResourcesByUserId = (userId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch resources by userId."
        );
      }
    });
  });
};

export const searchResources = (searchTerm) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/search/${searchTerm}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch resources by search term."
        );
      }
    });
  });
};

export const addResource = (resource) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to create a new resource."
        );
      }
    });
  });
};

export const editResource = (resource) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });
  });
};

export const deleteResource = (id) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  });
};
