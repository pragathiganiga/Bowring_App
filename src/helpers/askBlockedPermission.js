import {Alert} from 'react-native';

import {openSettings} from 'react-native-permissions';

const askBlockedPermission = async () => {
  Alert.alert(
    'Permission Required',
    'Please allow permission to access camera in settings',
    [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Open Settings', onPress: () => openSettings()},
    ],
  );
};

export default askBlockedPermission;
