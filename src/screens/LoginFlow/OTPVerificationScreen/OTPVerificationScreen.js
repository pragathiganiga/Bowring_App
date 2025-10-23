import React, { useState, useEffect } from 'react';
import { getFontFamily } from '../../../utils/fontFamily';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Colors from '../../../contents/colors';
import PrimaryButton from '../../../components/PrimaryButton';
import backArrow from '../../../assets/images/backArrow.png';
import { useAppState } from '../../../context/AppStateContext';

const { width } = Dimensions.get('window');

function OTPVerificationScreen({ navigation }) {
  const [otp, setOtp] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { login, verifyOTP } = useAppState();

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height); // capture keyboard height
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleVerify = () => {
    if (otp.length === 6) {
      verifyOTP();
      login();
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  const handleResend = () => {
    console.log('Resend OTP');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.primaryWhite}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={backArrow} style={styles.backIcon} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Sent to <Text style={styles.underlineText}>+91 9789782887</Text>
          </Text>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {keyboardVisible && (
              <Text style={styles.labelFloating}>Enter your code</Text>
            )}
            <TextInput
              value={otp}
              onChangeText={text => {
                if (text.length <= 6) setOtp(text);
              }}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="_ _ _ _ _ _"
              placeholderTextColor={Colors.grayText}
              style={[
                styles.otpInput,
                keyboardVisible
                  ? styles.otpInputKeyboard
                  : styles.otpInputHidden,
              ]}
            />
          </View>

          {/* Resend OTP */}
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>
              Resend OTP in <Text style={styles.timerText}>00:30s</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* VERIFY Button when keyboard is visible */}
        {keyboardVisible && (
          <View
            style={[
              styles.buttonBelowKeyboard,
              {
                position: 'absolute',
                bottom:
                  Platform.OS === 'ios'
                    ? keyboardHeight / 1
                    : keyboardHeight + 10,
                left: 0,
                right: 0,
              },
            ]}
          >
            <PrimaryButton label="VERIFY" onPress={handleVerify} />
          </View>
        )}

        {/* VERIFY Button at bottom when keyboard hidden */}
        {!keyboardVisible && (
          <View style={styles.buttonContainer}>
            <PrimaryButton label="VERIFY" onPress={handleVerify} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 2 : 2,
    marginBottom: 42,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: 'flex-start',
    paddingBottom: 120,
    fontFamily: getFontFamily('bold'),
  },
  backButton: {
    marginBottom: 20,
  },
  backIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: Colors.neutral700,
    marginBottom: 8,
    fontFamily: getFontFamily('bold'),
  },
  subtitle: {
    fontSize: 14,
    color: Colors.neutral400,
    marginBottom: 30,
    fontFamily: getFontFamily('regular'),
  },
  underlineText: {
    fontSize: 14,
    color: Colors.neutral400,
    textDecorationLine: 'underline',
    fontFamily: getFontFamily('regular'),
  },
  otpContainer: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
    position: 'relative',
  },
  otpInput: {
    fontSize: 18,
    color: Colors.primaryBlack,
    height: '100%',
    textAlign: 'left',
    fontFamily: getFontFamily('regular'),
  },
  otpInputHidden: {
    letterSpacing: 0.04 * 18,
  },
  otpInputKeyboard: {
    letterSpacing: 0.3 * 18,
  },
  labelFloating: {
    position: 'absolute',
    left: 10,
    top: -8,
    fontSize: 10,
    fontWeight: '400',
    color: Colors.primaryBlack,
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 4,
    letterSpacing: 0.04 * 18,
    fontFamily: getFontFamily('regular'),
  },
  resendText: {
    fontSize: 14,
    color: Colors.neutral400,
    marginBottom: 20,
    fontFamily: getFontFamily('regular'),
  },
  timerText: {
    color: Colors.primaryBlack,
    fontFamily: getFontFamily('regular'),
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  buttonBelowKeyboard: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default OTPVerificationScreen;
