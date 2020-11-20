import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useState } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
      .post("https://ka-users-api.herokuapp.com/users", { user: data })
      .then((res) => {
        if (res.status === 201) {
          history.push("/");
        }
      })
      .catch((err) => setErrorCreateUser(true));
  };

  return (
    <>
      <Button onClick={() => history.push("/")}>Tela login</Button>
      <h1>Cadastro de usuário</h1>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
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
          <TextField
            margin="normal"
            variant="outlined"
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
          <TextField
            margin="normal"
            variant="outlined"
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
          <TextField
            margin="normal"
            variant="outlined"
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
          <TextField
            margin="normal"
            variant="outlined"
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

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </>
  );
};

export default UserForm;
