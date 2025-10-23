import {Platform} from 'react-native';

import moment from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';

import supabaseClient from '../utils/supabase';

import toastErrorMessage from './toastErrorMessage';

export const logUserActivity = async (userDetails, type = 'login') => {
  try {
    const timestamp = moment()
      .tz('Asia/Kolkata')
      .format('YYYY-MM-DDTHH:mm:ssZ');
    const {user} = userDetails || {};
    const userId = user?.id;

    if (!userId) {
      return;
    }

    const {data: existingLogins, error: fetchError} = await supabaseClient
      .from('mobile_app_logins')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (fetchError) {
      throw fetchError;
    }

    const logData = {
      user_type: 'App\\Models\\MemberDependent',
      user_id: userId,
      device_model: DeviceInfo.getModel(),
      device_os: Platform.OS,
      device_os_version: Platform.Version,
      app_version: DeviceInfo.getVersion(),
      last_accessed_at: timestamp,
      updated_at: timestamp,
    };

    let error;

    if (existingLogins?.length > 0) {
      const updateData =
        type === 'login' ? {...logData, last_login_at: timestamp} : logData;

      ({error} = await supabaseClient
        .from('mobile_app_logins')
        .update(updateData)
        .eq('user_id', userId));
    } else {
      ({error} = await supabaseClient.from('mobile_app_logins').insert([
        {
          ...logData,
          last_login_at: timestamp,
          created_at: timestamp,
        },
      ]));
    }

    if (error) {
      console.error('Supabase log error:', error);
      toastErrorMessage('Failed to log user. Please try again.');
    }
  } catch (error) {
    console.error('Log user activity failed:', error);
    toastErrorMessage('Failed to log user. Please try again.');
  }
};
