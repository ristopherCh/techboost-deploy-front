import "firebase/auth";
import { getToken } from "./authManager";

// const _apiUrl = "https://techboostappserver.azurewebsites.net/api/review";
const _apiUrl = `${process.env.REACT_APP_API_BASE_URL}api/review`;

export const addReview = (reviewObj) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewObj),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to post a review."
        );
      }
    });
  });
};

export const addReviewLike = (reviewLikeObj) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/reviewLike`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewLikeObj),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to like a review."
        );
      }
    });
  });
};

export const editReview = (reviewObj, reviewId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${reviewId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewObj),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to post a review."
        );
      }
    });
  });
};

export const getReviewsByResourceId = (resourceId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/getByResourceId/${resourceId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch reviews by resource id."
        );
      }
    });
  });
};

export const getReviewsByUserId = (userId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/getByUserId/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch reviews by user id."
        );
      }
    });
  });
};

export const getReviewByResourceIdAndUser = (resourceId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/getByResourceIdAndUser/${resourceId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch reviews by resource id."
        );
      }
    });
  });
};

export const getReviewLikesByReviewId = (reviewId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/reviewLikes/${reviewId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch review likes by review id."
        );
      }
    });
  });
};

export const deleteReview = (id) => {
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

export const deleteReviewLike = (id) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/reviewLikes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  });
};
