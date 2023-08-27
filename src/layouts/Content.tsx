import {
  Box,
  Button,
  Stack,
  Switch,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import EtaTable from "../components/content/EtaTable";
import EtaChart from "../components/content/EtaChart";

const Content = () => {
  const { data } = useContext(AppContext);
  const [format, setFormat] = useState<"Table" | "Chart">("Table");

  return (
    <Box sx={rootSx}>
      <Box sx={btnSx}>
        <Stack direction="row" alignItems="center">
          <Typography>Table</Typography>
          <Switch
            value={format === "Chart"}
            onChange={(_, checked) => {
              setFormat(checked ? "Chart" : "Table");
            }}
          />
          <Typography>Chart</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            const blob = new Blob([JSON.stringify(data)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            // Create a new anchor element
            const a = document.createElement("a");
            a.href = url;
            a.download = "eta-data.json";
            a.click();
            a.remove();
          }}
          size="small"
        >
          Downlaod JSON
        </Button>
      </Box>
      {format === "Table" && <EtaTable />}
      {format === "Chart" && <EtaChart />}
    </Box>
  );
};

export default Content;

const rootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flex: 1,
  overflow: "scroll",
};

const btnSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 2,
};
