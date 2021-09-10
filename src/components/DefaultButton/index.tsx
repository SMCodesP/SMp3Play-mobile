import { rgba } from "polished";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import colors from "../../styles/colors";

interface DefaultButtonProps extends RectButtonProps {
  icon?: string;
  type?: "default" | "cancel";
  buttonStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  IconType?: any;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  children,
  icon,
  IconType = MaterialIcons,
  type = "default",
  buttonStyle = {},
  containerStyle = {},
  textStyle = {},
  ...props
}) => {
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
          backgroundColor: colors.comment,
          ...styles.button,
          ...(buttonStyle as any),
        },
      },
      text: {
        style: {
          color: colors.foreground,
          marginLeft: icon ? 20 : 0,
          ...styles.buttonText,
          ...(textStyle as any),
        },
      },
      icon: {
        color: colors.foreground,
      },
    },
    cancel: {
      button: {
        rippleColor: rgba(colors.red, 0.1),
        style: {
          paddingVertical: 15,
          ...styles.button,
          ...(buttonStyle as any),
        },
      },
      text: {
        style: {
          color: colors.red,
          marginLeft: icon ? 20 : 0,
          ...styles.buttonText,
          ...(textStyle as any),
        },
      },
      icon: {
        color: colors.red,
      },
    },
  };

  return (
    <RectButton {...(types[type]?.button || {})} {...props}>
      <View style={[styles.container, containerStyle]} accessible>
        {icon && <IconType name={icon} size={32} {...types[type].icon} />}
        <Text {...(types[type]?.text || {})}>{children}</Text>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default DefaultButton;
