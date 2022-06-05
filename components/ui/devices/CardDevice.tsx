import { FC } from "react";

import {
  Card,
  Avatar,
  Button,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";

import OnDeviceTrainingOutlinedIcon from "@mui/icons-material/OnDeviceTrainingOutlined";

interface Props {
  code: string;
  name: any;
  state: string;
}

export const CardDevice: FC<Props> = ({ code, name, state }) => {
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
              <Typography variant="body2">
                <b>Mascota: </b>
                {name}
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button variant="outlined" color={"error"} sx={{ mt: 1 }}>
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
