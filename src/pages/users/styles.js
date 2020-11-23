import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";

export const FeedbackStyled = styled(Button)`
  background: transparent !important;
  color: blue !important;
  font-size: 12px !important;
`;

export const TableStyled = styled(Table)`
  table-layout: fixed !important;
  max-width: 1020px !important;
  margin-left: auto;
  margin-right: auto;
`;

export const TableCellStyled = styled(TableCell)`
  word-wrap: break-word;
`;
