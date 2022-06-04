import { useRouter } from "next/router";

import { CardContent, Grid } from "@mui/material";

import { CardSection } from "./CardSection";

export const TabRealTime = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CardSection
            section="Ubicación"
            description="Revise la ubicación de su mascota."
            image="/images/pet/location.jpg"
            link={`real-time/location/${id}`}
            button="Revisar"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardSection
            section="Temperatura"
            description="Revise la temperatura de su mascota."
            image="/images/pet/temperature.jpg"
            link={`real-time/temperature/${id}`}
            button="Revisar"
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};
