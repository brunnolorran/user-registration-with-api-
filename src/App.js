import "./App.css";
import GlobalStyle from "./styles/global";
import Authenticator from "./components/authenticator";

const App = () => {
  return (
    <>
      <div id="main-container">
        <Authenticator />
      </div>
      <GlobalStyle> </GlobalStyle>
    </>
  );
};

export default App;
