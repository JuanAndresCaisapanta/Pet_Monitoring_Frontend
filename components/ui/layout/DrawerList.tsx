import { FC, useContext } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import {
  ExitToApp,
  Home,
  OnDeviceTraining,
  Pets,
  ManageAccounts,
} from "@mui/icons-material";

import { AuthContext } from "../../../context";

interface Props {
  toggleSideMenu: () => void;
}

export const DrawerList: FC<Props> = ({ toggleSideMenu }) => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };
  return (
    <div>
      <Toolbar sx={{ justifyContent: "center", backgroundColor: "#F4F5FA" }}>
        <Image src="/images/logo.png" alt="Logo" height="50%" width="50%" />
      </Toolbar>
      <Divider />
      <ListItem button onClick={() => navigateTo("/users")}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary={"Inicio"} />
      </ListItem>
      <ListItem button onClick={() => navigateTo("/users/user")}>
        <ListItemIcon>
          <ManageAccounts />
        </ListItemIcon>
        <ListItemText primary={"Cuenta"} />
      </ListItem>
      <Divider textAlign="left" sx={{ fontSize: 14 }}>
        Secciones
      </Divider>
      <ListItem button onClick={() => navigateTo("/users/pets")}>
        <ListItemIcon>
          <Pets />
        </ListItemIcon>
        <ListItemText primary={"Mascotas"} />
      </ListItem>
      <ListItem button onClick={() => navigateTo("/users/devices")}>
        <ListItemIcon>
          <OnDeviceTraining />
        </ListItemIcon>
        <ListItemText primary={"Dispositivos"} />
      </ListItem>
      {/* <Divider textAlign="left" sx={{ fontSize: 14 }}>
        Administración
      </Divider>
      <ListItem button>
        <ListItemIcon>
          <SupervisedUserCircle />
        </ListItemIcon>
        <ListItemText primary={"Usuarios"} />
      </ListItem> */}
      <Divider />
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary={"Salir"} />
      </ListItem>
    </div>
  );
};
