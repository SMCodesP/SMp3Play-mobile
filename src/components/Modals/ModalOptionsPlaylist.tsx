import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import {
  RectButton,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import ModalCustom, { ModalCustomProps } from "../ModalCustom";

import ButtonOption from "../Buttons/ButtonOption";
import { usePlaylist } from "../../contexts/playlist";
import { Shadow } from "react-native-shadow-2";

interface ModalOptionsPlaylist extends ModalCustomProps {
  closeModal(): void;
}

const ModalOptionsPlaylist: React.FC<any> = ({
  handleSearchSong,
  handleDownload,
  modalIsOpen,
  closeModal,
  handleDelete,
}) => {
  const navigation = useNavigation();
  const { exportPlaylist } = usePlaylist();

  return (
    <ModalCustom modalIsOpen={modalIsOpen}>
      <Shadow
        containerViewStyle={{ width: "50%" }}
        viewStyle={{ width: "100%" }}
        distance={10}
        startColor={`${colors.currentLine}33`}
        finalColor={`${colors.currentLine}00`}
      >
        <View style={styles.container}>
          <View
            style={{
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              overflow: "hidden",
            }}
          >
            <ButtonOption style={styles.button} rippleColor={colors.comment}>
              <TouchableWithoutFeedback
                onPress={() => {
                  closeModal();
                  handleDownload();
                }}
              >
                <Text style={styles.buttonText}>Baixar músicas</Text>
              </TouchableWithoutFeedback>
            </ButtonOption>
          </View>
          <ButtonOption style={styles.button} rippleColor={colors.comment}>
            <TouchableWithoutFeedback
              onPress={() => {
                closeModal();
                handleSearchSong();
              }}
            >
              <Text style={styles.buttonText}>Adicionar músicas</Text>
            </TouchableWithoutFeedback>
          </ButtonOption>
          <View style={styles.separator} />
          <TouchableWithoutFeedback onPress={handleDelete}>
            <ButtonOption style={styles.button} rippleColor={colors.red}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: colors.red,
                  },
                ]}
              >
                Excluir playlist
              </Text>
            </ButtonOption>
          </TouchableWithoutFeedback>
          <View
            style={{
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              overflow: "hidden",
            }}
          >
            <ButtonOption style={styles.button} rippleColor={colors.red}>
              <TouchableWithoutFeedback onPress={closeModal}>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: colors.red,
                    },
                  ]}
                >
                  Cancelar
                </Text>
              </TouchableWithoutFeedback>
            </ButtonOption>
          </View>
        </View>
      </Shadow>
    </ModalCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 15,
    width: "100%",
  },
  button: {
    paddingVertical: 15,
  },
  buttonText: {
    color: colors.foreground,
    fontFamily: fonts.complement,
    fontSize: 16,
    textAlign: "center",
  },
  separator: {
    width: "85%",
    height: 1,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: colors.selection,
    marginVertical: 5,
  },
});

export default ModalOptionsPlaylist;
