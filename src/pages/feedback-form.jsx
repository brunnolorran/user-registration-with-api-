import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Header from "../components/header";

import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useHistory, useParams } from "react-router-dom";

const FeedbackForm = () => {
  const params = useParams();
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório."),
    comment: yup.string().required("Campo obrigatório."),
    grade: yup
      .number()
      .typeError("Precisa ser número")
      .integer("Número inteiro")
      .required("Campo obrigatório."),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const tryFeedback = (data) => {
    const token = window.localStorage.getItem("authToken");
    axios
      .post(
        `https://ka-users-api.herokuapp.com/users/${params.id}/feedbacks`,
        { feedback: data },
        {
          headers: { Authorization: token },
        }
      )
      .then(() => {
        history.push(`/user-feedbacks/${params.id}`);
      });
  };
  return (
    <>
      <header />
      <h1>Faça um Feedback</h1>
      <form onSubmit={handleSubmit(tryFeedback)}>
        <div>
          <TextField
            margin="normal"
            label="Nome do feedback"
            name="name"
            variant="outlined"
            inputRef={register}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </div>
        <div>
          <TextField
            margin="normal"
            label="Comentário"
            name="comment"
            variant="outlined"
            inputRef={register}
            error={!!errors.comment}
            helperText={errors.comment?.message}
          />
        </div>
        <div>
          <TextField
            margin="normal"
            label="Nota"
            name="grade"
            variant="outlined"
            inputRef={register}
            error={!!errors.grade}
            helperText={errors.grade?.message}
          />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </>
  );
};

export default FeedbackForm;
