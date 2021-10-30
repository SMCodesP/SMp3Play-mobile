import { BlurView } from '@react-native-community/blur';
import { transparentize } from 'polished';
import React from 'react';
import { Modal, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import colors from '../../styles/colors';

export interface ModalCustomProps {
  modalIsOpen: boolean;
}

const ModalCustom: React.FC<ModalCustomProps> = ({ modalIsOpen, children }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalIsOpen} statusBarTranslucent={true}>
      <BlurView style={styles.blurModal} blurAmount={2} blurRadius={10} overlayColor={transparentize(0.5, colors.background)} />
      <KeyboardAvoidingView behavior={"height"} style={styles.centeredView}>
        {children}
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
})

export default ModalCustom;