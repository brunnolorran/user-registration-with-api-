import { MenuBar, ButtonStyled } from "./styles";

import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();

  const tryLogout = () => {
    window.localStorage.removeItem("authToken");
    history.push("/");
    props.setAuthentication(false);
  };

  return (
    <MenuBar>
      <ButtonStyled
        onClick={() => {
          history.push("/users");
        }}
      >
        Usuários
      </ButtonStyled>
      <ButtonStyled onClick={tryLogout}>Sair</ButtonStyled>
    </MenuBar>
  );
};

export default Header;
