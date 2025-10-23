import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from '../contents/responsiveness';
import Text from './TextComponent';
import colors from '../contents/colors';
import EvilIcon from '@react-native-vector-icons/evil-icons';

const CustomHeader = ({title, backButtonOnPress, hideBackButton}) => {
  return (
    <View style={styles.mainContainer}>
      {!hideBackButton && (
        <TouchableOpacity
          style={styles.containerIcon}
          onPress={backButtonOnPress}>
          <EvilIcon
            name="chevron-left"
            color={colors.primaryColor}
            size={moderateScale(45)}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: moderateScale(55),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryColor,
  },
  containerIcon: {
    position: 'absolute',
    left: moderateScale(0),
    bottom: moderateScale(12),
  },
  title: {
    fontSize: moderateScale(14),
    color: colors.primaryColor,
    textTransform: 'uppercase',
  },
});

export default CustomHeader;
