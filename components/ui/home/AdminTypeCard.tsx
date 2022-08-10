import { useContext, useEffect } from "react";

import { Avatar, Box, Card, CardContent, CardHeader, CircularProgress, Grid, Typography } from "@mui/material";
import { Ballot, Vaccines } from "@mui/icons-material";

import {
  BreedContext,
  EstablishmentTypeContext,
  MedicineTypeContext,
  ProfessionContext,
  SpeciesContext,
} from "../../../context";

import { IBreed, IEstablishmentType, IMedicineType, IProfession } from "../../../interfaces";

export const AdminTypeCard = () => {
  const { species, getSpecies } = useContext(SpeciesContext);
  const { breeds, getBreeds } = useContext(BreedContext);
  const { establishmentType: establishmentTypes, getEstablishmentType } = useContext(EstablishmentTypeContext);
  const { medicineType: medicineTypes, getMedicineType } = useContext(MedicineTypeContext);
  const { professions, getProfessions } = useContext(ProfessionContext);

  useEffect(() => {
    getSpecies();
    getBreeds();
    getEstablishmentType();
    getMedicineType();
    getProfessions();
  }, []);

  const speciesNumber = species?.length;
  const breedsNumber = (breeds as unknown as IBreed[])?.length;
  const establishmentTypesNumber = (establishmentTypes as unknown as IEstablishmentType[])?.length;
  const medicineTypesNumber = (medicineTypes as unknown as IMedicineType[])?.length;
  const professionsNumber = (professions as unknown as IProfession[])?.length;

  if (species) {
    return (
      <Card>
        <CardHeader title="Tipos" titleTypographyProps={{ color: "primary" }} />
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
                    backgroundColor: `${"info"}.main`,
                  }}
                >
                  <Ballot sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Especies</Typography>
                  <Typography variant="h6">{speciesNumber}</Typography>
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
                    backgroundColor: `${"info"}.main`,
                  }}
                >
                  <Ballot sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Razas</Typography>
                  <Typography variant="h6">{breedsNumber}</Typography>
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
                    backgroundColor: `${"info"}.main`,
                  }}
                >
                  <Ballot sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Establecimiento</Typography>
                  <Typography variant="h6">{establishmentTypesNumber}</Typography>
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
                    backgroundColor: `${"info"}.main`,
                  }}
                >
                  <Ballot sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Medicinas</Typography>
                  <Typography variant="h6">{medicineTypesNumber}</Typography>
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
                    backgroundColor: `${"info"}.main`,
                  }}
                >
                  <Ballot sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">Profesiones</Typography>
                  <Typography variant="h6">{professionsNumber}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <></>
    );
  }
};
