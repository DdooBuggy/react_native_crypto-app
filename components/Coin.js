import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";
import { coinIconUrl, Icon } from "../utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CoinBoxLength = SCREEN_WIDTH * 0.3;

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.backgroundColorGrey};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;
const CoinName = styled.Text`
  color: ${colors.textColor};
  font-weight: 600;
  font-size: 16px;
`;

const delayAnimaion = 200;
const maxIndexAnimaion = 32; // recommend x, x%3 = 2

const Coin = ({ id, symbol, index }) => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay:
        index > maxIndexAnimaion
          ? ((maxIndexAnimaion + 1) / 3) * delayAnimaion
          : Math.floor(index / 3) * delayAnimaion,
    }).start();
  }, []);
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { symbol, id })}
    >
      <Wrapper
        style={{
          width: CoinBoxLength,
          height: CoinBoxLength,
          opacity,
          transform: [{ scale }],
        }}
      >
        <Icon
          style={{
            marginBottom: 10,
            width: CoinBoxLength / 3,
            height: CoinBoxLength / 3,
          }}
          source={{
            uri: coinIconUrl(symbol),
          }}
        />
        <CoinName>{symbol}</CoinName>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default React.memo(Coin);
