import React, { useState, useRef } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import Colors from '../../../contents/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../contents/responsiveness';
import { carouselImages, profileImage, dashboardIcons } from '../../../assets';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { getFontFamily } from '../../../utils/fontFamily';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleEyePress = () => setIsBalanceVisible(prev => !prev);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const getRows = arr => {
    const rows = [];
    for (let i = 0; i < arr.length; i += 3) {
      rows.push(arr.slice(i, i + 3));
    }
    return rows;
  };
  const iconRows = getRows(dashboardIcons);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.primaryWhite}
        translucent={false}
      />

      {/* Header */}
      <View
        style={[
          styles.pageHeader,
          { paddingTop: Platform.OS === 'ios' ? verticalScale(10) : 50 },
        ]}
      >
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="menu"
            size={moderateScale(28)}
            color={Colors.primaryBlack}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons
            name="notifications-none"
            size={moderateScale(26)}
            color={Colors.primaryBlack}
          />
        </TouchableOpacity>
      </View>

      {/* Main FlatList */}
      <FlatList
        data={iconRows}
        keyExtractor={(_, rowIndex) => rowIndex.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* User Info */}
            <View style={styles.headerContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>
                  Welcome to the Members Area
                </Text>
                <Text style={styles.nameText}>Mr. Rakesh Gupta</Text>
                <Text style={styles.nameText}>
                  Sharma <Text style={styles.idText}>(BI0036)</Text>
                </Text>
                <Text style={styles.balanceText}>Available Balance</Text>
                <View style={styles.walletRow}>
                  <Text
                    style={[
                      styles.walletIcon,
                      {
                        letterSpacing: isBalanceVisible
                          ? moderateScale(14) * 0.04
                          : moderateScale(14) * 0.02,
                      },
                    ]}
                  >
                    {isBalanceVisible ? '₹10,000' : 'x x x x x'}
                  </Text>
                  <TouchableOpacity
                    onPress={handleEyePress}
                    style={styles.eyeButton}
                  >
                    <MaterialIcons
                      name={isBalanceVisible ? 'visibility' : 'visibility-off'}
                      size={moderateScale(20)}
                      color={Colors.primaryBlack}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Image
                source={profileImage}
                style={styles.rightImage}
                resizeMode="cover"
              />
            </View>

            {/* Carousel */}
            <View style={styles.carouselWrapper}>
              <FlatList
                ref={carouselRef}
                data={carouselImages}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                renderItem={({ item }) => (
                  <View style={styles.carouselItem}>
                    <Image
                      source={item}
                      style={styles.carouselImage}
                      resizeMode="cover"
                    />
                  </View>
                )}
              />

              {/* Dots */}
              <FlatList
                data={carouselImages}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                scrollEnabled={false}
                contentContainerStyle={styles.dotsContainer}
                renderItem={({ _, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.dot,
                      activeIndex === index
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                    onPress={() =>
                      carouselRef.current.scrollToIndex({
                        index,
                        animated: true,
                      })
                    }
                  />
                )}
              />
            </View>

            {/* Explore Section */}
            <Text style={styles.textBelow}>EXPLORE</Text>
          </>
        }
        renderItem={({ item: row }) => (
          <View style={styles.iconRow}>
            {row.map((iconItem, index) => (
              <View key={index} style={styles.iconWithLabel}>
                <Image
                  source={iconItem.image}
                  style={styles.iconImage}
                  resizeMode="cover"
                />
                <Text style={styles.iconLabel}>{iconItem.label}</Text>
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? getBottomSpace() + 20 : 20,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primaryWhite },
  pageHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(14),
    backgroundColor: Colors.primaryWhite,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  headerTitle: {
    fontWeight: '400',
    fontSize: moderateScale(20),
    textAlign: 'center',
    color: Colors.primaryBlack,
    fontFamily: getFontFamily('normal'),
  },
  iconButton: { justifyContent: 'center', alignItems: 'center' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
  },
  textContainer: { flex: 1 },
  rightImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  welcomeText: {
    fontSize: moderateScale(12),
    color: Colors.neutral500,
    letterSpacing: moderateScale(14) * 0.02,
    marginTop: 12,
    fontFamily: getFontFamily('normal'),
  },
  nameText: {
    fontSize: moderateScale(24),
    color: Colors.primary700,
    paddingVertical: verticalScale(2),
    fontFamily: getFontFamily('bold'),
  },
  idText: {
    fontSize: moderateScale(12),
    color: Colors.neutral700,
    letterSpacing: moderateScale(14) * 0.02,
    fontFamily: getFontFamily('normal'),
  },
  balanceText: {
    fontSize: moderateScale(12),
    color: Colors.primary700,
    marginTop: verticalScale(2),
    letterSpacing: moderateScale(14) * 0.02,
    fontFamily: getFontFamily('normal'),
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(2),
    marginLeft: 1,
  },
  walletIcon: {
    fontWeight: '900',
    fontSize: moderateScale(14),
    color: Colors.primaryBlack,
  },
  eyeButton: { marginLeft: horizontalScale(5) },
  carouselWrapper: {
    marginTop: verticalScale(10),
    marginLeft: horizontalScale(4),
  },
  carouselItem: {
    width: width - horizontalScale(30),
    height: verticalScale(180),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    marginHorizontal: horizontalScale(8),
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  dot: {
    width: horizontalScale(9),
    height: horizontalScale(9),
    borderRadius: horizontalScale(5),
    marginHorizontal: horizontalScale(4),
  },
  activeDot: {
    backgroundColor: Colors.primaryBlack,
  },
  inactiveDot: {
    backgroundColor: Colors.grayBorder,
  },
  textBelow: {
    fontSize: moderateScale(14),
    letterSpacing: moderateScale(14) * 0.05,
    color: Colors.neutral400,
    marginTop: verticalScale(16),
    marginLeft: horizontalScale(22),
    fontFamily: getFontFamily('bold'),
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
    paddingHorizontal: horizontalScale(28),
    marginBottom: 10,
  },
  iconWithLabel: {
    alignItems: 'center',
    width: horizontalScale(80),
  },
  iconImage: {
    width: moderateScale(75),
    height: moderateScale(75),
    borderRadius: moderateScale(40),
    borderWidth: 1.4,
    borderColor: Colors.primary700,
  },
  iconLabel: {
    fontSize: moderateScale(12),
    color: Colors.neutral700,
    textAlign: 'center',
    marginTop: verticalScale(15),
    letterSpacing: moderateScale(14) * 0.003,
    fontWeight: '400',
    fontFamily: getFontFamily('normal'),
  },
});

export default DashboardScreen;
