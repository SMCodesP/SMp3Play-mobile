import React from "react";
import { ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReceiveSharingIntent from "react-native-receive-sharing-intent";

import { usePlayer } from "../../contexts/player";

import { SafeAreaView } from "react-native-safe-area-context";

const GlobalContainer: React.FC<ViewProps> = ({
  children,
  style,
  ...props
}) => {
  const navigation = useNavigation();

  ReceiveSharingIntent.getReceivedFiles(
    (files: any) => {
      const urlsplit = files[0].weblink.split(
        /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/
      );
      if (urlsplit[3]) {
        (navigation as any).navigate("Details", {
          videoId: urlsplit[3],
        });
      }
    },
    () => {},
    "SMp3Play"
  );

  return (
    <SafeAreaView style={{ flex: 1 }} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default GlobalContainer;
