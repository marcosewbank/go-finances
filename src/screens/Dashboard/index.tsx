import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  TransactionList,
  Transactions,
  Title,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

interface HighlightProps {
  amount: string | undefined;
  lastTransaction: string | undefined;
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>();
  const isFocused = useIsFocused();

  const theme = useTheme();

  useEffect(() => {
    if (isFocused) {
      loadTransaction();
    }
  }, [isFocused]);

  const getLastTransactionDate = (
    collection: DataListProps[],
    type: "positive" | "negative"
  ) => {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  };

  const loadTransaction = async () => {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          type: item.type,
          category: item.category,
          amount,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );

    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saida dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/27689698",
                  }}
                />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Marcos</UserName>
                </User>
              </UserInfo>

              <Icon name="power" />
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData?.entries.amount}
              lastTransaction={highlightData?.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saidas"
              amount={highlightData?.expensive.amount}
              lastTransaction={highlightData?.expensive.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total.amount}
              lastTransaction={highlightData?.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};
