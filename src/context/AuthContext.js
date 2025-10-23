import FastImage from 'react-native-fast-image';

import {
  getBoolAsync,
  getMapAsync,
  removeItem,
  setBoolAsync,
  setMapAsync,
} from '../helpers/mmkvStorage';

import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'update_login_state':
      return {...state, isSignedIn: action.payload};
    case 'update_user_information':
      return {...state, userDetails: action.payload};
    case 'update_loading_state':
      return {...state, isLoading: action.payload};
    case 'isOnBoardingScreenShow':
      return {...state, isOnBoardingScreenShow: action.payload};
    default:
      return state;
  }
};

const localSignIn = dispatch => async () => {
  const userInformation = await getMapAsync('userInfo');

  if (userInformation != null) {
    dispatch({
      type: 'update_user_information',
      payload: {...userInformation},
    });
    dispatch({type: 'update_loading_state', payload: false});
    dispatch({type: 'update_login_state', payload: true});
  } else {
    dispatch({type: 'update_loading_state', payload: false});
    dispatch({type: 'update_login_state', payload: false});
  }
};

const checkForOnBoarding = dispatch => async () => {
  try {
    const isOnBoardScreenShow = await getBoolAsync('isOnBoardScreenShow');
    if (isOnBoardScreenShow == null || isOnBoardScreenShow == false) {
      await setBoolAsync('isOnBoardScreenShow', false);
      dispatch({type: 'isOnBoardingScreenShow', payload: false});
    } else {
      await setBoolAsync('isOnBoardScreenShow', true);
      dispatch({type: 'isOnBoardingScreenShow', payload: true});
    }
  } catch (err) {
    console.log(err, 'checkForOnBoarding');
  }
};

const setOnBoardingShown = dispatch => async () => {
  try {
    await setBoolAsync('isOnBoardScreenShow', true);
    dispatch({type: 'isOnBoardingScreenShow', payload: true});
  } catch (err) {
    console.log(err, 'checkForOnBoarding');
  }
};

const updateLoginStatus = dispatch => async userInfo => {
  try {
    if (userInfo != null) {
      await setMapAsync('userInfo', userInfo);
      dispatch({type: 'update_login_state', payload: true});
      dispatch({
        type: 'update_user_information',
        payload: {...userInfo},
      });
    } else {
      console.log('err updateLoginStatus');
    }
  } catch (error) {
    throw error;
  }
};

const signOut = dispatch => {
  return async () => {
    removeItem('userInfo');
    removeItem('profileInfo');
    removeItem('dependentsInfo');
    setBoolAsync('biometricEnabled', false);
    FastImage.clearMemoryCache();
    FastImage.clearDiskCache();
    dispatch({
      type: 'update_user_information',
      payload: null,
    });
    dispatch({
      type: 'update_login_state',
      payload: false,
    });
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    updateLoginStatus,
    signOut,
    localSignIn,
    checkForOnBoarding,
    setOnBoardingShown,
  },
  {
    isSignedIn: false,
    isLoading: true,
    userDetails: {},
    isOnBoardingScreenShow: false,
  },
);
