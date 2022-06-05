import { CardContent, Grid, Typography } from '@mui/material'

export const TabProfessional = () => {
  return (
    <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>Profesionales</Typography>
          </Grid>
        </Grid>
    </CardContent>
  )
}
