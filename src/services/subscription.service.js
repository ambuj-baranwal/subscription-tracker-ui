import { api } from "../lib/api.js";

export const subscriptionService = {
  getAll: async () => {
    const response = await api.get("/subscriptions");
    return response.data.data;
  },

  getById: async (id) => {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data.data;
  },

  create: async (payload) => {
    const response = await api.post("/subscriptions", payload);
    return response.data.data;
  },

  update: async ({ id, payload }) => {
    const response = await api.put(`/subscriptions/${id}`, payload);
    return response.data.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/subscriptions/${id}`);
    return response.data.data;
  },
};
