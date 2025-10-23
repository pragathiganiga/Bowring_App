import React from 'react';

import {Text as RNText} from '@rneui/themed';

const Text = ({children, ...props}) => {
  return (
    <RNText allowFontScaling={false} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
