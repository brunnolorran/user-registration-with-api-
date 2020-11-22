import {
  ButtonStyledPrimary,
  TextFieldStyled,
  ContainerFormStyled,
  AlignContainer,
} from "./styles-pages";

import { MdArrowBack } from "react-icons/md";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useState } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

const UserForm = () => {
  const [errorCreateUser, setErrorCreateUser] = useState(false);
  const history = useHistory();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Campo obrigatório.")
      .matches(
        /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/i,
        "Porfavor coloque um nome válido (Nome e sobrenome)."
      ),
    user: yup
      .string()
      .required("Campo obrigatório.")
      .min(6, "Mínimo 6 caracteres."),
    email: yup
      .string()
      .email("Porfavor coloque um email válido.")
      .required("Campo obrigatório."),
    password: yup
      .string()
      .matches(
        /^(?=.*?[#?!@$%^&*-]).{6,}$/i,
        "Mínimo 6 caracteres e ter ao menos um especial."
      )
      .required("Campo obrigatório."),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes.")
      .required("Campo obrigatório."),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    axios
      .post(`https://ka-users-api.herokuapp.com/users`, { user: data })
      .then((res) => {
        if (res.status === 201) {
          history.push("/");
        }
      })
      .catch((err) => setErrorCreateUser(true));
  };

  return (
    <AlignContainer>
      <MdArrowBack
        onClick={() => history.push("/")}
        style={{
          fontSize: 30,
          color: "#4136f1",
          marginBottom: 15,
          marginRight: "30%",
          cursor: "pointer",
        }}
      />
      <ContainerFormStyled>
        <h2>CRIE SUA CONTA</h2>
        <form onSubmit={handleSubmit(handleForm)}>
          <div>
            <TextFieldStyled
              margin="normal"
              label="Usuário"
              name="user"
              inputRef={register}
              error={!!errors.user}
              helperText={errors.user?.message}
              size="small"
              color="primary"
            />
          </div>
          <div>
            <TextFieldStyled
              margin="normal"
              label="Nome"
              name="name"
              inputRef={register}
              error={!!errors.name}
              helperText={errors.name?.message}
              size="small"
              color="primary"
            />
          </div>
          <div>
            <TextFieldStyled
              margin="normal"
              label="E-mail"
              name="email"
              inputRef={register}
              error={!!errors.email}
              helperText={errors.email?.message}
              size="small"
              color="primary"
            />
          </div>
          <div>
            <TextFieldStyled
              margin="normal"
              label="Senha"
              name="password"
              inputRef={register}
              error={!!errors.password}
              helperText={errors.password?.message}
              size="small"
              color="primary"
            />
          </div>
          <div>
            <TextFieldStyled
              margin="normal"
              label="Confirma senha"
              name="password_confirmation"
              inputRef={register}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
              size="small"
              color="primary"
            />
          </div>
          <div>
            {errorCreateUser && (
              <span style={{ color: "red", fontSize: 16 }}>
                Erro de cadastro. Tente novamente.
              </span>
            )}
          </div>

          <ButtonStyledPrimary
            type="submit"
            variant="contained"
            color="primary"
          >
            Enviar
          </ButtonStyledPrimary>
        </form>
      </ContainerFormStyled>
    </AlignContainer>
  );
};

export default UserForm;
