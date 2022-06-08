import { FC } from "react";

import {
  Card,
  Avatar,
  Button,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";

import { Delete, HailOutlined, Visibility } from "@mui/icons-material";

interface Props {
  name: string;
  last_name: string;
  profession: string;
}

export const CardProfessional: FC<Props> = ({
  name,
  last_name,
  profession,
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid container direction="row" textAlign="left" spacing={1}>
            <Grid item container xs={12} md={12} justifyContent="center">
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  mt: 2,
                  color: "common.white",
                  backgroundColor: "primary.main",
                }}
              >
                <HailOutlined sx={{ fontSize: "2rem" }} />
              </Avatar>
            </Grid>
            <Grid container spacing={1} marginLeft={1} marginRight={1}>
              <Grid item xs={12} md={12}>
                <Typography variant="body1" noWrap>
                  <b>Nombre: </b>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body1" noWrap>
                  <b>Apellido: </b>
                  {last_name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body1" noWrap>
                  <b>Profesión: </b>
                  {profession}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} textAlign="center" sx={{ marginTop: 1 }}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                startIcon={<Visibility />}
                // onClick={() => navigateTo(`profile/${id}`)}
                sx={{ marginRight: 2 }}
              >
                Ver
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                disableElevation
                startIcon={<Delete />}
                // onClick={onDelete}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
