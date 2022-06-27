import { FC, useContext, useState } from "react";

import { useRouter } from "next/router";

import { LoadingButton } from "@mui/lab";
import { Card, Avatar, Button, Typography, CardContent, Grid, CardActions } from "@mui/material";
import { Delete, HailOutlined, Visibility } from "@mui/icons-material";

import { ProfessionalContext } from "../../../../../../context";

interface Props {
  pet_id: number;
  professional_id: number;
  name: string;
  last_name: string;
  profession: string;
}

export const CardProfessional: FC<Props> = ({ pet_id, professional_id, name, last_name, profession }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteProfessional } = useContext(ProfessionalContext);

  const router = useRouter();

  const handleNavigate = (url: string) => {
    return router.push(url);
  };

  const handleDeleteProfessional = async (pet_id: number, professional_id: number) => {
    setIsLoading(true);
    const { isComplete } = await deleteProfessional(pet_id, professional_id);
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
              <HailOutlined sx={{ fontSize: "2rem" }} />
            </Avatar>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" noWrap>
              <b>Nombre: </b>
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" noWrap>
              <b>Apellido: </b>
              {last_name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" noWrap>
              <b>Profesión: </b>
              {profession}
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
          onClick={() => handleNavigate(`profile/${professional_id}`)}
        >
          Ver
        </Button>
        <LoadingButton
          onClick={() => handleDeleteProfessional(pet_id, professional_id)}
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
