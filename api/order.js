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

export const getOrderListAPI = (params) =>
 ax.get(
  `/orders`,
  {
    params: {
      offset: params.offset,
      limit: 30,
      orderId: params.orderId,
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
    }
  }
);

export const getOrderItemListAPI = orderId =>
 ax.get(
  `/orders/item/${orderId}`
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
