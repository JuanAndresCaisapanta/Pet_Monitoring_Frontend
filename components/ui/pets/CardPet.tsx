import { FC } from "react";

import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";

import { useRouter } from "next/router";
import { Monitor, Visibility } from "@mui/icons-material";
import Image from "next/image";
import { breakpoints } from "@mui/system";

interface Props {
  id: number;
  name: string;
  species: string;
  sex: string;
  race: string;
  weight: number;
  image: any;
}

export const CardPet: FC<Props> = ({
  id,
  name,
  species,
  sex,
  race,
  weight,
  image,
}) => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
  const theme = useTheme();

  return (
    <Card>
      <Grid container direction={{ xs: "column", md: "row" }}>
        <Grid
          item
          xs={6}
          md={5}
          textAlign="center"
          padding={2}
          borderRight={{ md: 1, xs: 0, color: "rgba(0, 0, 0, 0.12)" }}
          borderBottom={{ xs: 1, md: 0, color: "rgba(0, 0, 0, 0.12)" }}
        >
          <Image
            width="250rem"
            height="177rem"
            alt="Mascota"
            src={`data:image/jpeg;base64,${image}`}
            style={{ borderRadius: "15px" }}
            quality={100}
          />
        </Grid>
        <Grid item xs={6} md={7} padding={1}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" color={"primary"}>
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2">
                <b>Especie: </b>
                {species}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2">
                <b>Sexo: </b>
                {sex}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2">
                <b>Raza: </b>
                {race}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} textAlign="center">
              <Button
                variant="contained"
                color="info"
                disableElevation
                startIcon={<Monitor />}
                sx={{ marginRight: 2 }}
                onClick={() => navigateTo(`pets/sections/${id}`)}
              >
                Monitorear
              </Button>
            </Grid>
            <Grid item xs={12} md={12} textAlign="center">
              <Button
                variant="contained"
                disableElevation
                startIcon={<Visibility />}
                sx={{ marginRight: 2 }}
                onClick={() => navigateTo(`pets/pet/profile/${id}`)}
              >
                Ver
              </Button>
              <Button variant="outlined" color="secondary">
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
