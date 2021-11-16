import React, { useEffect } from "react";
import {
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  View,
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
  borderRadius?: number;
  opacity?: number;
  opacityActived?: number;
}

const RectButtonAnimated = Animated.createAnimatedComponent(RectButton) as any;
const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export const TouchableScalable: React.FC<TouchableScalable> = ({
  scaleTo,
  duration,
  style,
  children,
  onPressOut,
  onPressIn,
  buttonStyle,
  rectButton = false,
  enabled = true,
  borderRadius = 0,
  opacityActived = 1,
  opacity = 1,
  ...props
}) => {
  const pressed = useSharedValue(false);
  const progress = useDerivedValue(() =>
    pressed.value
      ? withTiming(scaleTo, { duration })
      : withTiming(1, { duration })
  );
  const progressOpacity = useDerivedValue(() =>
    pressed.value
      ? withTiming(opacityActived, { duration })
      : withTiming(opacity, { duration })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
    opacity: progressOpacity.value,
  }));

  return rectButton ? (
    <Animated.View
      style={[buttonStyle, animatedStyle, { borderRadius, overflow: "hidden" }]}
    >
      <RectButtonAnimated
        onBegan={() => {
          pressed.value = true;
          onPressIn && onPressIn();
        }}
        onEnded={() => {
          pressed.value = false;
          onPressOut && onPressOut();
        }}
        onCancelled={() => {
          pressed.value = false;
        }}
        style={[{ flex: 1 }, animatedStyle]}
        enabled={enabled}
        {...props}
      >
        <Animated.View style={[style, animatedStyle, { borderRadius }]}>
          {children}
        </Animated.View>
      </RectButtonAnimated>
    </Animated.View>
  ) : (
    <Animated.View
      style={[buttonStyle, animatedStyle, { borderRadius, overflow: "hidden" }]}
    >
      <TouchableAnimated
        onPressIn={() => {
          pressed.value = true;
          onPressIn && onPressIn();
        }}
        onPressOut={() => {
          pressed.value = false;
          onPressOut && onPressOut();
        }}
        style={[{ flex: 1 }, animatedStyle]}
        {...props}
      >
        <Animated.View
          style={[style, animatedStyle, { borderRadius, flex: 1 }]}
        >
          {children}
        </Animated.View>
      </TouchableAnimated>
    </Animated.View>
  );
};
