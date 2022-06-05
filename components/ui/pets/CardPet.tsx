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
import { Visibility } from "@mui/icons-material";
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
              width="300rem"
              height="200rem"
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
                <Typography variant="h6" color={"primary"}>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2"><b>Especie: </b>{species}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2"><b>Sexo: </b>{sex}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2"><b>Raza: </b>{race}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2"><b>Peso: </b>{`${weight} Kg`}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={10}>
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
                  startIcon={<Visibility />}
                >
                  ver
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
