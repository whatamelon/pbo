import ax from "./axios";

export const getUserInfoAPI = () => ax.get(`/users`);

export const setUserHeightAPI = height => ax.put(`/users/height/${height}`);

export const userSuggestAPI = params => ax.post(`/users/event`, params);

export const setPushFlagAPI = flag => ax.put(`/users/push/${flag}`);
