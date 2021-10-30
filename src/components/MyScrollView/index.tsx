import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SpringScrollView, SpringScrollViewPropType } from "react-native-spring-scrollview";


export const AnimatedMyScrollView: React.FC<any> = ({ children,  ...props}) => {
  const AnimatedSpringScrollView = Animated.createAnimatedComponent(SpringScrollView)

  return (
    <AnimatedSpringScrollView {...props}>{children}</AnimatedSpringScrollView>
  )
}

const MyScrollView: React.FC<SpringScrollViewPropType> = ({ children,  ...props}) => {
  return (
    <SpringScrollView {...props}>{children}</SpringScrollView>
  )
}

export default MyScrollView;
