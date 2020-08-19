import ax from "./axios";

export const getQurateListAPI = (params) =>
  ax.get(
   `/qitems`,
   {
     params: {
     limit: params.limit,
     offset: params.offset,
     }
   }
 );

 export const getQurateInfoAPI = (qitemId) =>
  ax.get(`/qitems/info/${qitemId}`);

  export const getQuratorInfoAPI = (quserId) =>
  ax.get(`/qusers/${quserId}`);

  export const getQuratorQurationAPI= (quserId) =>
  ax.get(`/qitems/quser/${quserId}`);