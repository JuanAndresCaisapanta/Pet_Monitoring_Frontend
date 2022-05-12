import { CardContent, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { CardSection } from "./CardSection";

export const TabMonitoring = () => {
  return (
    <CardContent>
      <Divider textAlign="center" sx={{ marginBottom: "10px" }}>
        <Typography variant="h6" component="h6">
          Tiempo real
        </Typography>
      </Divider>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CardSection
            section="Ubicación"
            description="Revise la ubicación de su mascota."
            image="/images/pet/location.jpg"
            link="/pets/sections/real-time/location"
            button="Revisar"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardSection
            section="Temperatura"
            description="Revise la temperatura de su mascota."
            image="/images/pet/temperature.jpg"
            link="/pets/sections/real-time/temperature"
            button="Revisar"
          />
        </Grid>
      </Grid>
      <Divider
        textAlign="center"
        sx={{ marginBottom: "10px", marginTop: "10px" }}
      >
        <Typography variant="h6" component="h6">
          Datos
        </Typography>
      </Divider>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CardSection
            section="Medicamentos"
            description="Administre las medicamentos de su mascota."
            image="/images/pet/medicine.jpg"
            link="/pets/sections/data/medicines"
            button="Administrar"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardSection
            section="Profesionales"
            description="Administre los profesionales de su mascota."
            image="/images/pet/professional.jpg"
            link="/pets/sections/data/professionals"
            button="Administrar"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardSection
            section="Establecimientos"
            description="Administre los establecimientos de su mascota."
            image="/images/pet/establishment.jpg"
            link="/pets/sections/data/establishments"
            button="Administrar"
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};
