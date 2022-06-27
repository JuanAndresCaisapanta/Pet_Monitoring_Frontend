import { FC, useContext, useEffect, useState } from "react";

import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { AuthContext } from "../../../context";

const drawerWidth = 210;
interface Props {
  toggleSideMenu: () => void;
}

export const Navbar: FC<Props> = ({ toggleSideMenu }) => {
  const { user } = useContext(AuthContext);
  const [imgSrc, setImgSrc] = useState<string>("/images/profile/user.png");
  useEffect(() => {
    if (user?.image) {
      setImgSrc(`data:image/jpeg;base64,${user?.image}`);
    }
  }, [setImgSrc, user]);

  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        paddingRight: 0,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSideMenu}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1}>
          <Typography variant="h1" noWrap>
            MonIOpeT
          </Typography>
        </Box>

        {/* <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          sx={{ marginRight: 1.5 }}
        >
          <Badge badgeContent={17} color="error">
            <Notifications />
          </Badge>
        </IconButton> */}

        <Tooltip title={user?.name || ""}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Usuario" src={imgSrc} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
