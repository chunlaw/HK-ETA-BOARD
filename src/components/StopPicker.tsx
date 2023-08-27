import { MenuItem, TextField } from "@mui/material";
import { useContext, useMemo } from "react";
import AppContext from "../AppContext";

const StopPicker = () => {
  const {
    routeId,
    stopSeq,
    setStopSeq,
    db: { routeList, stopList },
  } = useContext(AppContext);

  const stops = useMemo(() => {
    if (routeId === "") return [];
    const route = routeList[routeId];
    return route.stops[route.co[0]];
  }, [routeId, routeList]);

  return (
    <TextField
      select
      value={stopSeq ?? ""}
      onChange={({ target: { value } }) =>
        setStopSeq(value !== "" ? parseInt(value) : null)
      }
      disabled={routeId === ""}
      sx={{ flex: 1 }}
    >
      {stops.map((stop, idx) => (
        <MenuItem key={`${stop}-${idx}`} value={idx}>
          #{idx + 1}&emsp;{stopList[stop].name.zh}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default StopPicker;
