import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useKeyboard } from '@react-native-community/hooks';
import buildingImage from '../../../assets/images/building.jpg';
import logo from '../../../assets/images/bowringLogo.png';
import indianFlag from '../../../assets/images/indianFlag.png';
import Colors from '../../../contents/colors';
import Container from '../../../components/Container';
import PrimaryButton from '../../../components/PrimaryButton';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../contents/responsiveness';
import { getFontFamily } from '../../../utils/fontFamily';
function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const keyboard = useKeyboard();
  const keyboardVisible = keyboard.keyboardShown;

  // Animated value for smooth margin animation
  const animatedMargin = useRef(new Animated.Value(verticalScale(80))).current;

  useEffect(() => {
    animatedMargin.stopAnimation();
    Animated.spring(animatedMargin, {
      toValue: keyboardVisible ? verticalScale(5) : verticalScale(20),
      useNativeDriver: false,
      bounciness: 10,
    }).start();
  }, [keyboardVisible]);

  const handleLogin = () => {
    navigation.navigate('OTPVerificationScreen');
  };

  const topHeight = keyboardVisible ? verticalScale(250) : verticalScale(400);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.primaryWhite}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, backgroundColor: Colors.primaryWhite }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Container removePadding hideHeader style={{ flex: 1 }}>
              {/* TOP IMAGE */}
              <View
                style={[
                  styles.topFrame,
                  {
                    height: topHeight,
                    paddingTop: keyboardVisible ? 0 : verticalScale(24),
                  },
                ]}
              >
                <Image source={buildingImage} style={styles.buildingImage} />
                <LinearGradient
                  colors={[
                    Colors.gradientStart,
                    Colors.gradientMiddle,
                    Colors.gradientEnd,
                  ]}
                  locations={[0, 0.21, 0.565]}
                  style={styles.gradientOverlay}
                />
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                {!keyboardVisible && (
                  <View style={styles.imageTextContainer}>
                    <Text style={styles.welcomeText}>Welcome to</Text>
                    <Text style={styles.bowringText}>Bowring Institute</Text>
                  </View>
                )}
              </View>

              {/* BOTTOM FRAME */}
              <View
                style={[
                  styles.bottomFrame,
                  keyboardVisible
                    ? { marginTop: -topHeight * 0.75 }
                    : { marginTop: verticalScale(2) },
                ]}
              >
                {keyboardVisible && (
                  <View style={styles.keyboardWelcomeContainer}>
                    <Text style={styles.keyboardWelcomeText}>Welcome to</Text>
                    <Text style={styles.keyboardWelcome}>
                      Bowring Institute
                    </Text>
                  </View>
                )}

                <View style={styles.contentWrapper}>
                  {/* Animated text section */}
                  <Animated.View
                    style={[
                      styles.textContainer,
                      { marginTop: animatedMargin },
                    ]}
                  >
                    <Text style={[styles.title]}>Enter Your Details</Text>
                    <Text style={styles.subtitle}>
                      {
                        "Please enter your membership number.We'll use \nthis to identify you and personalize the app."
                      }
                    </Text>
                  </Animated.View>

                  <TextInput
                    placeholder="Enter Membership Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="numeric"
                    style={styles.input}
                  />

                  {/* Phone input with flag */}
                  <View style={styles.phoneContainer}>
                    <Image source={indianFlag} style={styles.flagIcon} />
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput
                      placeholder="Enter Phone Number"
                      value={password}
                      onChangeText={setPassword}
                      keyboardType="phone-pad"
                      style={styles.phoneInput}
                    />
                  </View>

                  <PrimaryButton
                    label="Log In"
                    onPress={handleLogin}
                    fontFamily={getFontFamily('medium')}
                  />

                  <View style={styles.agreementContainer}>
                    <Text style={styles.agreementText}>
                      By proceeding, you acknowledge and agree to our
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TermsAndConditions')}
                    >
                      <Text style={styles.linkText}>Terms and Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                    >
                      <Text style={styles.linkText}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Container>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  topFrame: {
    width: horizontalScale(375),
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: Colors.primaryWhite,
  },
  buildingImage: {
    width: horizontalScale(640),
    height: verticalScale(640),
    resizeMode: 'cover',
    transform: [
      { translateX: -horizontalScale(150) },
      { translateY: -verticalScale(170) },
    ],
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    position: 'absolute',
    width: horizontalScale(82),
    height: verticalScale(87),
    top: verticalScale(50),
    left: (horizontalScale(375) - horizontalScale(82)) / 2,
    opacity: 1,
    marginTop: verticalScale(20),
  },
  imageTextContainer: {
    position: 'absolute',
    top: verticalScale(140),
    width: '100%',
    alignItems: 'center',
    marginTop: verticalScale(40),
  },
  welcomeText: {
    fontWeight: '300',
    fontSize: moderateScale(16),
    color: Colors.primaryWhite,
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: verticalScale(18),
    fontFamily: getFontFamily('regular'),
  },
  bowringText: {
    fontWeight: '400',
    fontSize: moderateScale(36),
    color: Colors.primaryWhite,
    letterSpacing: 0.5,
    textAlign: 'center',
    lineHeight: verticalScale(40),
    fontFamily: getFontFamily('bold'),
  },
  bottomFrame: {
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: horizontalScale(20),
    paddingBottom: verticalScale(20),
    justifyContent: 'center',
  },
  keyboardWelcomeContainer: {
    marginBottom: verticalScale(6),
  },
  keyboardWelcomeText: {
    fontWeight: '400',
    fontSize: moderateScale(20),
    color: Colors.neutral700,
    marginTop: verticalScale(20),
    fontFamily: getFontFamily('regular'),
  },
  keyboardWelcome: {
    fontWeight: '400',
    fontSize: moderateScale(30),
    color: Colors.primary700,
    marginTop: verticalScale(3),
    fontFamily: getFontFamily('bold'),
  },
  contentWrapper: {
    marginTop: verticalScale(-10),
  },
  textContainer: {
    marginTop: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(20),
    color: Colors.primaryBlack,
    letterSpacing: moderateScale(0.02 * 20),
    fontFamily: getFontFamily('bold'),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: Colors.neutral600,
    lineHeight: verticalScale(22),
    paddingBottom: verticalScale(4),
    letterSpacing: moderateScale(0.04 * 14),
    fontWeight: '400',
    marginBottom: verticalScale(8),
    fontFamily: getFontFamily('regular'),
  },
  input: {
    width: '100%',
    height: verticalScale(45),
    borderWidth: 1,
    borderColor: Colors.neutral400,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    textAlign: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral400,
    borderRadius: moderateScale(8),
    height: verticalScale(45),
    marginBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    backgroundColor: Colors.primaryWhite,
    overflow: 'hidden',
    fontFamily: getFontFamily('regular'),
  },
  phoneInput: {
    flex: 1,
    fontSize: moderateScale(14),
    lineHeight: verticalScale(16),
    color: Colors.primaryBlack,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: moderateScale(0.04 * 14),
    height: '100%',
    paddingVertical: 0,
    marginRight: horizontalScale(10),
    fontFamily: getFontFamily('regular'),
    paddingRight: 60,
  },
  flagIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    marginRight: horizontalScale(8),
    marginLeft: horizontalScale(9),
    resizeMode: 'contain',
  },
  countryCode: {
    fontSize: moderateScale(14),
    marginRight: horizontalScale(8),
    color: Colors.primaryBlack,
    fontWeight: '400',
    fontFamily: getFontFamily('regular'),
  },
  agreementContainer: {
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  agreementText: {
    fontWeight: '400',
    fontSize: moderateScale(12),
    lineHeight: verticalScale(12),
    letterSpacing: moderateScale(0.01 * 12),
    color: Colors.neutral400,
    textAlign: 'center',
    marginBottom: verticalScale(6),
    fontFamily: getFontFamily('regular'),
  },
  linkText: {
    fontWeight: '400',
    fontSize: moderateScale(12),
    lineHeight: verticalScale(16),
    letterSpacing: 0.01 * moderateScale(12),
    color: Colors.primaryBlack,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: verticalScale(6),
    fontFamily: getFontFamily('regular'),
  },
});

export default LoginScreen;
