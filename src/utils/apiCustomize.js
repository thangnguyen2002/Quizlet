import axios from "axios";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import { store } from '../redux/store'

NProgress.configure(
  {
    showSpinner: false,
    trickleSpeed: 100 //100ms each little movement
  }
)

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
});

// Add a request interceptor (middleware trc khi client request hoac trc khi server response se lam cai gi day)
instance.interceptors.request.use(function (config) { //do export ra moi instance nen ta chi customize tren instance
  // Do something before request is sent
  // console.log("store: ", store.getState())
  const access_token = store?.getState()?.user?.account?.access_token
  // console.log('access_token: ', access_token);
  config.headers["Authorization"] = "Bearer " + access_token
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  NProgress.done();
  // console.log(">>> interceptor: ", response);


  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response && response.data ? response.data : response;
}, function (error) { //
  NProgress.done();
  // token expired: EC === -999
  if (error.response.data && error.response.data.EC === -999) { //do st when token expired
    window.location.href = '/login'
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // console.log(error.response);
  // console.log(Promise.reject(error));

  return error && error.response && error.response.data ? error.response.data : Promise.reject(error); //chi lay phan data de giong nhu return dong 21 de ben Modal xu ly toast 
});

export default instance;