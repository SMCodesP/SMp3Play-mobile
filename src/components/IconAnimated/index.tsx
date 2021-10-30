import React from "react";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import colors from "../../styles/colors";

const IconAnimated: React.FC<{
  IconProvider: any;
  iconName: any;
  size: number;
  alternativeIconName?: string;
}> = ({ IconProvider, alternativeIconName, iconName, size }) => {
  const isFocused = useIsFocused();
  const progress = useDerivedValue(() =>
    isFocused
      ? withTiming(1, { duration: 250 })
      : withTiming(0, { duration: 250 })
  );

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        progress.value,
        [0, 1],
        [colors.purple, colors.pink]
      ),
      transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.2]) }],
    };
  }, []);

  const AIcon: any = Animated.createAnimatedComponent(IconProvider);

  return (
    <AIcon
      name={isFocused ? iconName : alternativeIconName || iconName}
      style={textStyle}
      size={size}
    />
  );
};

export default IconAnimated;
