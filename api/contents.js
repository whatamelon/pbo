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