import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "techboostappserver.azurewebsites.net/api/subject";

export const getAllSubjects = () => {
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
          "An unknown error occurred while trying to fetch all subjects."
        );
      }
    });
  });
};

export const getSubject = (subjectId) => {
  return getToken().then((token) => {
    const fetchUrl = `${_apiUrl}/${subjectId}`;
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
          "An unknown error occurred while trying to fetch a subject."
        );
      }
    });
  });
};

export const addResourceSubject = (subject) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to create a new subject."
        );
      }
    });
  });
};

export const deleteResourceSubject = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};