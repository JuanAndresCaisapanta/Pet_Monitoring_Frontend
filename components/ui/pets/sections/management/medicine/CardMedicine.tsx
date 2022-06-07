import { FC } from "react";

import { useRouter } from "next/router";

import { Delete, Visibility } from "@mui/icons-material";
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
  manufacturer: string;
  application_date: string;
  production_date: string;
  expiration_date: string;
  applicator: string;
  typeMedicine: string;
  image: any;
  onDelete: any;
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
  onDelete,
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
              height="300rem"
              alt="Medicina"
              src={`data:image/jpeg;base64,${image}`}
              style={{ borderRadius: "15px" }}
            />
          </CardContent>
        </StyledGrid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6" color={"primary"} noWrap>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body1">
                  <b>Tipo: </b> {typeMedicine}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body1" noWrap>
                  <b>Aplicador: </b> {applicator}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2" noWrap>
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
              <Grid item xs={12} md={6} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Visibility />}
                  onClick={()=>navigateTo(`profile/${id}`)}
                >
                  Ver
                </Button>
              </Grid>
              <Grid item xs={12} md={6} textAlign="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  disableElevation
                  startIcon={<Delete />}
                  onClick={onDelete}
                >
                  Eliminar
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
