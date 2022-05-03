import {
  Box,
  Drawer,
} from "@mui/material";
import { FC} from "react";
import { DrawerList } from "./DrawerList";

const drawerWidth = 210;
interface Props {
  window?: () => Window;
  mobileOpen: boolean,
  handleDrawerToggle:()=>void
}
export const SideMenu: FC<Props> = ({ window,mobileOpen, handleDrawerToggle }) => {
  
  const container =
    window !== undefined ? () => window().document.body : undefined;
   
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <DrawerList/>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <DrawerList/>
      </Drawer>
    </Box>
  );
};
