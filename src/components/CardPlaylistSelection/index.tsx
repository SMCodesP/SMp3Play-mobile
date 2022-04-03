import { darken } from "polished";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { isOnPlaylist, usePlaylist } from "../../contexts/playlist";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Radio } from "../Radio";

interface CardPlaylistSelection {
  item: TPlaylist;
  video: TMinimalInfo;
}

export const CardPlaylistSelection: React.FC<CardPlaylistSelection> = ({
  item,
  video,
}) => {
  const { toggleSongInPlaylist } = usePlaylist();

  const isAdded = isOnPlaylist(video.videoId, item.name);

  const handleAdd = async () => {
    await toggleSongInPlaylist(video, item.name);
  };

  return (
    <TouchableWithoutFeedback onPress={handleAdd} touchSoundDisabled={true}>
      <RectButton
        style={[
          { borderRadius: 10, overflow: "hidden" },
          styles.modalContainerPlaylist,
        ]}
        rippleColor={darken(0.1, colors.comment)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          accessible
        >
          <Text style={styles.modalTitlePlaylist}>{item.name}</Text>
          <Radio item={item} isSelected={isAdded} />
        </View>
      </RectButton>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainerPlaylist: {
    backgroundColor: colors.comment,
    //TouchableScalableBorderRadiusborderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 7.5,
  },
  modalTitlePlaylist: {
    fontSize: 18,
    color: colors.pink,
    fontFamily: fonts.complement,
  },
});
