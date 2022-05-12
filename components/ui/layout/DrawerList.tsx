import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import {
  ExitToApp,
  Home,
  OnDeviceTraining,
  Person,
  Pets,
  SupervisedUserCircle,
} from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  toggleSideMenu: () => void;
}

export const DrawerList: FC<Props> = ({ toggleSideMenu }) => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };
  return (
    <div>
      <Toolbar sx={{ justifyContent: "center", backgroundColor: "#F4F5FA" }}>
        <Image src="/logo.png" alt="Logo" height="50%" width="50%" />
      </Toolbar>
      <Divider />
      <ListItem button onClick={() => navigateTo("/")}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary={"Inicio"} />
      </ListItem>
      <ListItem button onClick={() => navigateTo("/user")}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary={"Cuenta"} />
      </ListItem>
      <Divider textAlign="left" sx={{ fontSize: 14 }}>
        Secciones
      </Divider>
      <ListItem button onClick={() => navigateTo("/pets")}>
        <ListItemIcon>
          <Pets />
        </ListItemIcon>
        <ListItemText primary={"Mascotas"} />
      </ListItem>
      <ListItem button onClick={() => navigateTo("/devices")}>
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
      <ListItem button onClick={() => navigateTo("/auth/login")}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary={"Salir"} />
      </ListItem>
    </div>
  );
};
