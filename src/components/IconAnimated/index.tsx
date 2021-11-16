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
  focused: boolean;
}> = ({ IconProvider, focused, alternativeIconName, iconName, size }) => {
  // const progress = useDerivedValue(() =>
  //   isFocused
  //     ? withTiming(1, { duration: 250 })
  //     : withTiming(0, { duration: 250 })
  // );

  // const textStyle = useAnimatedStyle(() => {
  //   return {
  //     color: interpolateColor(
  //       progress.value,
  //       [0, 1],
  //       [colors.purple, colors.pink]
  //     ),
  //     transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.2]) }],
  //   };
  // }, []);

  // const AIcon: any = Animated.createAnimatedComponent(IconProvider);

  return (
    <IconProvider
      name={focused ? iconName : alternativeIconName || iconName}
      style={{
        transform: [{ scale: focused ? 1.2 : 1 }],
      }}
      size={size}
      color={focused ? colors.pink : colors.purple}
    />
  );
};

export default IconAnimated;
