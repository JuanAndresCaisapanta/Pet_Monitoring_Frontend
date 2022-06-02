import { CardContent, Grid, Typography } from "@mui/material";

export const TabMedicine = () => {
  return (
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography>Medicinas</Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
};
