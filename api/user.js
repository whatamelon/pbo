import ax from "./axios";

export const getUserInfoAPI = () => ax.get(`/users`);

export const setUserHeightAPI = height => ax.put(`/users/height/${height}`);

export const userSuggestAPI = params => ax.post(`/users/event`, params);

export const setPushFlagAPI = flag => ax.put(`/users/push/${flag}`);

export const sendUserInfoAPI = ( step, params ) =>
 ax.post(
    `/users/${step}`,params
);

export const sendUserStyleImagesAPI = ( idx, formData ) =>
 ax.post(
    `/users/img/${idx}`,formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }
);

export const sendUserNickAPI = nick => ax.post(`/users/nick/${nick}`);
