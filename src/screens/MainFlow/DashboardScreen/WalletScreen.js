// mainFlow/DashboardScreens/WalletScreen.js
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../../../contents/colors';
import { moderateScale, verticalScale } from '../../../contents/responsiveness';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { getFontFamily } from '../../../utils/fontFamily';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            { fontFamily: getFontFamily(true, 'bold') },
          ]}
        >
          Wallet
        </Text>
      </View>

      {/* Screen Content */}
      <View style={styles.content}>
        <Text
          style={[styles.text, { fontFamily: getFontFamily(true, 'bold') }]}
        >
          This is the Wallet Screen
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
  },
  header: {
    alignItems: 'center',
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + verticalScale(40)
        : verticalScale(30),
    paddingBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
    backgroundColor: Colors.primaryWhite,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    color: Colors.primary700,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(20),
    color: Colors.primary700,
  },
});

export default WalletScreen;
