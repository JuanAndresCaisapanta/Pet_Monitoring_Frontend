import { FC } from "react";

import { Box, Drawer } from "@mui/material";

import { DrawerList } from "./DrawerList";

const drawerWidth = 210;
interface Props {
  isMenuOpen: boolean;
  toggleSideMenu: () => void;
}
export const SideMenu: FC<Props> = ({ isMenuOpen, toggleSideMenu }) => {
  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
      <Drawer
        variant="temporary"
        open={isMenuOpen}
        anchor="left"
        onClose={toggleSideMenu}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#F4F5FA",
          },
        }}
      >
        <DrawerList toggleSideMenu={toggleSideMenu} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#F4F5FA",
          },
        }}
        open
      >
        <DrawerList toggleSideMenu={toggleSideMenu} />
      </Drawer>
    </Box>
  );
};
