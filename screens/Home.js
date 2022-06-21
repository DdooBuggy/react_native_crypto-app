import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { getCoins } from "../api";
import colors from "../colors";
import Coin from "../components/Coin";
import Loader from "../components/Loader";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CoinsGapLength = (SCREEN_WIDTH * 0.1) / 4;

const Container = styled.View`
  background-color: ${colors.backgroundColor};
  flex: 1;
`;
const List = styled.FlatList``;

const Home = () => {
  const { isLoading, data } = useQuery("coins", getCoins);
  const [cleanData, setCleanData] = useState([]);
  useEffect(() => {
    if (data) {
      setCleanData(
        data
          .filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
          .slice(0, 100)
      );
    }
  }, [data]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container style={{ paddingTop: CoinsGapLength }}>
      <List
        data={cleanData}
        columnWrapperStyle={{
          justifyContent: "space-evenly",
          marginBottom: CoinsGapLength,
        }}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin index={index} symbol={item.symbol} />
        )}
      />
    </Container>
  );
};

export default Home;
