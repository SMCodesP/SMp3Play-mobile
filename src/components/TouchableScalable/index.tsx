import React from "react";
import {
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
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
  rectButton?: boolean;
  enabled?: boolean;
  rippleColor?: string;
}

const RectButtonAnimated = Animated.createAnimatedComponent(RectButton) as any
const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity) as any

const TouchableScalable: React.FC<TouchableScalable> = ({
  scaleTo,
  duration,
  style,
  children,
  onPressOut,
  onPressIn,
  buttonStyle,
  rectButton = false,
  enabled = true,
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

  return rectButton ? (
    <RectButtonAnimated
      onBegan={() => {
        pressed.value = true;
        onPressIn && onPressIn();
      }}
      onEnded={() => {
        pressed.value = false;
        onPressOut && onPressOut();
      }}
      style={[buttonStyle, animatedStyle]}
      enabled={enabled}
      {...props}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </RectButtonAnimated>
  ) : (
    <TouchableAnimated
      onPressIn={() => {
        pressed.value = true;
        onPressIn && onPressIn();
      }}
      onPressOut={() => {
        pressed.value = false;
        onPressOut && onPressOut();
      }}
      style={[buttonStyle, animatedStyle]}
      {...props}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </TouchableAnimated>
  );
};

export default TouchableScalable;
