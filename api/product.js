import ax from "./axios";

export const getItemProductsAPI = (categories, params) =>
 ax.get(
  `/items/31/height/${params.height}/${categories.firstCategory}/${
    categories.secondCategory
  }`,
  {
    params: {
    limit: params.limit,
    offset: params.offset,
    hr: params.heightRange,
    pr: params.priceRange,
    order: params.sortOrder
    }
  }
);

export const getAllProductsAPI = (params) =>
 ax.get(
  `/items/32/all`,
  {
    params: {
    limit: params.limit,
    offset: params.offset,
    cat1: params.cat1,
    cat2: params.cat2,
    qid: params.qid,
    fit1: params.fit1,
    option:params.option,
    keyword: params.keyword,
    hr: params.heightRange,
    height: params.height,
    pr: params.priceRange,
    order: params.sortOrder
    }
  }
);

export const getFollowModelProductsAPI = (categories, params) =>
 ax.get(
  `/items/31/model/${categories.firstCategory}/${
    categories.secondCategory
  }`,
  {
    params: {
    limit: params.limit,
    offset: params.offset,
    hr: params.heightRange,
    pr: params.priceRange,
    order: params.sortOrder
    }
  }
);

export const addToSavedProductsAPI = itemId =>
  ax.post(`/items/favor/${itemId}`);

export const deleteFromSavedProductsAPI = itemId =>
  ax.delete(`/items/favor/${itemId}`);

export const getSavedProductsAPI = params =>
  ax.get(`/items/favor`, {
    params: {
      limit: params.limit,
      offset: params.offset
    }
  });

export const getPopularKeywordsAPI = (limit) =>
  ax.get(`/items/31/keyword/${limit}`);

export const getKeywordProductsAPI = (keyword, params) =>
  ax.get(
   `/items/31/name/${keyword}`,
   {
     params: {
     limit: params.limit,
     offset: params.offset,
     pr: params.priceRange,
     order: params.sortOrder
     }
   }
 );

export const getFitProductsAPI = (categories, params) =>
  ax.get(
  `/items/31/fit/${params.fit1}/${categories.firstCategory}`,
  {
    params: {
    limit: params.limit,
    option: params.option,
    offset: params.offset,
    pr: params.priceRange,
    order: params.sortOrder
    }
  }
);

export const getProductFitsAPI = itemId =>
  ax.get(`/items/31/fit/${itemId}`);
