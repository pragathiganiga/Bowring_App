import objectToQueryParams from 'object-to-query-params';

import zersysApi, {BASEURL} from '../api/zersysApi';

import {getStringAsync, removeItem, setStringAsync} from './mmkvStorage';

const getZersysWhoAmI = async () => {
  try {
    let data = {
      subscription_id: 'REPLACE WITH THE REQUIRED ID',
    };

    let queryParams = objectToQueryParams(data);

    const res = await zersysApi({
      method: 'get',
      url: `${BASEURL}/api/whoami?${queryParams}`,
      data: {subscription_id: 'REPLACE WITH THE REQUIRED ID'},
    });
    if (res.data.message === 'Success') {
      setStringAsync('zersysWhoAmI', res.data.token);
      return res.data.token;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};
const zersysWhoAmI = async (clearToken = false) => {
  if (clearToken) {
    removeItem('zersysWhoAmI');
    return await getZersysWhoAmI();
  }
  const asyncStorageWhoAmI = await getStringAsync('zersysWhoAmI');
  if (asyncStorageWhoAmI == null) {
    return await getZersysWhoAmI();
  } else {
    return asyncStorageWhoAmI;
  }
};

export default zersysWhoAmI;
