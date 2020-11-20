import MainMenu from "../components/menu";
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
    minWidth: 650,
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
      <MainMenu />
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Usuário</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Feedbacks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.user}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <button
                    onClick={() => history.push(`/user-feedbacks/${row.id}`)}
                  >
                    Todos os feedback
                  </button>
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
