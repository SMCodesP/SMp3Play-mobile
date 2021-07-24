import React from 'react';
import { StatusBar } from 'react-native'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";

import { Routes } from './src/routes';
import colors from './src/styles/colors';

export default function App() {
  const [fontIsLoading] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontIsLoading) return <AppLoading />;

  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
    </>
  );
}
