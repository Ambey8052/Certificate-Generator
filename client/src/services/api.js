// API base URL configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Auth API calls
export const authAPI = {
  register: async (data) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getProfile: async (token) => {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },
};

// Certificate API calls
export const certificateAPI = {
  create: async (data, token) => {
    const res = await fetch(`${API_URL}/certificates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getAll: async (token, search = "") => {
    const query = search ? `?search=${search}` : "";
    const res = await fetch(`${API_URL}/certificates${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getById: async (certificateId) => {
    const res = await fetch(`${API_URL}/certificates/${certificateId}`);
    return res.json();
  },

  verify: async (certificateId) => {
    const res = await fetch(`${API_URL}/certificates/verify/${certificateId}`);
    return res.json();
  },

  delete: async (id, token) => {
    const res = await fetch(`${API_URL}/certificates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  downloadPDF: async (certificateId) => {
    const res = await fetch(`${API_URL}/certificates/${certificateId}/download`, {
      method: "GET",
    });
    return res.blob();
  },
};
