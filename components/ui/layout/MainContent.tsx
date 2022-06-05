import { FC, ReactNode } from "react";

import { Box, Toolbar, Typography } from "@mui/material";

const drawerWidth = 210;
interface Props {
  children: ReactNode;
}
export const MainContent: FC<Props> = ({ children }) => {
  return (
    <Box
      component={"main"}
      sx={{ flexGrow: 1, p: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      {children}
    </Box>
  );
};
