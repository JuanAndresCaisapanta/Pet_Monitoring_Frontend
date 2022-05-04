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
export const DrawerList = () => {
  return (
    <div>
      <Toolbar sx={{ justifyContent: "center", backgroundColor:'#F4F5FA' }}>
        <Image src="/logo.png" alt="Logo" height="50%" width="50%" />
      </Toolbar>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary={"Inicio"} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={"Perfil"} />
      </ListItem>
      <Divider textAlign="left" sx={{ fontSize: 14 }}>
        Secciones
      </Divider>
      <ListItem button>
        <ListItemIcon>
          <Pets />
        </ListItemIcon>
        <ListItemText primary={"Mascotas"} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <OnDeviceTraining />
        </ListItemIcon>
        <ListItemText primary={"Dispositivos"} />
      </ListItem>
      <Divider textAlign="left" sx={{ fontSize: 14 }}>
        Administración
      </Divider>
      <ListItem button>
        <ListItemIcon>
          <SupervisedUserCircle />
        </ListItemIcon>
        <ListItemText primary={"Usuarios"} />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary={"Salir"} />
      </ListItem>
    </div>
  );
};
