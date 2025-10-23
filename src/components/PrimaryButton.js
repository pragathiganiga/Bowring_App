import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './TextComponent';
import colors from '../contents/colors';
import { moderateScale } from '../contents/responsiveness';
import { getFontFamily } from '../utils/fontFamily';

const PrimaryButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: moderateScale(50),
    width: '100%',
    backgroundColor: colors.primary700,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontFamily: getFontFamily('bold'),
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    color: colors.primaryWhite,
  },
});

export default PrimaryButton;
