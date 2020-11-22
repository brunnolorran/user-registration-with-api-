import {
  ButtonStyledPrimary,
  TextFieldStyled,
  ContainerFormStyled,
  TitleStyle,
  AlignContainer,
} from "./styles-pages";

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
    <AlignContainer>
      <ContainerFormStyled>
        <TitleStyle>Faça um Feedback</TitleStyle>
        <form onSubmit={handleSubmit(tryFeedback)}>
          <div>
            <TextFieldStyled
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
            <TextFieldStyled
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
            <TextFieldStyled
              margin="normal"
              label="Nota"
              name="grade"
              variant="outlined"
              inputRef={register}
              error={!!errors.grade}
              helperText={errors.grade?.message}
            />
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

export default FeedbackForm;
