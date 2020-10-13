import ax from "./axios";

export const signInAPI = params => ax.post(`/users/signin`, params);