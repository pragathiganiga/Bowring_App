import React from 'react';
import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../contents/colors';

import CustomHeader from './CustomHeader';
import { moderateScale } from '../contents/responsiveness';

const Container = ({
  children,
  title = '',
  backButtonOnPress = null,
  hideHeader = false,
  removePadding = false,
  backgroundColor = colors.white,
  hideBackButton = false,
}) => {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        {!hideHeader && (
          <CustomHeader
            title={title}
            backButtonOnPress={backButtonOnPress}
            hideBackButton={hideBackButton}
          />
        )}
        <View
          style={{
            flex: 1,
            padding: removePadding ? 0 : moderateScale(15),
            backgroundColor: backgroundColor,
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Container;
