import axios from "axios";

const ax = axios.create({
  baseURL: "https://admin.pickling.kr"
});

ax.defaults.timeout = 12000;

ax.interceptors.request.use(
  request => {
    request.headers.Authorization = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    return request;
  },
  error => Promise.reject(error)
);

ax.interceptors.response.use(
  response => {
    const accessToken = response.headers.authorization;
    if (accessToken) {
      localStorage.token = accessToken;
    }
    response.data.accessToken = accessToken !== null ? accessToken : null;
    return response.data;
  },
  error => Promise.reject(error)
);

export default ax;


// axios 토큰 호출 및 앱 통신 관련 코드 진행.
// request -> 현재 로컬에서 사용하는 토큰을 사용하고 있다.
// response -> 서버로 부터 토큰을 받고 받은 토큰을 로컬에 저장하고 있다.
// ver3.0 개선 방안 -> 로컬에 있는 토큰을 사용하지 말고, 앱으로 부터 계속 받아가야한다. 로컬에 토큰또한 저장하는 방안으로 가면안된다.
// 다만, 개발을 위해 osType 체크 후 사용할 수 있도록 분기는 남기는 것으로 한다.
