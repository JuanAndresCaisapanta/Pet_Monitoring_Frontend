import { useContext, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { NavigateBefore } from "@mui/icons-material";

import { CardSection } from "./CardSection";
import { PetContext } from "../../../context";

export const TabRealTime = () => {
  const router = useRouter();

  const { getPet, pet, petChange } = useContext(PetContext);

  const { id } = router.query;

  useEffect(() => {
    getPet(id);
    return () => {
      petChange();
    };
  }, [id]);

  if (pet?.name) {
    return (
      <Card>
        <CardHeader
          title={`Información en tiempo real de ${pet?.name}`}
          titleTypographyProps={{ variant: "body1" }}
          sx={{ paddingTop: "4px", paddingBottom: "4px" }}
          action={
            <IconButton
              aria-label="close"
              onClick={() => router.back()}
              style={{ color: "#9E69FD" }}
            >
              <NavigateBefore />
            </IconButton>
          }
        />
        <Divider sx={{ margin: 0 }} />
        <CardContent>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} sm={4}>
              <CardSection
                section="Ubicación"
                description="Revise la ubicación de su mascota."
                image="/images/pet/location.jpg"
                link={`real-time/location/${id}`}
                button="Revisar"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
      </Grid>
    );
  }
};
