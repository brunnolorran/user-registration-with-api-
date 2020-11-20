import MainMenu from "../components/menu";

import Button from "@material-ui/core/Button";
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
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UsersFeedbacks = () => {
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${params.id}/feedbacks`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setUserList(res.data);
      });
  }, [setUserList]);

  const classes = useStyles();
  const params = useParams();
  return (
    <>
      <MainMenu />
      <h1>UsersFeedbacks</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome do feedback</TableCell>
              <TableCell align="right">Comentário</TableCell>
              <TableCell align="right">Nota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.comment}</TableCell>
                <TableCell align="right">{row.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => history.push(`/feedback-form/${params.id}`)}>
        Criar um Feedback
      </Button>
    </>
  );
};

export default UsersFeedbacks;
