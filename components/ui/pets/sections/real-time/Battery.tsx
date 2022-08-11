import { FC } from "react";

import {
  Battery0BarRounded,
  Battery30Rounded,
  Battery60Rounded,
  BatteryFullRounded,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

interface Props {
  value: number;
}

export const Battery: FC<Props> = ({ value }) => {
  return value > 3000 ? (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <BatteryFullRounded color="success" />
      </Grid>
      <Grid item>
        <Typography variant="body2">100%</Typography>
      </Grid>
    </Grid>
  ) : value > 2800 && value <= 3000 ? (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <Battery60Rounded color="warning" />
      </Grid>
      <Grid item>
        <Typography variant="body2">60%</Typography>
      </Grid>
    </Grid>
  ) : value > 2700 && value <= 2800 ? (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <Battery30Rounded color="warning" />
      </Grid>
      <Grid item>
        <Typography variant="body2">30%</Typography>
      </Grid>
    </Grid>
  ) : value >= 2650 && value <= 2700 ? (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <Battery0BarRounded color="error" />
      </Grid>
      <Grid item>
        <Typography variant="body2">5%</Typography>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};
