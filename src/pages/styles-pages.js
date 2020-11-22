import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const TextFieldStyled = styled(TextField)`
  width: 248px !important;
  height: 56px !important;
  background: rgba(255, 255, 255, 0.03) !important;
`;

export const ButtonStyledPrimary = styled(Button)`
  background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%) !important;
  box-shadow: 0px 15px 30px rgba(20, 102, 204, 0.16) !important;
  border-radius: 16px !important;
  width: 248px !important;
  height: 56px !important;
  margin-top: 40px !important;
  color: #fff !important;
  border: 2px solid #e2e2e2 !important;
`;

export const ButtonStyledSecondary = styled(Button)`
  background: transparent !important;
  border: transparent !important;
  margin-top: 20px !important;
  margin-left: 120px !important;
`;

export const ContainerFormStyled = styled.div`
  width: 280px;
  background: #fff;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

export const ContainerTitleButtom = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TitleStyle = styled.h1`
  font-size: 28px !important;
  margin: 30px;
  color: #4136f1 !important;
`;

export const AlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
