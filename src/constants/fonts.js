import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

export const fontFamilies = {
  ROBOTO_CONDENSED: {
    regular: isIOS ? 'RobotoCondensed-Regular' : 'RobotoCondensedRegular',
    medium: isIOS ? 'RobotoCondensed-Medium' : 'RobotoCondensedMedium',
    bold: isIOS ? 'RobotoCondensed-Bold' : 'RobotoCondensedBold',
  },
};
