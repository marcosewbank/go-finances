import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: number;
}

const schema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .positive("O valor não pode ser negativo")
    .typeError("Informe um valor númerico")
    .required("O valor é obrigatório"),
});

export const Register = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleTransactionTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleRegister = (form: FormData) => {
    if (!transactionType) Alert.alert("Selecione o tipo da transação");

    if (category.key === "category") Alert.alert("Selecione a categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      category: category.key,
      transactionType,
    };

    console.log("🚀 ~ file: index.tsx ~ line 55 ~ handleRegister ~ data", data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && JSON.stringify(errors.name.message)}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && JSON.stringify(errors.amount.message)}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="income"
                isActive={transactionType === "up"}
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                type="down"
                title="outcome"
                isActive={transactionType === "down"}
                onPress={() => handleTransactionTypeSelect("down")}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit((formData) =>
              handleRegister(formData as FormData)
            )}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
