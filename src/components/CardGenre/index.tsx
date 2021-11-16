import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

import { getColor } from "get-color-sm";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { getLuminance } from "polished";
import { TouchableScalable } from "../Buttons/TouchableScalable";

const generateColorLight = (): string => {
  const color = getColor();
  return getLuminance(`#${color}`) > 0.5 ? color : generateColorLight();
};

const CardGenre: React.FC<{
  item: {
    name: string;
    query: string;
  };
  onPress(): void;
}> = ({ item, onPress }) => {
  const color = useMemo(() => generateColorLight(), []);

  return (
    <TouchableScalable
      duration={100}
      scaleTo={0.95}
      activeOpacity={0.75}
      buttonStyle={{
        flex: 1,
        height: 100,
        margin: 5,
      }}
      borderRadius={15}
      style={[
        styles.genre,
        {
          backgroundColor: `#${color}`,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.genreName,
          {
            color:
              getLuminance(`#${color}`) > 0.2
                ? colors.background
                : colors.foreground,
          },
        ]}
      >
        {item.name}
      </Text>
    </TouchableScalable>
  );
};

const styles = StyleSheet.create({
  genre: {
    flex: 1,
    backgroundColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
  },
  genreName: {
    fontFamily: fonts.complement,
    fontSize: 18,
    textAlign: "center",
  },
});

export default CardGenre;
