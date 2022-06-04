import { useRouter } from "next/router";

import { CardContent, Grid } from "@mui/material";

import { CardSection } from "./CardSection";

export const TabManagement = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <CardContent>
      <Grid container spacing={2}>
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
        <Grid item xs={12} sm={4}>
          <CardSection
            section="Establecimientos"
            description="Administre los establecimientos de su mascota."
            image="/images/pet/establishment.jpg"
            link={`data/establishment/${id}`}
            button="Administrar"
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};
