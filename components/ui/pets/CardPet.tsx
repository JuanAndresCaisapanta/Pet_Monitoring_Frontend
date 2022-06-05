import { FC } from "react";

import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";
import { EditOutlined } from "@mui/icons-material";
import Image from "next/image";

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
      <Grid container spacing={1}>
        <StyledGrid item md={6} xs={12}>
          <CardContent
            sx={{
              padding: "1",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width="180rem"
              height="180rem"
              alt="Mascota"
              src={`data:image/jpeg;base64,${image}`}
              style={{ borderRadius: "15px" }}
            />
          </CardContent>
        </StyledGrid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">{name}</Typography>
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
            <Grid container spacing={6}>
              <Grid item xs={6} md={6}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => navigateTo(`pets/sections/${id}`)}
                >
                  Monitorear
                </Button>
              </Grid>
              <Grid item xs={6} md={6}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<EditOutlined />}
                >
                  Editar
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
