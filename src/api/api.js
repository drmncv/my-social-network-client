const baseUrl = "https://social-network.samuraijs.com/api/1.0/";
const credentials = "include";
const headers = { "API-KEY": "1e0f9e40-8efa-40c5-953b-99792ce6b30a" };

export const authAPI = {
  me() {
    return fetch(`${baseUrl}auth/me`, { credentials }).then((response) =>
      response.json()
    );
  },

  login(email, password, rememberMe = false) {
    return fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials,
      body: JSON.stringify({ email, password, rememberMe }),
    }).then((response) => response.json());
  },

  logout() {
    return fetch(`${baseUrl}auth/login`, {
      method: "DELETE",
      credentials,
    }).then((response) => response.json());
  },
};

export const usersAPI = {
  getUsers(count, page, term, friend) {
    let url = `users?count=${count}`;
    if (page) url = `${url}&page=${page}`;
    if (term) url = `${url}&term=${term}`;
    if (friend) url = `${url}&friend=${friend}`;
    return fetch(baseUrl + url, {
      credentials,
    }).then((response) => response.json());
  },

  toggleFollowed(id, follow) {
    return fetch(`${baseUrl}follow/${id}`, {
      method: follow ? "POST" : "DELETE",
      headers,
      credentials,
    }).then((response) => response.json());
  },
};

export const profileAPI = {
  getProfile(userId) {
    return fetch(`${baseUrl}profile/${userId}`).then((response) =>
      response.json()
    );
  },

  getStatus(userId) {
    return fetch(`${baseUrl}profile/status/${userId}`).then((response) =>
      response.json()
    );
  },

  uploadStatus(status) {
    return fetch(`${baseUrl}profile/status`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      credentials,
      body: JSON.stringify({ status }),
    }).then((response) => response.json());
  },

  uploadPhoto(file) {
    const data = new FormData();
    data.set("image", file);

    return fetch(`${baseUrl}profile/photo`, {
      method: "PUT",
      headers,
      credentials,
      body: data,
    }).then((response) => response.json());
  },

  updateProfile(profile) {
    return fetch(`${baseUrl}profile`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      credentials,
      body: JSON.stringify(profile),
    }).then((response) => response.json());
  },
};
