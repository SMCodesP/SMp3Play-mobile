import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { Pressable, PressableStateCallbackType, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../styles/colors";

export const FavoriteButton: React.FC<{
  size: number;
  color: string;
  onPress?: () => Promise<void> | void;
  style?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  actived?: boolean;
}> = ({ actived, size, color, onPress, style }) => {
  const liked = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0.25], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    };
  });

  useEffect(() => {
    liked.value = withSpring(actived ? 1 : 0, { mass: 2.5 })
  }, [actived])

  return (
    <Pressable onPress={() => {
      onPress && onPress()
    }} style={style}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <AntDesign
          name={"hearto"}
          size={size}
          color={colors.pink}
        />
      </Animated.View>

      <Animated.View style={fillStyle}>
        <AntDesign name={"heart"} size={size} color={color} />
      </Animated.View>
    </Pressable>
  );
};