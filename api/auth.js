import ax from "./axios";

export const signInAPI = params => ax.post(`/admin/sign`, params);