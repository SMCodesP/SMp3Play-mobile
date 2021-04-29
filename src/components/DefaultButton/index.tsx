import {rgba} from 'polished';
import React, {useContext} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {RectButtonProps} from 'react-native-gesture-handler';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from 'styled-components';

import {Button, Container, ButtonText} from './styles';

interface DefaultButtonProps extends RectButtonProps {
  icon?: string;
  type?: 'default' | 'cancel';
  buttonStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  IconType?: any;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  children,
  icon,
  IconType = MaterialIcons,
  type = 'default',
  buttonStyle = {},
  containerStyle = {},
  textStyle = {},
  ...props
}) => {
  const theme = useContext(ThemeContext);

  const types: {
    [key: string]: {
      button: {
        style: StyleProp<ViewStyle>;
        [key: string]: any;
      };
      text: {
        style: StyleProp<TextStyle>;
        [key: string]: any;
      };
      icon: {
        [key: string]: any;
      };
    };
  } = {
    default: {
      button: {
        style: {
          paddingVertical: 15,
          ...(buttonStyle as any),
          backgroundColor: theme.comment,
        },
      },
      text: {
        style: {
          ...(textStyle as any),
          color: theme.foreground,
          marginLeft: icon ? 20 : 0,
        },
      },
      icon: {
        color: theme.foreground,
      },
    },
    cancel: {
      button: {
        rippleColor: rgba(theme.red, 0.1),
        style: {
          paddingVertical: 15,
          ...(buttonStyle as any),
        },
      },
      text: {
        style: {
          ...(textStyle as any),
          color: theme.red,
          marginLeft: icon ? 20 : 0,
        },
      },
      icon: {
        color: theme.red,
      },
    },
  };

  return (
    <Button {...(types[type]?.button || {})} {...props}>
      <Container style={containerStyle} accessible>
        {icon && <IconType name={icon} size={32} {...types[type].icon} />}
        <ButtonText {...(types[type]?.text || {})}>{children}</ButtonText>
      </Container>
    </Button>
  );
};

export default DefaultButton;
