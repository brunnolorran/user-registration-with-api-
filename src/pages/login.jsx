import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = (props) => {
  const schema = yup.object().shape({
    user: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const tryLogin = (data) => {
    axios
      .post("https://ka-users-api.herokuapp.com/authenticate", { ...data })
      .then((res) => {
        window.localStorage.setItem("authToken", res.data.auth_token);
        props.setAuthentication(true);
        history.push("/users");
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(tryLogin)}>
        <div>
          <TextField
            margin="normal"
            label="Usuário"
            name="user"
            variant="outlined"
            inputRef={register}
            error={!!errors.user}
            helperText={errors.user?.message}
          />
        </div>
        <div>
          <TextField
            margin="normal"
            label="Senha"
            name="password"
            variant="outlined"
            inputRef={register}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
      <Button
        type="submit"
        size="small"
        variant="outlined"
        onClick={() => {
          history.push("/user-form");
        }}
      >
        Criar usuário
      </Button>
    </>
  );
};

export default Login;
