import { FC, useContext, useState } from "react";

import { Card, Avatar, Typography, CardContent, Grid, CardActions } from "@mui/material";

import OnDeviceTrainingOutlinedIcon from "@mui/icons-material/OnDeviceTrainingOutlined";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material";
import { DeviceContext } from "../../../context";
import Swal from "sweetalert2";

interface Props {
  code: string;
  name: any;
  id: number;
}

export const CardDevice: FC<Props> = ({ code, name, id }) => {
  const { deleteDevice } = useContext(DeviceContext);
  const [isLoading, setIsLoading] = useState(false);
  const onDeleteDevice = async (id: number) => {
    setIsLoading(true);
    const { isComplete } = await deleteDevice(id);
    if (isComplete) {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid container direction="row" textAlign="center" spacing={1}>
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
                <OnDeviceTrainingOutlinedIcon sx={{ fontSize: "2rem" }} />
              </Avatar>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="body1">
                <b>Código: </b>
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="body1" color={"primary"}>
                {code}
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="body2" noWrap>
                <b>Mascota: </b>
                {name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <LoadingButton
                onClick={() => onDeleteDevice(id)}
                variant="outlined"
                color="secondary"
                sx={{
                  py: 1,
                  width: "100%",
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
                disableElevation
                startIcon={<Delete />}
                loading={isLoading}
                loadingPosition="start"
                
              >
                Eliminar
              </LoadingButton>
    </Card>
  );
};
