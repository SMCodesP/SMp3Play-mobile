import React from "react";
import { View, ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import { usePlayer } from "../../contexts/player";

import colors from "../../styles/colors";

const GlobalContainer: React.FC<ViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { track } = usePlayer();
  const navigation = useNavigation();

  ReceiveSharingIntent.getReceivedFiles((files: any) => {
    const urlsplit = files[0].weblink.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
    if (urlsplit[3]) {
      navigation.navigate("Details", {
        videoId: urlsplit[3]
      })
    }
  }, () => {}, 'SMp3Play')

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
