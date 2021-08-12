import React, { useEffect } from "react";
import { BlurView } from "@react-native-community/blur";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { lighten } from "polished";

import Player from "../Player";
import { MiniPlayer } from "../MiniPlayer";
import colors from "../../styles/colors";
import { Dimensions } from "react-native";
import { usePlayer } from "../../contexts/player";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const BottomTab: React.FC<{
  bottomTabBarProps: BottomTabBarProps;
}> = ({ bottomTabBarProps }) => {
  const playerPosY = useSharedValue(WINDOW_HEIGHT);
  const bottomTabPosY = useSharedValue(0);
  const { track } = usePlayer();

  const close = () => {
    playerPosY.value = withSpring(WINDOW_HEIGHT);
    bottomTabPosY.value = withTiming(0, {
      duration: 500,
    });
  };

  const open = () => {
    playerPosY.value = withSpring(0);
    bottomTabPosY.value = withSpring(110);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_event, ctx: any) {
      ctx.playerPosY = playerPosY.value;
      ctx.bottomTabPosY = bottomTabPosY.value;
    },
    onActive(event, ctx: any) {
      playerPosY.value = ctx.playerPosY + event.translationY;
      bottomTabPosY.value = ctx.bottomTabPosY + Math.abs(event.translationY);
    },
    onEnd(event) {
      if (
        event.velocityY <= -2500 ||
        event.absoluteY <= (WINDOW_HEIGHT / 100) * 75
      ) {
        playerPosY.value = withSpring(0);
        bottomTabPosY.value = withSpring(110);
      } else {
        playerPosY.value = withSpring(WINDOW_HEIGHT);
        bottomTabPosY.value = withTiming(0, {
          duration: 500,
        });
      }
    },
  });

  const playerPositionStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: playerPosY.value,
      },
    ],
  }));

  const bottomTabPositionStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: bottomTabPosY.value,
      },
    ],
  }));

  useEffect(() => {
    if (!track) {
      close();
    }
  }, [track]);

  return (
    <>
      {track && (
        <PanGestureHandler minDist={100} onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              {
                flex: 1,
                height: "100%",
                position: "absolute",
                backgroundColor: lighten(0.035, colors.background),
              },
              playerPositionStyle,
            ]}
          >
            <Player onPress={close} />
          </Animated.View>
        </PanGestureHandler>
      )}
      <Animated.View
        style={[
          {
            height: 110,
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          },
          bottomTabPositionStyle,
        ]}
      >
        {track && (
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              style={{
                width: "100%",
                height: 65,
                position: "absolute",
              }}
            >
              <MiniPlayer onOpen={open} />
            </Animated.View>
          </PanGestureHandler>
        )}
        <BlurView
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
          }}
          blurType="dark"
          blurAmount={8}
          blurRadius={20}
          overlayColor="transparent"
        >
          <BottomTabBar {...bottomTabBarProps} />
        </BlurView>
      </Animated.View>
    </>
  );
};

export default BottomTab;
