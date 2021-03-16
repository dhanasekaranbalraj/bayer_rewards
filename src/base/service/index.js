
import axios from 'axios';
import { configApp } from '../utils/config';

//Post method without auth
export function invokePostService(path,reqObj)  {
  return new Promise(function (resolve, reject) {      
    let headers = {
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": true
    };
    const apiEndPoint = configApp.env;
    const config = {
      method: 'POST',
      data: reqObj,
      headers
    };
    axios.create({
      baseURL: apiEndPoint+path,
    })(config)
      .then((response) => {
        console.log(response.data, 'response')
        resolve(response.data)
      })
      .catch((err) => {
        console.log(err, 'error')
        if(err.response){
          reject(err.response.data);
        }      
      }); 
  });
};

//Post method with auth
export function invokePostAuthService(path,reqObj,accessToken)  {
  return new Promise(function (resolve, reject) {      
    let headers = {
      'Content-Type': 'application/json', 
      // 'Authorization' : accessToken
    };
    const apiEndPoint = configApp.env;
    const config = {
      method: 'POST',
      headers,
      data: reqObj
    };
    axios.create({
      baseURL: apiEndPoint+path
    })(config)
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        if(err.response){
          reject(err.response.data);
        }      
      }); 
  });
};

//Get method without auth
export function invokeGetService(path) {
  return new Promise(function (resolve, reject) {
    const URL = configApp.env;
    const config = {
      method: 'GET',
    };
    axios.create({
      baseURL: URL + path,
    })(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        if(err.response){
          reject(err.response.data);
        }
      });
  });
};

//Get method with auth
export function invokeGetAuthService(path) {
    return new Promise(function (resolve, reject) {
      const URL = configApp.env;
      const config = {
        method: 'GET',
      };
      axios.create({
        baseURL: URL + path,
      })(config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          if(err.response){
            reject(err.response.data);
          }
        });
    });
  };
