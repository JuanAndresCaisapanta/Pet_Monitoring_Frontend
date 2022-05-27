import { FC } from "react";

import {
  Card,
  Avatar,
  Button,
  Typography,
  CardContent,
  Grid,
  Chip,
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
          <Grid container direction="column" alignItems={"center"}>
            <Grid item xs={12} md={12}>
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
          </Grid>
          <Grid container direction="column" alignItems={"center"}>
            <Grid item xs={12} md={12}>
              <Typography color={"primary"} variant="h6" sx={{ mt: 1 }}>
                Código: {code}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography  component={'span'} color={"primary"} variant="body1">
              Mascota: 
              <Typography component={'span'} sx={{ml:1}} display={"inline"} color={"#010000DE"}>
                {name}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography component={'span'} color={"primary"} variant="body1">
              Estado: <Chip label={state} color="success" />
            </Typography>
          </Grid>
          <Grid container direction="column" alignItems={"center"}>
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
