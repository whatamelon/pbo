import ax from "./axios";

export const getFollowingModelsAPI = (params) => ax.get(`/models/30/follow`, {
  params:{
    offest: params.offset,
    limit:params.limit
  }
});

export const followModelAPI = params => ax.post(`/models/30/follow/${params}`);

export const unfollowModelAPI = params =>
  ax.delete(`/models/30/follow/${params}`);

export const getModelsByHeightAPI = (height, params) =>
  ax.get(`/models/30/height/${height}`, {
    params: {
      offset: params.offset,
      limit: params.limit
    }
  });


export const getNewModelsAPI = (params) =>
  ax.get(`/models/30/height`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      hfrom: params.hfrom,
      hto: params.hto,
      orderby: params.orderby
    }
  }); 

export const getModelsLowHeightAPI = (params) =>
  ax.get(`/models/30/height`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      hfrom: params.hfrom,
      hto: params.hto,
      orderby: params.orderby
    }
  });

export const getModelsMeanHeightAPI = (params) =>
  ax.get(`/models/30/height`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      hfrom: params.hfrom,
      hto: params.hto,
      orderby: params.orderby
    }
  });

export const getModelsHighHeightAPI = (params) =>
  ax.get(`/models/30/height`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      hfrom: params.hfrom,
      hto: params.hto,
      orderby: params.orderby
    }
  });


export const getAllModelsAPI = (params) =>
  ax.get(`/models/30/height`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      hfrom: params.hfrom,
      hto: params.hto,
      orderby: params.orderby
    }
  })

export const getModelProductsAPI = (categories, params) =>
  ax.get(
    `/models/30/items/${params.modelId}/${categories.firstCategory}/${
      categories.secondCategory
    }`,
    {
      params: {
        offset: params.offset,
        limit: params.limit
      }
    }
  );

export const setModelLikeAPI = modelId =>
  ax.put( `/models/30/like/${modelId}?point=1`);

export const getRandomModelAPI = (height) =>
  ax.get(`/models/30/random/${height}`);

export const getStyleModelsAPI = (params) =>
  ax.get(`/models/30/style/${params.modelId}`, {
    params: {
      offset: params.offset,
      limit: params.limit
    }
  });

export const getHeightModelsAPI = (params) =>
  ax.get(`/models/30/height/${params.height}`, {
    params: {
      offset: params.offset,
      limit: params.limit
    }
  });

export const getModelInfoAPI = (modelId) =>
  ax.get(`/models/30/${modelId}`);