import { FC, useContext, useState } from "react";

import { useRouter } from "next/router";

import { Card, Avatar, Button, Typography, CardContent, Grid, CardActions } from "@mui/material";
import { Delete, Store, Visibility } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { EstablishmentContext } from "../../../../../../context";

interface Props {
  pet_id: number;
  establishment_id: number;
  name: string;
  type: string;
}

export const CardEstablishment: FC<Props> = ({ pet_id, establishment_id, name, type }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteEstablishment } = useContext(EstablishmentContext);

  const router = useRouter();

  const handleNavigate = (url: string) => {
    return router.push(url);
  };

  const handleDeleteEstablishment = async (pet_id: number, establishment_id: number) => {
    setIsLoading(true);
    const { isComplete } = await deleteEstablishment(pet_id, establishment_id);
    if (isComplete) {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} textAlign="center">
            <Avatar
              sx={{
                width: 50,
                height: 50,
                color: "common.white",
                backgroundColor: "primary.main",
                margin: "auto",
              }}
            >
              <Store sx={{ fontSize: "2rem" }} />
            </Avatar>
          </Grid>
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
      </CardContent>
      <CardActions sx={{ paddingTop: 0 }}>
        <Button
          variant="contained"
          disableElevation
          startIcon={<Visibility />}
          sx={{
            width: "50%",
          }}
          onClick={() => handleNavigate(`profile/${establishment_id}`)}
        >
          Ver
        </Button>
        <LoadingButton
          onClick={() => handleDeleteEstablishment(pet_id, establishment_id)}
          variant="outlined"
          color="secondary"
          disableElevation
          startIcon={<Delete />}
          loading={isLoading}
          loadingPosition="start"
          sx={{
            width: "50%",
          }}
        >
          Eliminar
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
