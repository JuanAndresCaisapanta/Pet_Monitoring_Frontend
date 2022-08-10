import { useContext, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { NavigateBefore } from "@mui/icons-material";

import { CardSection } from "./CardSection";
import { PetContext } from "../../../context";

export const TabManagement = () => {
  const { getPet, pet, petChange } = useContext(PetContext);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getPet(Number(id));
    return () => {
      petChange();
    };
  }, [id]);

  if (pet?.name) {
    return (
      <Card>
        <CardHeader
          title={`Administración de Información de ${pet?.name}`}
          titleTypographyProps={{ variant: "body1" }}
          sx={{ paddingTop: "4px", paddingBottom: "4px" }}
          action={
            <IconButton aria-label="close" onClick={() => router.back()} style={{ color: "#9E69FD" }}>
              <NavigateBefore />
            </IconButton>
          }
        />
        <Divider sx={{ margin: 0 }} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <CardSection
                section="Establecimientos"
                description="Administre los establecimientos de su mascota."
                image="/images/pet/establishment.jpg"
                link={`data/establishment/${id}`}
                button="Administrar"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CardSection
                section="Medicamentos"
                description="Administre las medicamentos de su mascota."
                image="/images/pet/medicine.jpg"
                link={`data/medicine/${id}`}
                button="Administrar"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CardSection
                section="Profesionales"
                description="Administre los profesionales de su mascota."
                image="/images/pet/professional.jpg"
                link={`data/professional/${id}`}
                button="Administrar"
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
