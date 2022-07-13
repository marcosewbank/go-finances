import React from "react";
import { categories } from "../../utils/categories";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
  id: string;
}

interface Props {
  data: TransactionCardProps;
}

export const TransactionCard = ({
  data: { type, name, amount, category, date },
}: Props) => {
  const [currentCategory] = categories.filter((item) => item.key === category);

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === "negative" && "-"}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={currentCategory.icon} />
          <CategoryName>{currentCategory.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
