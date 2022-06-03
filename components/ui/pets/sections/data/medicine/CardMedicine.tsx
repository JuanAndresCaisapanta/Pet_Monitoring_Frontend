import { FC } from "react";

import { useRouter } from "next/router";

import { Visibility } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  GridProps,
  styled,
  Typography,
} from "@mui/material";

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
  manufacturer: string;
  application_date: string;
  production_date: string;
  expiration_date: string;
  applicator: string;
  typeMedicine: string;
  image: any;
}

export const CardMedicine: FC<Props> = ({
  id,
  name,
  manufacturer,
  application_date,
  production_date,
  expiration_date,
  applicator,
  typeMedicine,
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
            <img
              width={"100%"}
              height={182}
              alt="Mascota"
              src={`data:image/jpeg;base64,${image}`}
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
                <Typography variant="body1">
                  <b>Tipo: </b> {typeMedicine}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body1">
                  <b>Aplicador: </b> {applicator}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">
                  <b>Fabricante: </b> {manufacturer}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">
                  <b>Fecha Aplicación: </b> {application_date}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">
                  <b>Fecha Producción: </b> {production_date}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">
                  <b>Fecha Expiración: </b> {expiration_date}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} textAlign="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Visibility />}
                  onClick={() => {}}
                >
                  Ver
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
