import { useContext, useEffect } from "react";

import { Avatar, Box, Card, CardContent, CardHeader, CircularProgress, Grid, Typography } from "@mui/material";
import { Group, Hail, OnDeviceTraining, Pets, Store, Vaccines } from "@mui/icons-material";

import {
  DeviceContext,
  EstablishmentContext,
  MedicineContext,
  PetContext,
  ProfessionalContext,
  UserContext,
} from "../../../context";
import { BoxAdminCard } from "../elements";

export const AdminCard = () => {
  const { users, getUsers } = useContext(UserContext);
  const { pets, getPets } = useContext(PetContext);
  const { devices, getDevices } = useContext(DeviceContext);
  const { establishments, getEstablishments } = useContext(EstablishmentContext);
  const { medicines, getMedicines } = useContext(MedicineContext);
  const { professionals, getProfessionals } = useContext(ProfessionalContext);

  useEffect(() => {
    getUsers();
    getPets();
    getDevices();
    getEstablishments();
    getMedicines();
    getProfessionals();
  }, []);

  const usersNumber = users?.length;
  const petsNumber = pets?.length;
  const devicesNumber = devices?.length;
  const establishmentsNumber = establishments?.length;
  const medicinesNumber = medicines?.length;
  const professionalsNumber = professionals?.length;

  if (users) {
    return (
      <Card>
        <CardHeader title="Administrativos" titleTypographyProps={{ color: "primary" }} />
        <CardContent sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4}>
              <BoxAdminCard
                avatar={<Group sx={{ fontSize: "1.75rem" }} />}
                title={"Usuarios"}
                number={usersNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminCard
                avatar={<Pets sx={{ fontSize: "1.75rem" }} />}
                title={"Mascotas"}
                number={petsNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminCard
                avatar={<OnDeviceTraining sx={{ fontSize: "1.75rem" }} />}
                title={"Dispositivos"}
                number={devicesNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminCard
                avatar={<Store sx={{ fontSize: "1.75rem" }} />}
                title={"Establecimientos"}
                number={establishmentsNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminCard
                avatar={<Vaccines sx={{ fontSize: "1.75rem" }} />}
                title={"Medicinas"}
                number={medicinesNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminCard
                avatar={<Hail sx={{ fontSize: "1.75rem" }} />}
                title={"Profesionales"}
                number={professionalsNumber}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Grid container direction="column" alignItems={"center"}>
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            Cargando...
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={"primary"} sx={{ mt: 1 }}>
            <CircularProgress color="secondary" />
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
