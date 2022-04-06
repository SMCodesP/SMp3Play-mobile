import React, { useEffect, useState } from "react";
import { lighten } from "polished";
import {
  Keyboard,
  ToastAndroid,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Jiro } from "react-native-textinput-effects";
import Ionicons from "react-native-vector-icons/Ionicons";

import { usePlaylist } from "../../contexts/playlist";

import ModalCustom, { ModalCustomProps } from "../ModalCustom";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { TouchableScalable } from "../Buttons/TouchableScalable";

interface ModalCreatePlaylistProps extends ModalCustomProps {
  closeModal(): void;
}

const ModalCreatePlaylist: React.FC<ModalCreatePlaylistProps> = ({
  modalIsOpen,
  closeModal,
}) => {
  const { createPlaylist } = usePlaylist();
  const [namePlaylist, setNamePlaylist] = useState("");
  const [isInitialData, setIsInitialData] = useState(false);
  const [initialData, setInitialData] = useState("[]");

  useEffect(() => {
    setNamePlaylist("");
    setIsInitialData(false);
    setInitialData("[]");
  }, [modalIsOpen]);

  const handleSubmit = () => {
    if (!namePlaylist) {
      ToastAndroid.show(
        "O nome da playlist não pode ser vazio!",
        ToastAndroid.SHORT
      );
      handleClose();
      return;
    }
    createPlaylist(namePlaylist, JSON.parse(initialData));
    handleClose();
  };

  const handleClose = () => {
    setNamePlaylist("");
    closeModal();
  };

  return (
    <ModalCustom modalIsOpen={modalIsOpen}>
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={Keyboard.dismiss}
      >
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
            {isInitialData && (
              <Jiro
                label={"Cole aqui as músicas da playlist"}
                borderColor={colors.comment}
                inputPadding={15}
                inputStyle={{ color: colors.foreground }}
                returnKeyType="done"
                onChangeText={setInitialData}
                onSubmitEditing={handleSubmit}
                value={initialData}
              />
            )}
          </View>
          <View>
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
              delayPressOut={100}
              borderRadius={25}
              onPressOut={handleSubmit}
            >
              <Ionicons name="add" size={26} color={colors.background} />
              <Animated.Text style={styles.textButtonModal}>
                Criar playlist
              </Animated.Text>
            </TouchableScalable>
            <TouchableScalable
              duration={100}
              scaleTo={0.95}
              rectButton={false}
              activeOpacity={1}
              buttonStyle={styles.containerButtonModal}
              style={styles.modalButton}
              delayPressOut={100}
              borderRadius={25}
              onPressOut={handleClose}
            >
              <RectButton
                style={{
                  flex: 1,
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
            <TouchableScalable
              duration={100}
              scaleTo={0.95}
              rectButton={false}
              activeOpacity={1}
              buttonStyle={styles.containerButtonModal}
              style={styles.modalButton}
              delayPressOut={100}
              borderRadius={25}
              onPressOut={() => setIsInitialData((state) => !state)}
            >
              <RectButton
                style={{
                  flex: 1,
                }}
                rippleColor={colors.foreground}
              >
                <View style={styles.modalButton} accessible>
                  <Animated.Text
                    style={[
                      styles.textButtonModal,
                      {
                        color: colors.foreground,
                      },
                    ]}
                  >
                    Mais{" "}
                    <Ionicons
                      name={isInitialData ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={colors.foreground}
                    />
                  </Animated.Text>
                </View>
              </RectButton>
            </TouchableScalable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ModalCustom>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "75%",
    backgroundColor: lighten(0.1, colors.background),
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 15,
    paddingBottom: 25,
  },
  titleModal: {
    fontFamily: fonts.heading,
    color: colors.foreground,
    fontSize: 28,
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
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ModalCreatePlaylist;
