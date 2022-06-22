import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from "victory-native";
import { getDetail, getHistory } from "../api";
import colors from "../colors";
import Loader from "../components/Loader";
import { Icon, coinIconUrl } from "../utils";

const Container = styled.ScrollView`
  background-color: ${colors.backgroundColor};
  flex: 1;
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const HeaderTitle = styled.Text`
  font-size: 25px;
  color: ${colors.textColor};
  margin-left: 5px;
`;
const PriceList = styled.View`
  margin: 10px 20px;
`;
const PriceBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 5px;
  border-radius: 10px;
  background-color: ${colors.backgroundColorGrey};
`;
const PriceTitle = styled.Text`
  color: ${colors.textColor};
`;
const PriceData = styled.Text``;

const Detail = ({
  route: {
    params: { symbol, id },
  },
  navigation,
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Header>
          <Icon
            style={{ width: 30, height: 30 }}
            source={{ uri: coinIconUrl(symbol) }}
          />
          <HeaderTitle>{symbol}</HeaderTitle>
        </Header>
      ),
    });
  }, []);
  const { isLoading: detailLoading, data: detailData } = useQuery(
    ["coinDetail", id],
    getDetail
  );
  const { isLoading: historyLoading, data: historyData } = useQuery(
    ["coinHistory", id],
    getHistory
  );
  const [victoryData, setVictoryData] = useState(null);
  //   const [victoryAxisX, setVictoryAxisX] = useState(null);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData?.map((item) => ({
          x: new Date(item.timestamp).getTime(),
          y: item.price,
        }))
      );
      //   setVictoryAxisX(historyData.map((item) => item.timestamp.slice(11, 15)));
    }
  }, [historyData]);
  const [priceDataKeys, setPriceDataKeys] = useState([]);
  useEffect(() => {
    if (detailData) {
      const array = Object.keys(detailData?.quotes?.USD);
      setPriceDataKeys(
        array.splice(2, 12).filter((item) => item !== "market_cap")
      );
    }
  }, [detailData]);
  if (detailLoading || historyLoading || !victoryData) {
    return <Loader />;
  }
  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            data={victoryData}
            animate
            interpolation="monotoneX"
            style={{ data: { stroke: "#1abc9c" } }}
          />
          <VictoryScatter
            data={victoryData}
            style={{ data: { fill: "#1abc9c" } }}
          />
        </VictoryChart>
      ) : null}
      <PriceList>
        <PriceBox>
          <PriceTitle>Current Price</PriceTitle>
          <PriceData style={{ color: colors.accent }}>
            $ {detailData?.quotes?.USD?.price}
          </PriceData>
        </PriceBox>
        {detailData
          ? priceDataKeys.map((price) => (
              <PriceBox key={price}>
                <PriceTitle>{price}</PriceTitle>
                {detailData?.quotes?.USD[price] < 0 ? (
                  <PriceData style={{ color: "red" }}>
                    ▽{detailData?.quotes?.USD[price]} %
                  </PriceData>
                ) : (
                  <PriceData style={{ color: "green" }}>
                    △{detailData?.quotes?.USD[price]} %
                  </PriceData>
                )}
              </PriceBox>
            ))
          : null}
      </PriceList>
    </Container>
  );
};

export default Detail;
