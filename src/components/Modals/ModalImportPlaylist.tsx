import React, { useState, useEffect } from "react";
import {
  View,
  ToastAndroid,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";

import Ionicons from "react-native-vector-icons/Ionicons";

import Animated from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";

import { TouchableScalable } from "../Buttons/TouchableScalable";

import { usePlaylist } from "../../contexts/playlist";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import ModalCustom, { ModalCustomProps } from "../ModalCustom";

interface ModalImportPlaylist extends ModalCustomProps {
  closeModal(): void;
}

const ModalImportPlaylist: React.FC<any> = ({ modalIsOpen, closeModal }) => {
  const [data, setData] = useState("");
  const { importPlaylist } = usePlaylist();

  const handleImport = async () => {
    try {
      await importPlaylist(data);
      closeModal();
    } catch (error) {
      if ((error as any).name !== "Error") {
        ToastAndroid.show(
          "Não foi possível criar essa playlist.",
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show((error as any).message, ToastAndroid.SHORT);
      }
    }
  };

  useEffect(() => {
    setData("");
  }, [modalIsOpen]);

  return (
    <ModalCustom modalIsOpen={modalIsOpen}>
      <Shadow
        distance={10}
        startColor={`${colors.currentLine}33`}
        finalColor={`${colors.currentLine}00`}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Cole aqui o texto de exportação"
            placeholderTextColor={colors.currentLine}
            multiline={true}
            style={styles.importText}
            onChangeText={setData}
            value={data}
          />
          <View style={styles.containerButtons}>
            <TouchableScalable
              buttonStyle={styles.containerButtonModal}
              duration={100}
              scaleTo={0.95}
              style={[
                styles.modalButton,
                {
                  backgroundColor: colors.pink,
                },
              ]}
              onPressOut={handleImport}
            >
              <Animated.Text style={styles.textButtonModal}>
                Importar playlist
              </Animated.Text>
            </TouchableScalable>
            <TouchableScalable
              duration={100}
              scaleTo={0.95}
              rectButton={false}
              activeOpacity={1}
              style={styles.containerButtonModal}
              delayPressOut={100}
              onPressOut={closeModal}
            >
              <RectButton
                style={{
                  flex: 1,
                  //TouchableScalableBorderRadiusborderRadius: 50,
                }}
                rippleColor={colors.red}
              >
                <View style={styles.modalButton} accessible>
                  <Animated.Text
                    style={[
                      styles.textButtonModal,
                      {
                        color: colors.red,
                      },
                    ]}
                  >
                    Cancelar
                  </Animated.Text>
                </View>
              </RectButton>
            </TouchableScalable>
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
    padding: 15,
  },
  containerButtons: {},
  containerButtonModal: {
    //TouchableScalableBorderRadiusborderRadius: 50,
    height: 50,
    width: "75%",
    alignSelf: "center",
    marginVertical: 5,
  },
  modalButton: {
    //TouchableScalableBorderRadiusborderRadius: 50,
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonModal: {
    color: colors.background,
    marginLeft: 15,
    fontFamily: fonts.complement,
    fontSize: 18,
  },
  importText: {
    color: colors.foreground + "55",
    width: 250,
    fontSize: 15,
    alignSelf: "center",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.comment,
    marginBottom: 15,
  },
});

export default ModalImportPlaylist;
