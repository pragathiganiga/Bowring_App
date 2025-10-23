import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './TextComponent';
import colors from '../contents/colors';
import { moderateScale } from '../contents/responsiveness';

const SecondaryButton = ({ label, onPress }) => {
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
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: moderateScale(14),
    color: colors.primaryColor,
  },
});

export default SecondaryButton;
