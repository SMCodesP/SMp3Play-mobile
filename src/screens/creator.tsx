import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import { View, Text, StyleSheet } from "react-native";

import Animated, { Extrapolate, useValue } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { darken } from "polished";
import Feather from "react-native-vector-icons/Feather";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { useCreator } from "../contexts/player";

import GlobalContainer from "../components/GlobalContainer";

import { getRandomInt } from "../utils/randomNumber";

import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AnimatedMyScrollView } from "../components/MyScrollView";
import CreatorRoutes from "../components/Creator/creator.routes";
import { AboutCreator } from "../components/Creator/about";

const AnimatedImageBackground = Animated.createAnimatedComponent(
  FastImage as any
) as any;

const IMAGE_HEIGHT = 275;

const Creator: React.FC<{
  route: {
    params: {
      video: TMinimalInfo | null;
      creatorId: string;
    };
  };
  navigation: any;
}> = ({
  route: {
    params: { creatorId },
  },
  navigation,
}) => {
  const scrollY = useValue(0);
  const creator = useCreator(creatorId);

  const handleBack = async () => {
    navigation.goBack();
  };

  return (
    <GlobalContainer>
      {creator ? (
        <AnimatedImageBackground
          source={{ uri: creator.authorBanner.url }}
          style={{
            ...StyleSheet.absoluteFillObject,
            top: 0,
            height: IMAGE_HEIGHT,
            width: "100%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, IMAGE_HEIGHT],
                  outputRange: [0, -IMAGE_HEIGHT],
                  extrapolate: Extrapolate.CLAMP,
                }),
                scale: scrollY.interpolate({
                  inputRange: [-IMAGE_HEIGHT * 2, 0],
                  outputRange: [5.5, 1],
                  extrapolate: Extrapolate.CLAMP,
                }),
              },
            ],
          }}
        >
          <LinearGradient
            style={{
              flex: 1,
              top: 1,
            }}
            locations={[0, 1, 0]}
            colors={["#00000044", colors.background, "#00000000"]}
          >
            <TouchableOpacity
              style={{
                margin: 15,
                width: 40,
                height: 40,
              }}
              onPress={handleBack}
            >
              <Feather
                name="chevron-left"
                size={40}
                color={colors.foreground}
              />
            </TouchableOpacity>
          </LinearGradient>
        </AnimatedImageBackground>
      ) : (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: darken(0.15, colors.comment),
            top: 0,
            height: IMAGE_HEIGHT,
            width: "100%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, IMAGE_HEIGHT],
                  outputRange: [0, -IMAGE_HEIGHT],
                  extrapolate: Extrapolate.CLAMP,
                }),
                scale: scrollY.interpolate({
                  inputRange: [-IMAGE_HEIGHT * 2, 0],
                  outputRange: [5.5, 1],
                  extrapolate: Extrapolate.CLAMP,
                }),
              },
            ],
          }}
        >
          <LinearGradient
            style={{
              flex: 1,
              top: 1,
            }}
            locations={[0, 1, 0]}
            colors={["#00000000", colors.background, "#00000000"]}
          />
          <TouchableOpacity
            style={{
              ...StyleSheet.absoluteFillObject,
              top: 15,
              left: 15,
            }}
            onPress={handleBack}
          >
            <Feather
              style={{
                ...StyleSheet.absoluteFillObject,
                top: 15,
                left: 15,
              }}
              name="chevron-left"
              size={40}
              color={colors.foreground}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      <AnimatedMyScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.containerBody}>
          <View style={styles.containerHeaderInfo}>
            <SkeletonContent
              isLoading={!creator}
              containerStyle={{ padding: 0, margin: 0 }}
              boneColor={darken(0.15, colors.comment)}
              highlightColor={darken(0.1, colors.comment)}
              animationType="pulse"
              duration={2500}
              layout={[
                {
                  key: "description1",
                  width: 152,
                  height: 152,
                  borderRadius: 20,
                  padding: 0,
                  margin: 0,
                },
              ]}
            >
              <FastImage
                style={styles.authorAvatar}
                source={{ uri: String(creator?.authorThumbnail.url || "") }}
              />
            </SkeletonContent>
            <View style={styles.containerTitle}>
              <SkeletonContent
                isLoading={!creator}
                containerStyle={{ padding: 0, margin: 0 }}
                boneColor={darken(0.15, colors.comment)}
                highlightColor={darken(0.1, colors.comment)}
                animationType="pulse"
                duration={2500}
                layout={[
                  {
                    key: "title",
                    width: `${getRandomInt(45, 100)}%`,
                    height: 16,
                    margin: 15,
                  },
                ]}
              >
                <Text style={styles.title}>{creator?.author}</Text>
              </SkeletonContent>
            </View>
          </View>
          <AboutCreator creator={creator} />
          {/* <CreatorRoutes creator={creator} /> */}
        </View>
      </AnimatedMyScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderBottomWidth: 2,
    borderBottomColor: colors.comment,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  containerBody: {
    marginHorizontal: 10,
    paddingTop: IMAGE_HEIGHT,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.foreground,
  },
  authorAvatar: {
    width: 152,
    height: 152,
    borderRadius: 20,
  },
  containerHeaderInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
    top: -64,
  },
  containerTitle: {
    flex: 1,
  },
  title: {
    color: colors.foreground,
    fontFamily: fonts.heading,
    margin: 15,
    fontSize: 22,
  },
});

export default memo(Creator);
