import { FC } from "react";

import {
  Card,
  Avatar,
  Button,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";

import { Delete, Store, Visibility } from "@mui/icons-material";
import { useRouter } from "next/router";

interface Props {
  id: number;
  name: string;
  type: string;
}

export const CardEstablishment: FC<Props> = ({ id, name, type }) => {
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };

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
                <Store sx={{ fontSize: "2rem" }} />
              </Avatar>
            </Grid>
            <Grid container spacing={1} marginLeft={1} marginRight={1} marginTop={1}>
              <Grid item xs={12} md={12}>
                <Typography variant="body1" noWrap>
                  <b>Nombre: </b>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body1" noWrap>
                  <b>Tipo: </b>
                  {type}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} textAlign="center" sx={{ marginTop: 1 }}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                startIcon={<Visibility />}
                onClick={() => navigateTo(`profile/${id}`)}
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
