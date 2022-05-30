import { FC } from "react";

import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.up("md")]: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

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

  return (
    <Card>
      <Grid container spacing={2}>
        <StyledGrid item md={6} xs={12}>
          <CardContent
            sx={{
              padding: "1",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              width={"100%"}
              height={214}
              alt="Mascota"
              src={`data:image/jpeg;base64,${image}`}
            />
          </CardContent>
        </StyledGrid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">Nombre: {name}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Especie: {species}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Género: {sex}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Raza: {race}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Peso: {weight}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Button
                  variant="contained"
                  onClick={() => navigateTo(`pets/sections/${id}`)}
                  sx={{ mr: 2 }}
                >
                  Monitorear
                </Button>
              </Grid>
              <Grid item xs={6} md={6}>
                <Button variant="contained">Editar</Button>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
