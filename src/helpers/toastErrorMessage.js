import {StatusBar} from 'react-native';

import {showMessage} from 'react-native-flash-message';

import {moderateScale} from '../components/responsiveness';
import colors from '../contents/colors';
import fonts from '../contents/fonts';

import {delayByMilliseconds} from './commonFunctions';

const toastErrorMessage = async (text1 = '', addTopSpace = true) => {
  await delayByMilliseconds(500);

  showMessage({
    message: text1,
    type: 'danger',
    duration: 2000,
    floating: true,
    statusBarHeight: addTopSpace
      ? StatusBar.currentHeight != 0
        ? StatusBar.currentHeight
        : moderateScale(40)
      : 0,
    titleStyle: {
      fontFamily: fonts.roboto_bold,
      color: colors.white,
      letterSpacing: 1,
      fontSize: moderateScale(14),
    },
    textProps: {maxFontSizeMultiplier: 1.2},
    backgroundColor: colors.cancelRed,
  });
};

export default toastErrorMessage;
