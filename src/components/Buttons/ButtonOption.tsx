import React from 'react';
import { View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

const ButtonOption: React.FC<RectButtonProps> = ({ children, ...props }) => {
	return (
    <RectButton {...props}>
      <View accessible>
        {children}
      </View>
    </RectButton>
	)
}

export default ButtonOption;
