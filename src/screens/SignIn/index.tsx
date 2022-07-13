import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/google.svg";

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
          {/* <LogoSvg /> */}

          <Title>
            Controle suas {"\n"} finanças de uma forma {"\n"} muito mais
            simples!
          </Title>
        </TitleWrapper>
      </Header>

      <SignInTitle>Faça seu login com {"\n"} uma das contas abaixo</SignInTitle>

      <Footer></Footer>
    </Container>
  );
};
