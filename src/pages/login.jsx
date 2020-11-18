import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <div>
        <TextField
          margin="normal"
          label="Usuário"
          name="username"
          variant="outlined"
          inputRef={register}
          error={!!errors.name}
          helperText={errors.name?.message}
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
  );
};

export default Login;
