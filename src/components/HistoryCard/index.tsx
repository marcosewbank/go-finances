import React from "react";
import { Container, Title, Amount } from "./styles";

type Props = {
  color: string;
  title: string;
  amount: string;
};

export const HistoryCard = ({ color, title, amount }: Props) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
