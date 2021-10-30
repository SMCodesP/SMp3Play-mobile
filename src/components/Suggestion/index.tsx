import React from "react";
import {
  View,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather"

import { lighten } from "polished";
import { RectButton } from "react-native-gesture-handler";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const Suggestion: React.FC<{
  query: string;
  setQuery(text: string): void;
  handleQuery(obj: {}): Promise<void>;
  handlerTextChange(text: string): void | Promise<void>;
  item: string;
}> = ({
  query,
  setQuery,
  handleQuery,
  item,
  handlerTextChange,
}) => {
  return (
    <View style={{flexDirection: "row"}}>
      <RectButton
        style={{
          //TouchableScalableBorderRadiusborderRadius: 10,
          flex: 1,
        }}
        rippleColor={lighten(0.1, colors.background)}
        onPress={() => {
          setQuery(item)
          handleQuery({ initialQuery: item })
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 10,
          }}
          accessible
        >
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
          }}>
            <Ionicons
              name="search"
              size={22}
              color={colors.foreground}
              style={{
                paddingRight: 10,
              }}
            />
            <Text style={{ paddingVertical: 5 }}>
              {item.match(new RegExp(`.{1,${query.length === 0 ? 1 : query.length}}`, "g"))?.map((text, index) => (
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: text.trim() === query.toLowerCase().trim() ? fonts.text : fonts.heading,
                    color: colors.foreground,
                  }}
                  key={`${text}_${index}`}
                >
                  {text}
                </Text>
              ))}
            </Text>
          </View>
        </View>
      </RectButton>
      <RectButton
        style={{
          width: 50,
          minHeight: 50,
          justifyContent: "center",
          alignItems: "center",
          //TouchableScalableBorderRadiusborderRadius: 10,
        }}
        rippleColor={lighten(0.1, colors.background)}
        onPress={() => {
          handlerTextChange(item)
        }}
      >
        <View accessible>
          <Feather
            name="arrow-up-left"
            size={22}
            color={colors.foreground}
          />
        </View>
      </RectButton>
    </View>
  )
}

export default Suggestion