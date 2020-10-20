import ax from "./axios";

export const getMyContentsListAPI = params =>
ax.get(`/nconts`,{
  params: {
    limit: 30,
    offset: params.offset
  }
});

export const getBeforeContentsListAPI = params =>
ax.get(`/nconts/nitem`,{
  params: {
    limit: 30,
    offset: params.offset
  }
});

export const sendContentsImageAPI = (id, type, idx, formData) =>
ax.post(`/nconts/img/${id}/${type}/${idx}`,formData, {
  headers:{
      'Content-Type': 'multipart/form-data'
  }
});

export const deleteContentsImageAPI = (id, type, idx) =>
ax.delete(`/nconts/img/${id}/${type}/${idx}`);

export const getContentsImageAPI = id=>
ax.get(`/nconts/img/${id}`);

export const changeContentsImageIndexAPI = (id , type, params)=>
ax.put(`/nconts/img/${id}/${type}`,params);

export const registerContentsAPI = params=>
ax.post(`/nconts`,params);

export const changeContentsAPI = (id , params)=>
ax.put(`/nconts/${id}`,params);

export const sendConfirmRequireAPI = id =>
ax.post(`/nconts/${id}`);