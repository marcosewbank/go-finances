import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { Apple } from "../../assets/Apple";
import { Google } from "../../assets/Google";
import { Logo } from "../../assets/Logo";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
} from "./styles";

export const SignIn = () => {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo />

          <Title>
            Controle suas {"\n"} finanças de uma forma {"\n"} muito mais
            simples!
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer></Footer>
    </Container>
  );
};
