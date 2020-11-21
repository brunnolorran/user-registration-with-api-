import { MenuBar, ButtonStyled } from "./styles";

import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const tryLogout = () => {
    window.localStorage.removeItem("authToken");
    history.push("/");
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
