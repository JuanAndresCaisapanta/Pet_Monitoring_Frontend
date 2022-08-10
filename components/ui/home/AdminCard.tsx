import { useContext, useEffect } from "react";

import { Avatar, Box, Card, CardContent, CardHeader, CircularProgress, Grid, Typography } from "@mui/material";
import { Group, Hail, Pets, Store, Vaccines } from "@mui/icons-material";

import {
  DeviceContext,
  EstablishmentContext,
  MedicineContext,
  PetContext,
  ProfessionalContext,
  UserContext,
} from "../../../context";

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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    color: "common.white",
                    backgroundColor: `${"primary"}.main`,
                  }}
                >
                  <Group sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Usuarios</Typography>
                  <Typography variant="h6">{usersNumber}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    color: "common.white",
                    backgroundColor: `${"primary"}.main`,
                  }}
                >
                  <Pets sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Mascotas</Typography>
                  <Typography variant="h6">{petsNumber}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    color: "common.white",
                    backgroundColor: `${"primary"}.main`,
                  }}
                >
                  <Pets sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Dispositivos</Typography>
                  <Typography variant="h6">{devicesNumber}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    color: "common.white",
                    backgroundColor: `${"primary"}.main`,
                  }}
                >
                  <Store sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Establecimientos</Typography>
                  <Typography variant="h6">{establishmentsNumber}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    color: "common.white",
                    backgroundColor: `${"primary"}.main`,
                  }}
                >
                  <Vaccines sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Medicinas</Typography>
                  <Typography variant="h6">{medicinesNumber}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    color: "common.white",
                    backgroundColor: `${"primary"}.main`,
                  }}
                >
                  <Hail sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Profesionales</Typography>
                  <Typography variant="h6">{professionalsNumber}</Typography>
                </Box>
              </Box>
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
