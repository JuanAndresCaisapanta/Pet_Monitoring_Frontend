import { Box, Drawer } from "@mui/material";
import { FC } from "react";
import { DrawerList } from "./DrawerList";

const drawerWidth = 210;
interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}
export const SideMenu: FC<Props> = ({
  mobileOpen,
  handleDrawerToggle,
}) => {

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        anchor='left'
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth,backgroundColor: "#F4F5FA", }
        }}
      >
        <DrawerList />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth,backgroundColor: "#F4F5FA", },
        }}
        open
      >
        <DrawerList />
      </Drawer>
    </Box>
  );
};
