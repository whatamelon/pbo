import ax from "./axios";

export const signInAPI = params => ax.post(`/users/signin`, params);

export const signUpAPI = params => ax.post(`/users/signup`, params);

export const logoutAPI = () =>  ax.delete(`/users`);