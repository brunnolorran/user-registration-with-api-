import { FeedbackStyled, TableStyled, TableCellStyled } from "./styles";

import { TitleStyle } from "../styles-pages";

import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");

    axios
      .get("https://ka-users-api.herokuapp.com/users", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setUserList(res.data);
      });
  }, [setUserList]);

  return (
    <>
      <TitleStyle>USUÁRIOS</TitleStyle>
      <TableContainer component={Paper}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCellStyled width={150}>Nome</TableCellStyled>
              <TableCellStyled width={50} align="left">
                ID
              </TableCellStyled>
              <TableCellStyled width={100} align="left">
                Usuário
              </TableCellStyled>
              <TableCellStyled width={150} align="left">
                E-mail
              </TableCellStyled>
              <TableCellStyled width={100} align="right">
                Feedbacks
              </TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row) => (
              <TableRow key={row.name}>
                <TableCellStyled component="th" scope="row" align="left">
                  {row.name}
                </TableCellStyled>
                <TableCellStyled align="left">{row.id}</TableCellStyled>
                <TableCellStyled align="left">{row.user}</TableCellStyled>
                <TableCellStyled align="left">{row.email}</TableCellStyled>
                <TableCellStyled align="right">
                  <FeedbackStyled
                    onClick={() => history.push(`/user-feedbacks/${row.id}`)}
                  >
                    Todos os feedback
                  </FeedbackStyled>
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainer>
    </>
  );
};

export default Users;
