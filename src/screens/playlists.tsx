import { darken } from "polished";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";

import { CardPlaylist } from "../components/CardPlaylist";
import GlobalContainer from "../components/GlobalContainer";
import MyScrollView from "../components/MyScrollView";
import { TouchableScalable } from "../components/Buttons/TouchableScalable";
import ModalImportPlaylist from "../components/Modals/ModalImportPlaylist";
import { usePlaylist } from "../contexts/playlist";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import ModalCreatePlaylist from "../components/Modals/ModalCreatePlaylist";

export const Playlists: React.FC = () => {
  const { playlists } = usePlaylist();
  const [modalIsOpenCreate, setModalCreateIsOpen] = useState(false);
  const [modalImportIsOpen, setModalImportIsOpen] = useState(false);

  return (
    <GlobalContainer>
      <MyScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Playlists</Text>
        <TouchableScalable
          buttonStyle={styles.containerButton}
          rectButton={true}
          duration={100}
          scaleTo={0.95}
          borderRadius={50}
          rippleColor={colors.purple}
          delayPressOut={100}
          onPressOut={() => setModalCreateIsOpen((state) => !state)}
          style={styles.button}
        >
          <Ionicons name="add" size={26} color={darken(0.1, colors.purple)} />
          <Animated.Text style={styles.textButton}>
            Criar playlist
          </Animated.Text>
        </TouchableScalable>
        <FlatList
          data={playlists}
          renderItem={({ item }) => <CardPlaylist playlist={item} />}
          keyExtractor={({ name }) => name}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhuma playlist criada</Text>
          )}
        />
      </MyScrollView>
      <ModalImportPlaylist
        modalIsOpen={modalImportIsOpen}
        closeModal={() => setModalImportIsOpen(false)}
      />
      <ModalCreatePlaylist
        modalIsOpen={modalIsOpenCreate}
        closeModal={() => setModalCreateIsOpen(false)}
      />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.foreground,
  },
  containerButton: {
    height: 50,
    marginTop: 5,
    marginBottom: 15,
    width: "65%",
    alignSelf: "center",
  },
  button: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: darken(0.1, colors.purple),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: darken(0.1, colors.purple),
    marginLeft: 15,
    fontFamily: fonts.complement,
    fontSize: 18,
  },
  empty: {
    textAlign: "center",
    color: colors.pink,
    fontFamily: fonts.complement,
    fontSize: 16,
    marginHorizontal: 25,
    marginVertical: 25,
  },
});
