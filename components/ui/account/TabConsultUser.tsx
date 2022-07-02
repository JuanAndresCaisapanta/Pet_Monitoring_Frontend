import { NavigateBefore } from '@mui/icons-material'
import { Card, CardContent, CardHeader, Divider, Grid, IconButton } from '@mui/material'
import React from 'react'

export const TabConsultUser = () => {
  return (
    <Card>
    <CardHeader
      sx={{ paddingTop: "4px", paddingBottom: "4px" }}
      title={"title"}
      titleTypographyProps={{ variant: "body1" }}
      action={
        <IconButton aria-label="close" onClick={()=>{}} style={{ color: "#9E69FD" }}>
          <NavigateBefore />
        </IconButton>
      }
    />
    <Divider sx={{ margin: 0 }} />
    <form noValidate autoComplete="off" onSubmit={()=>{}}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
             seccion
            </Grid>
            <Grid item xs={12} md={4}>
             Nombre o numero
            </Grid>
            <Grid item xs={12} md={4}>
             boton
            </Grid>
          </Grid>
        </CardContent>
        </form>
    </Card>
  )
}
