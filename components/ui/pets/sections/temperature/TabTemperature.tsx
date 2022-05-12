import { CardContent, Grid, Typography } from '@mui/material'

export const TabTemperature = () => {
  return (
    <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>termometro</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>acciones</Typography>
          </Grid>
        </Grid>
    </CardContent>
  )
}
