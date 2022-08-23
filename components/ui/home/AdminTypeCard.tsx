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
import { BoxAdminCard, BoxAdminTypeCard } from "../elements";

export const AdminTypeCard = () => {
  const { species, getSpecies } = useContext(SpeciesContext);
  const { breeds, getBreeds } = useContext(BreedContext);
  const { establishmentType: establishmentTypes, getEstablishmentTypes: getEstablishmentType } = useContext(EstablishmentTypeContext);
  const { medicineType: medicineTypes, getMedicineTypes: getMedicineType } = useContext(MedicineTypeContext);
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
              <BoxAdminTypeCard
                avatar={<Ballot sx={{ fontSize: "1.75rem" }} />}
                title={"Especies"}
                number={speciesNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminTypeCard
                avatar={<Ballot sx={{ fontSize: "1.75rem" }} />}
                title={"Razas"}
                number={breedsNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminTypeCard
                avatar={<Ballot sx={{ fontSize: "1.75rem" }} />}
                title={"Establecimiento"}
                number={establishmentTypesNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminTypeCard
                avatar={<Ballot sx={{ fontSize: "1.75rem" }} />}
                title={"Medicinas"}
                number={medicineTypesNumber}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <BoxAdminTypeCard
                avatar={<Ballot sx={{ fontSize: "1.75rem" }} />}
                title={"Profesiones"}
                number={professionsNumber}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  } else {
    return <></>;
  }
};
