import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import Animated from "react-native-reanimated";
import {
  SpringScrollView,
  SpringScrollViewPropType,
} from "react-native-spring-scrollview";

export const AnimatedMyScrollView: React.FC<any> = ({ children, ...props }) => {
  const AnimatedSpringScrollView =
    Animated.createAnimatedComponent(SpringScrollView);

  return (
    <AnimatedSpringScrollView {...props}>{children}</AnimatedSpringScrollView>
  );
};

const MyScrollView: React.FC<ScrollViewProps> = ({ children, ...props }) => {
  return <ScrollView {...props}>{children}</ScrollView>;
};

export default MyScrollView;
