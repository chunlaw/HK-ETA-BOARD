import React, { useContext } from "react";
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
import { EtaEntry } from "../../data.t";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import format from "date-fns/format";

const Row = (_index: number, row: EtaEntry) => {
  const { ts, etas } = row;

  return (
    <>
      <TableCell>{format(ts, "y-MM-dd HH:mm:ss")}</TableCell>
      <TableCell>{getEtaString(etas[0] ?? null)}</TableCell>
      <TableCell>{getEtaString(etas[1] ?? null)}</TableCell>
      <TableCell>{getEtaString(etas[2] ?? null)}</TableCell>
    </>
  );
};

const EtaTable = () => {
  const { data } = useContext(AppContext);

  return (
    <TableVirtuoso
      data={data.slice().reverse()}
      fixedHeaderContent={() => (
        <TableRow sx={{ background: "white" }}>
          <TableCell>Time</TableCell>
          <TableCell>1st ETA</TableCell>
          <TableCell>2nd ETA</TableCell>
          <TableCell>3rd ETA</TableCell>
        </TableRow>
      )}
      itemContent={Row}
      components={VirtuosoTableComponents}
    />
  );
};

export default EtaTable;

const VirtuosoTableComponents: TableComponents<EtaEntry> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
