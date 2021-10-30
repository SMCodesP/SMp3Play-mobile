import React from 'react';

import { FlatList } from "react-native"
import CardSongPlaylist from "../CardSongPlaylist"

const DraggableList = ({ songs }: any) => {
  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => (item as any).videoId}
      renderItem={(props) => <CardSongPlaylist {...props} />}
    />
  )
}

export default DraggableList;
