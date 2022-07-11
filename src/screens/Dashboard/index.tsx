import React from "react";

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
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de Site",
      amount: "R$ 12.000,00",
      date: "13/04/2020",
      category: { name: "vendas", icon: "dollar-sign" },
    },
    {
      id: "2",
      type: "negative",
      title: "Aluguel de teste",
      amount: "R$ 1.000,00",
      date: "13/04/2020",
      category: { name: "Alimentação", icon: "coffee" },
    },
    {
      id: "3",
      type: "positive",
      title: "Desenvolvimento de jogos",
      amount: "R$ 199.000,00",
      date: "13/04/2022",
      category: { name: "vendas", icon: "dollar-sign" },
    },
  ];

  return (
    <Container>
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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransaction="Última saida dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 17.400,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
