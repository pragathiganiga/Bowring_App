import axios from 'axios';
import Config from 'react-native-config';

import apiTimeLogger from '../helpers/apiTimeLogger';
import firestoreLogger from '../helpers/firestoreLogger';
import responseLogger from '../helpers/responseLogger';
import toastErrorMessage from '../helpers/toastErrorMessage';
import supabaseClient from '../utils/supabase';

const BASEURL = Config?.BASE_URL;

export {BASEURL};

export default async ({
  method,
  url,
  headers,
  data = {},
  isLogin = false,
  validateStatus = function (status) {
    return status >= 200 && status < 300; // default
  },
  timeout = 60000,
}) => {
  let start = new Date().getTime();

  try {
    var config = {
      method,
      baseURL: BASEURL,
      url,
      headers: {
        ...headers,
      },
      data,
      validateStatus,
      timeout,
    };
    if (config.method == 'get') {
      delete config.data;
    }

    const response = await axios(config);
    let end = new Date().getTime();
    let time = end - start;
    responseLogger(response.data, config.data, config.url, time);
    if (time > 5000) {
      apiTimeLogger(response, config.url, time);
    }
    if (response?.data?.IsRequestSuccessful == false) {
      firestoreLogger(response, config.data, config.url, time, false);
    }
    return response;
  } catch (error) {
    if (error?.response?.status === 401 && !isLogin) {
      supabaseClient.auth.signOut();
      toastErrorMessage(
        'Authorization to use this application is denied. Please contact support.',
      );
      return null;
    }
    let end = new Date().getTime();
    let time = end - start;

    firestoreLogger(error, config.data, config.url, time, true);
    throw error;
    // toastErrorMessage('Something went wrong. Please try again later.');
  }
};
