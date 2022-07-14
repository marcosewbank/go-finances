import React from "react";
import { Alert } from "react-native";

import { Apple } from "../../assets/Apple";
import { Google } from "../../assets/Google";
import { Logo } from "../../assets/Logo";

import { useAuth } from "../../hooks/auth";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export const SignIn = () => {
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("🚀 ~ error", error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  };

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

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Apple" svg={Apple} />
          <SignInSocialButton
            title="Entrar com o Google"
            svg={Google}
            onPress={() => handleSignInWithGoogle()}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
