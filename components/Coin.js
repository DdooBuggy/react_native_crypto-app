import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";

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
const Icon = styled.Image`
  margin-bottom: 10px;
`;

const delayAnimaion = 200;
const maxIndexAnimaion = 32; // recommend x, x%3 = 2

const Coin = ({ symbol, index }) => {
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
    <Wrapper
      style={{
        width: CoinBoxLength,
        height: CoinBoxLength,
        opacity,
        transform: [{ scale }],
      }}
    >
      <Icon
        style={{ width: CoinBoxLength / 3, height: CoinBoxLength / 3 }}
        source={{
          uri: `https://coinicons-api.vercel.app//api/icon/${symbol.toLowerCase()}`,
        }}
      />
      <CoinName>{symbol}</CoinName>
    </Wrapper>
  );
};

export default React.memo(Coin);
