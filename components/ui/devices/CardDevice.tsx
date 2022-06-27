import { FC, useContext, useState } from "react";

import { Card, Avatar, Typography, CardContent, Grid, CardActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Delete, OnDeviceTraining } from "@mui/icons-material";

import { DeviceContext } from "../../../context";

interface Props {
  code: string;
  name: any;
  device_id: number;
}

export const CardDevice: FC<Props> = ({ code, name, device_id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteDevice } = useContext(DeviceContext);

  const handleDeleteDevice = async (device_id: number) => {
    setIsLoading(true);
    const { isComplete } = await deleteDevice(device_id);
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
              <OnDeviceTraining sx={{ fontSize: "2rem" }} />
            </Avatar>
          </Grid>
          <Grid item xs={12} md={12} textAlign={"center"}>
            <Typography variant="body1">
              <b>Código: </b>
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} textAlign={"center"}>
            <Typography variant="body1" color={"primary"}>
              {code}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} textAlign={"center"}>
            <Typography variant="body2" noWrap>
              <b>Mascota: </b>
              {name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ paddingTop: 0 }}>
        <LoadingButton
          onClick={() => handleDeleteDevice(device_id)}
          variant="outlined"
          color="secondary"
          disableElevation
          startIcon={<Delete />}
          loading={isLoading}
          loadingPosition="start"
          sx={{
            width: "100%",
          }}
        >
          Eliminar
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
