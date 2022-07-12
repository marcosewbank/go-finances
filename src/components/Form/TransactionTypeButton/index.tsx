import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export const TransactionTypeButton = ({
  isActive,
  title,
  type,
  ...rest
}: Props) => {
  return (
    <Container {...rest} type={type} isActive={isActive}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};
