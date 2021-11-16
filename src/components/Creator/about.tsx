import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const AboutCreator: React.FC<{
  creator: TCreator | null;
}> = ({ creator }) => {
  return (
    <View>
      <Text style={styles.description}>{creator?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.foreground,
  },
});
