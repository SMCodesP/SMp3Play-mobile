import { BlurView } from '@react-native-community/blur';
import { darken, lighten, transparentize } from 'polished';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Jiro } from 'react-native-textinput-effects';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { CardPlaylist } from '../components/CardPlaylist';
import GlobalContainer from '../components/GlobalContainer';
import MyScrollView from '../components/MyScrollView';
import TouchableScalable from '../components/Buttons/TouchableScalable';
import ModalImportPlaylist from '../components/Modals/ModalImportPlaylist';
import { usePlaylist } from '../contexts/playlist';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const Playlists: React.FC = () => {
  const {playlists, createPlaylist} = usePlaylist();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImportIsOpen, setModalImportIsOpen] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState("");

  const handleSubmit = () => {
    createPlaylist(namePlaylist)
    handleClose();
  }

  const handleClose = () => {
    setNamePlaylist("")
    setModalIsOpen(false)
  }

  return (
    <GlobalContainer>
      <MyScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Playlists</Text>
        <TouchableScalable
          buttonStyle={styles.containerButton}
          rectButton={true}
          duration={100}
          scaleTo={0.95}
          rippleColor={colors.purple}
          delayPressOut={100}
          onPressOut={() => setModalIsOpen(state => !state)}
          style={styles.button}
        >
          <Ionicons name="add" size={26} color={darken(0.1, colors.purple)} />
          <Animated.Text style={styles.textButton}>Criar playlist</Animated.Text>
        </TouchableScalable>
        <TouchableScalable
          buttonStyle={styles.containerButton}
          rectButton={true}
          duration={100}
          scaleTo={0.95}
          rippleColor={darken(0.4, colors.pink)}
          delayPressOut={100}
          onPressOut={() => setModalImportIsOpen(state => !state)}
          style={[styles.button, {
            borderColor: colors.pink,
            backgroundColor: colors.pink
          }]}
        >
          <MaterialCommunityIcons name="import" size={26} color={colors.background} />
          <Animated.Text style={[styles.textButton, {
            color: colors.background,
          }]}>Importar playlist</Animated.Text>
        </TouchableScalable>
        <FlatList
          data={playlists}
          renderItem={({ item }) => (
            <CardPlaylist
              playlist={item}
            />
          )}
          keyExtractor={({ name }) => name}
        />
      </MyScrollView>
      <ModalImportPlaylist modalIsOpen={modalImportIsOpen} closeModal={() => setModalImportIsOpen(false)} />
      <Modal animationType="fade" transparent={true} visible={modalIsOpen} statusBarTranslucent={true}>
        <BlurView  style={styles.blurModal} blurAmount={2} blurRadius={10} overlayColor={transparentize(0.5, colors.background)} />
        <View style={styles.centeredView}>
          <KeyboardAvoidingView style={styles.centeredView} behavior="padding">
            <TouchableWithoutFeedback touchSoundDisabled={true} onPress={Keyboard.dismiss}>
              <View style={styles.modalView}>
                <Text style={styles.titleModal}>Dê um nome à sua playlist</Text>
                <View style={styles.containerInput}>
                  <Jiro
                    label={"Nome da playlist"}
                    borderColor={colors.comment}
                    inputPadding={15}
                    inputStyle={{ color: colors.foreground }}
                    returnKeyType="done"
                    onChangeText={setNamePlaylist}
                    onSubmitEditing={handleSubmit}
                    value={namePlaylist}
                  />
                </View>
                <View>
                  <TouchableScalable 
                    buttonStyle={styles.containerButtonModal}
                    duration={100}
                    scaleTo={0.95}
                    style={[styles.modalButton, {
                      backgroundColor: colors.pink
                    }]}
                    delayPressOut={100}
                    onPressOut={handleSubmit}
                  >
                    <Ionicons name="add" size={26} color={colors.background} />
                    <Animated.Text style={styles.textButtonModal}>Criar playlist</Animated.Text>
                  </TouchableScalable>
                  <TouchableScalable 
                    duration={100}
                    scaleTo={0.95}
                    rectButton={false}
                    activeOpacity={1}
                    style={styles.containerButtonModal}
                    delayPressOut={100}
                    onPressOut={handleClose}
                  >
                    <RectButton
                      style={{
                        flex: 1,
                      }}
                      rippleColor={colors.red}
                    >
                      <View style={styles.modalButton} accessible>
                        <Animated.Text style={[styles.textButtonModal, {
                          color: colors.red
                        }]}>Cancelar</Animated.Text>
                      </View>
                    </RectButton>
                  </TouchableScalable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </GlobalContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.foreground
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: darken(0.1, colors.purple),
    marginLeft: 15,
    fontFamily: fonts.complement,
    fontSize: 18
  },
  blurModal: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "75%",
    backgroundColor: lighten(0.1, colors.background),
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 15,
    paddingBottom: 25
  },
  titleModal: {
    fontFamily: fonts.heading,
    color: colors.foreground,
    fontSize: 28
  },
  containerInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  containerButtonModal: {
    marginTop: 10,
    height: 50,
    width: "75%",
    alignSelf: "center",
  },
  textButtonModal: {
    color: colors.background,
    marginLeft: 15,
    fontFamily: fonts.complement,
    fontSize: 18
  },
  modalButton: {
    height: 50,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
