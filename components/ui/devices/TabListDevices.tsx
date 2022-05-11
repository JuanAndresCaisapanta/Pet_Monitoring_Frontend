import { CardContent, Grid } from "@mui/material";
import { CardDevice } from "./CardDevice";

export const TabListDevices = () => {
  return (
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CardDevice />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardDevice />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardDevice />
        </Grid>
      </Grid>
    </CardContent>
  );
};
