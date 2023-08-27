import { Box, SxProps, Theme } from "@mui/material";
import RoutePicker from "../components/RoutePicker";
import StopPicker from "../components/StopPicker";

const Header = () => {
  return (
    <Box sx={rootSx}>
      <RoutePicker />
      <StopPicker />
    </Box>
  );
};

export default Header;

const rootSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  gap: 1,
  width: "100%",
};
