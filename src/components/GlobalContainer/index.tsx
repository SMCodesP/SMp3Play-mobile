import React from "react";
import { View, ViewProps } from "react-native";
import { usePlayer } from "../../contexts/player";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import colors from "../../styles/colors";

const GlobalContainer: React.FC<ViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { track } = usePlayer();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          marginBottom: track ? 110 : 45,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default GlobalContainer;
