import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { getCoins } from "../api";
import { BLACK_COLOR } from "../colors";
import Coin from "../components/Coin";
import Loader from "../components/Loader";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;
const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
`;

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
    <Container>
      <List
        data={cleanData}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrapperStyle={{
          justifyContent: "space-between",
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
