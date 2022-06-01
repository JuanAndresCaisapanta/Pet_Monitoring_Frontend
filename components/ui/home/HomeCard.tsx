import { useContext } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { Devices, OnDeviceTrainingOutlined, Pets } from "@mui/icons-material";

import { AuthContext } from "../../../context";

export const HomeCard = () => {
  const { user } = useContext(AuthContext);
  const petNumber = user?.pet?.length || 0;
  const deviceNumber = user?.device?.length || 0;
  return (
    <Card>
      <CardHeader
        title="Información"
        titleTypographyProps={{ color: "primary" }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                variant="rounded"
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: "common.white",
                  backgroundColor: `${"primary"}.main`,
                }}
              >
                <Pets sx={{ fontSize: "1.75rem" }} />
              </Avatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption">Mascotas</Typography>
                <Typography variant="h6">{petNumber}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                variant="rounded"
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: "common.white",
                  backgroundColor: `${"info"}.main`,
                }}
              >
                <OnDeviceTrainingOutlined sx={{ fontSize: "1.75rem" }} />
              </Avatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption">Dispositivos</Typography>
                <Typography variant="h6">{deviceNumber}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
