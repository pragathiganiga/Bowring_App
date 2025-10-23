// mainFlow/DashboardScreens/OrderScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../contents/colors';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../contents/responsiveness';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>

      {/* Screen Content */}
      <View style={styles.content}>
        <Text style={styles.text}>This is the Orders Screen</Text>
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

export default OrderScreen;
