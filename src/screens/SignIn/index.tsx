import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

import { useTheme } from "styled-components";

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
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const theme = useTheme();

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log("🚀 ~ error", error);
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
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
          <SignInSocialButton
            title="Entrar com o Google"
            svg={Google}
            onPress={() => handleSignInWithGoogle()}
          />
        </FooterWrapper>

        {isLoading ? (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ height: 50 }}
          />
        ) : (
          <></>
        )}
      </Footer>
    </Container>
  );
};
