import { FC, useContext, useEffect, useState } from "react";

import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { AuthContext } from "../../../context";
import { Notifications } from "../elements/Notifications";
import Image from "next/image";

const drawerWidth = 210;
interface Props {
  toggleSideMenu: () => void;
}

export const Navbar: FC<Props> = ({ toggleSideMenu }) => {
  const { user } = useContext(AuthContext);
  const [imgSrc, setImgSrc] = useState<string>("/images/profile/user.png");
  useEffect(() => {
    if (user?.image) {
      setImgSrc(`data:image/jpg;base64,${user?.image}`);
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
        {user?.role.map((role,i:any) => {
        if (role.name === "ROLE_USER") {
          return <div key={i}><Notifications /></div>
        }})}
        <Tooltip title={user?.name || ""}>
          <IconButton sx={{ p: 0, marginLeft: 2 }}>
            <Avatar alt="Usuario">
            <Image
                src={imgSrc}
                width="100%"
                height="100%"
                alt="Imagen Perfil"
                quality={100}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
