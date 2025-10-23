import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../contents/colors';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  isFocused,
  secureTextEntry,
  keyboardType,
}) => (
  <View
    style={[
      styles.inputContainer,
      isFocused && {borderColor: colors.primaryColor},
    ]}>
    <TextInput
      style={styles.body}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor={colors.primaryColor}
      underlineColorAndroid="transparent"
      onFocus={onFocus}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType ? keyboardType : 'default'}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.primaryColor,
    borderRadius: 8,
  },
  body: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    color: colors.primaryColor,
  },
});

export default CustomInput;
