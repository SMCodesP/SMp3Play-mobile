import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface TouchableScalable extends TouchableOpacityProps {
  scaleTo: number;
  duration: number;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onPressOut?: any;
  onPressIn?: any;
}

const TouchableScalable: React.FC<TouchableScalable> = ({
  scaleTo,
  duration,
  style,
  children,
  onPressOut,
  onPressIn,
  buttonStyle,
  ...props
}) => {
  const pressed = useSharedValue(false);
  const progress = useDerivedValue(() =>
    pressed.value
      ? withTiming(scaleTo, { duration })
      : withTiming(1, { duration })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
  }));

  return (
    <TouchableOpacity
      onPressIn={() => {
        pressed.value = true
        onPressIn && onPressIn();
      }}
      onPressOut={() => {
        pressed.value = false;
        onPressOut && onPressOut();
      }}
      style={buttonStyle}
      {...props}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </TouchableOpacity>
  );
};

export default TouchableScalable;
