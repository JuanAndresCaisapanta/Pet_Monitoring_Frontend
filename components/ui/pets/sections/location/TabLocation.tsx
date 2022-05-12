import { CardContent, Grid, Typography } from '@mui/material'

export const TabLocation = () => {
  return (
    <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>Ubicacion</Typography>
          </Grid>
        </Grid>
    </CardContent>
  )
}
