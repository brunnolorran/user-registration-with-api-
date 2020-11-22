import { FeedbackStyled } from "./styles";

import { TitleStyle } from "../styles-pages";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    tableLayout: "fixed",
    maxWidth: 1020,
  },
});

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

  const classes = useStyles();

  return (
    <>
      <TitleStyle>USUÁRIOS</TitleStyle>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="a table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Usuário</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="right">Feedbacks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" align="left">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.user}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="right">
                  <FeedbackStyled
                    onClick={() => history.push(`/user-feedbacks/${row.id}`)}
                  >
                    Todos os feedback
                  </FeedbackStyled>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
