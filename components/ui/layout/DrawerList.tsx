import { FC, useContext } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Divider, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import {
  ExitToApp,
  Home,
  OnDeviceTraining,
  Pets,
  ManageAccounts,
  Ballot,
  Group,
  Vaccines,
  Hail,
  Store,
} from "@mui/icons-material";

import { AuthContext } from "../../../context";

interface Props {
  toggleSideMenu: () => void;
}

export const DrawerList: FC<Props> = ({ toggleSideMenu }) => {
  const router = useRouter();
  const { logout, user } = useContext(AuthContext);
  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <div>
      <Toolbar sx={{ justifyContent: "center", backgroundColor: "#F4F5FA" }}>
        <Image src="/images/logo.png" alt="Logo" height="50%" width="50%" quality={100} />
      </Toolbar>
      <Divider />
      {user?.role.map((role) => {
        if (role.name === "Admin") {
          return (
            <div key={role.id}>
              <ListItem button onClick={() => navigateTo("/admin")}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={"Inicio"} />
              </ListItem>
              <Divider textAlign="left" sx={{ fontSize: 14 }}>
                Administrativos
              </Divider>
              <ListItem button onClick={() => navigateTo("/admin/users")}>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/pets")}>
                <ListItemIcon> 
                  <Pets />
                </ListItemIcon>
                <ListItemText primary={"Mascotas"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/devices")}>
                <ListItemIcon>
                  <OnDeviceTraining />
                </ListItemIcon>
                <ListItemText primary={"Dispositivos"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/establishments")}>
                <ListItemIcon>
                  <Store />
                </ListItemIcon>
                <ListItemText primary={"Establecimientos"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/medicines")}>
                <ListItemIcon>
                  <Vaccines />
                </ListItemIcon>
                <ListItemText primary={"Medicinas"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/professionals")}>
                <ListItemIcon>
                  <Hail />
                </ListItemIcon>
                <ListItemText primary={"Profesionales"} />
              </ListItem>
              <Divider textAlign="left" sx={{ fontSize: 14 }}>
                Tipos
              </Divider>
              <ListItem button onClick={() => navigateTo("/admin/species")}>
                <ListItemIcon>
                  <Ballot />
                </ListItemIcon>
                <ListItemText primary={"Especies"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/breeds")}>
                <ListItemIcon>
                  <Ballot />
                </ListItemIcon>
                <ListItemText primary={"Razas"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/establishment-types")}>
                <ListItemIcon>
                  <Ballot />
                </ListItemIcon>
                <ListItemText primary={"Establecimientos"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/medicine-types")}>
                <ListItemIcon>
                  <Ballot />
                </ListItemIcon>
                <ListItemText primary={"Medicinas"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo("/admin/professions")}>
                <ListItemIcon>
                  <Ballot />
                </ListItemIcon>
                <ListItemText primary={"Profesiones"} />
              </ListItem>
              <Divider />
              <ListItem button onClick={logout}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary={"Salir"} />
              </ListItem>
            </div>
          );
        }
        if (role.name === "User") {
          return (
            <div key={role.id}>
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
              <ListItem button onClick={() => navigateTo("/users/consults")}>
                <ListItemIcon>
                  <Ballot />
                </ListItemIcon>
                <ListItemText primary={"Consultas"} />
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
              <Divider />
              <ListItem button onClick={logout}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary={"Salir"} />
              </ListItem>
            </div>
          );
        }
      })}
    </div>
  );
};
