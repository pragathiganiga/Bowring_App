import { fontFamilies } from '../constants/fonts';

// Default is LTR text
export const getFontFamily = (weight = 'regular') => {
  return fontFamilies.ROBOTO_CONDENSED[weight];
};
