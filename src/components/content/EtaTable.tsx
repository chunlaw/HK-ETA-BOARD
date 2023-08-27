import { useContext } from "react";
import AppContext from "../../AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getEtaString } from "../../utils";

const EtaTable = () => {
  const { data } = useContext(AppContext);

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>1st ETA</TableCell>
            <TableCell>2nd ETA</TableCell>
            <TableCell>3rd ETA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(-1000)
            .map(({ etas, ts }) => (
              <TableRow key={ts.getTime()}>
                <TableCell>{ts.toLocaleString()}</TableCell>
                <TableCell>{getEtaString(etas[0] ?? null)}</TableCell>
                <TableCell>{getEtaString(etas[1] ?? null)}</TableCell>
                <TableCell>{getEtaString(etas[2] ?? null)}</TableCell>
              </TableRow>
            ))
            .reverse()}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EtaTable;
